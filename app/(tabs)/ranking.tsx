import { InputTagPlayer } from "@/components/InputTagPlayer";
import { Texto } from "@/components/Text";
import { Colors } from "@/constants/theme";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface RankingPlayerItem {
  tag: string;
  name: string;
  expLevel: number;
  eloRating: number;
  rank: number;
  clan?: {
    tag: string;
    name: string;
    badgeId: number;
  };
}

interface PlayerProfile {
  tag: string;
  name: string;
  trophies: number;
  bestTrophies: number;
  clan?: {
    tag: string;
    name: string;
  };
  currentPathOfLegendSeasonResult?: {
    leagueNumber: number;
    trophies: number;
    rank: number | null;
  };
  bestPathOfLegendSeasonResult?: {
    leagueNumber: number;
    trophies: number;
    rank: number | null;
  };
}

export default function RankingScreen() {
  const [playerTag, setPlayerTag] = useState("");
  const [rankingList, setRankingList] = useState<RankingPlayerItem[]>([]);
  const [loadingRanking, setLoadingRanking] = useState(false);
  const [loadingPlayer, setLoadingPlayer] = useState(false);
  const [searchedPlayer, setSearchedPlayer] = useState<PlayerProfile | null>(
    null,
  );

  const isValidTag = (tag: string) => {
    const regex = /^[A-Z0-9]+$/i;
    if (!regex.test(tag)) {
      alert("El tag solo puede contener los caracteres: A-Z y 0-9.");
      return false;
    }
    return true;
  };

  const cargarRankingGlobal = async () => {
    const apiKey = process.env.EXPO_PUBLIC_API_KEY;

    try {
      setLoadingRanking(true);
      const res = await fetch(
        "https://proxy.royaleapi.dev/v1/locations/global/pathoflegend/players?limit=50",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(
          `Error en la solicitud: ${res.status} ${res.statusText}`,
        );
      }

      const data = await res.json();
      if (Array.isArray(data?.items)) {
        setRankingList(data.items);
      } else {
        setRankingList([]);
      }
    } catch (error) {
      console.error("Fallo al cargar el ranking global:", error);
      alert("No se pudo obtener el ranking global. Revisa tu conexión.");
    } finally {
      setLoadingRanking(false);
    }
  };

  const buscarJugador = async () => {
    if (!playerTag.trim()) {
      alert("Por favor ingresa un Tag de jugador.");
      return;
    }

    if (!isValidTag(playerTag)) {
      return;
    }

    const apiKey = process.env.EXPO_PUBLIC_API_KEY;

    try {
      setLoadingPlayer(true);
      const res = await fetch(
        `https://proxy.royaleapi.dev/v1/players/%23${playerTag}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error(
          `Error en la solicitud: ${res.status} ${res.statusText}`,
        );
      }

      const data = await res.json();
      setSearchedPlayer(data);
    } catch (error) {
      console.error("Fallo al buscar el jugador:", error);
      alert(
        "No se pudo encontrar el jugador. Verifica el Tag o tu conexión a internet.",
      );
    } finally {
      setLoadingPlayer(false);
    }
  };

  useEffect(() => {
    cargarRankingGlobal();
  }, []);

  const renderRankingCard = ({ item }: { item: RankingPlayerItem }) => {
    // Resaltar los primeros 3 lugares con color de fondo rojo fuerte
    const esPrimerosLugares = item.rank <= 3;

    let colorMedalla = Colors.white;
    if (item.rank === 1) colorMedalla = Colors.gold;
    else if (item.rank === 2) colorMedalla = Colors.silver;
    else if (item.rank === 3) colorMedalla = Colors.bronze;

    return (
      <View
        style={[
          styles.rankingCard,
          esPrimerosLugares
            ? styles.rankingCardTop
            : styles.rankingCardNormal,
        ]}
      >
        <View style={styles.rankPositionContainer}>
          <Texto
            variante="titulo"
            style={[styles.txtRankPosition, { color: colorMedalla }]}
          >
            #{item.rank}
          </Texto>
        </View>

        <View style={styles.rankPlayerDetails}>
          <Texto
            variante="bold"
            style={
              esPrimerosLugares
                ? styles.txtPlayerNameTop
                : styles.txtPlayerName
            }
            numberOfLines={1}
          >
            {item.name}
          </Texto>
          <Texto variante="normal" style={styles.txtPlayerTag}>
            {item.tag} {item.clan?.name ? `• ${item.clan.name}` : ""}
          </Texto>
        </View>

        <View style={styles.scoreContainer}>
          <Texto
            variante="bold"
            style={
              esPrimerosLugares
                ? styles.txtScoreValueTop
                : styles.txtScoreValue
            }
          >
            {item.eloRating}
          </Texto>
          <Texto variante="normal" style={styles.txtScoreLabel}>
            Puntos
          </Texto>
        </View>
      </View>
    );
  };

  const playerCurrentRank =
    searchedPlayer?.currentPathOfLegendSeasonResult?.rank;
  const playerBestRank = searchedPlayer?.bestPathOfLegendSeasonResult?.rank;
  const playerIsTopRank =
    playerCurrentRank !== null &&
    playerCurrentRank !== undefined &&
    playerCurrentRank <= 3;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.titleContainer}>
        <Texto variante="titulo">Ranking Global</Texto>
      </View>

      <FlatList
        data={rankingList}
        keyExtractor={(item) => item.tag}
        renderItem={renderRankingCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loadingRanking}
            onRefresh={cargarRankingGlobal}
            tintColor={Colors.btnSecundario}
            colors={[Colors.btnSecundario]}
          />
        }
        ListHeaderComponent={
          <View style={styles.headerSection}>
            <InputTagPlayer
              title="CONSULTAR RANKING DE JUGADOR"
              placeholder="VPG0GJPR"
              value={playerTag}
              onChangeText={setPlayerTag}
              icon={require("../../assets/app/noble.png")}
            />

            <TouchableOpacity
              style={styles.btnBuscar}
              activeOpacity={0.7}
              onPress={buscarJugador}
              disabled={loadingPlayer}
            >
              {loadingPlayer ? (
                <ActivityIndicator color={Colors.white} />
              ) : (
                <Texto variante="bold" style={styles.txtBtnBuscar}>
                  CONSULTAR JUGADOR
                </Texto>
              )}
            </TouchableOpacity>

            {searchedPlayer && (
              <View
                style={[
                  styles.playerResultCard,
                  playerIsTopRank
                    ? styles.rankingCardTop
                    : styles.playerResultCardNormal,
                ]}
              >
                <Texto variante="titulo" style={styles.txtResultName}>
                  {searchedPlayer.name}
                </Texto>
                <Texto variante="normal" style={styles.txtResultTag}>
                  {searchedPlayer.tag}{" "}
                  {searchedPlayer.clan?.name
                    ? `• ${searchedPlayer.clan.name}`
                    : ""}
                </Texto>

                <View style={styles.playerStatsGrid}>
                  <View style={styles.statBox}>
                    <Texto variante="normal" style={styles.statLabel}>
                      Ranking Actual
                    </Texto>
                    <Texto
                      variante="bold"
                      style={
                        playerIsTopRank
                          ? styles.statValueTop
                          : styles.statValue
                      }
                    >
                      {playerCurrentRank ? `#${playerCurrentRank}` : "Sin Rank"}
                    </Texto>
                  </View>

                  <View style={styles.statBox}>
                    <Texto variante="normal" style={styles.statLabel}>
                      Mejor Ranking
                    </Texto>
                    <Texto variante="bold" style={styles.statValue}>
                      {playerBestRank ? `#${playerBestRank}` : "N/A"}
                    </Texto>
                  </View>

                  <View style={styles.statBox}>
                    <Texto variante="normal" style={styles.statLabel}>
                      Copas
                    </Texto>
                    <Texto variante="bold" style={styles.statValue}>
                      {searchedPlayer.trophies}
                    </Texto>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.leaderboardTitleSection}>
              <Texto variante="titulo" style={styles.txtLeaderboardTitle}>
                TOP MUNDIAL
              </Texto>
              <Texto variante="normal" style={styles.txtLeaderboardSubtitle}>
                Los primeros lugares se destacan en rojo fuerte
              </Texto>
            </View>

            {loadingRanking && rankingList.length === 0 && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator
                  size="large"
                  color={Colors.btnSecundario}
                />
                <Texto variante="normal" style={styles.txtLoading}>
                  Cargando clasificación global...
                </Texto>
              </View>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  titleContainer: {
    padding: 15,
    backgroundColor: Colors.tarjetas,
  },
  listContainer: {
    padding: 20,
    gap: 12,
  },
  headerSection: {
    gap: 20,
    marginBottom: 10,
  },
  btnBuscar: {
    backgroundColor: Colors.btnPrincipal,
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    borderColor: Colors.borderDark,
    borderWidth: 3,
  },
  txtBtnBuscar: {
    color: Colors.tabIconSelected,
    fontSize: 20,
    textShadowColor: Colors.black,
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 1,
  },
  playerResultCard: {
    borderRadius: 8,
    borderWidth: 2,
    padding: 16,
    gap: 6,
  },
  playerResultCardNormal: {
    backgroundColor: Colors.tarjetas,
    borderColor: Colors.borderDark,
  },
  txtResultName: {
    fontSize: 24,
    color: Colors.tabIconSelected,
    textShadowColor: Colors.black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
  },
  txtResultTag: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  playerStatsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.rankBadge,
    borderRadius: 6,
    padding: 8,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  statValue: {
    fontSize: 16,
    color: Colors.white,
    marginTop: 4,
  },
  statValueTop: {
    fontSize: 16,
    color: Colors.gold,
    marginTop: 4,
  },
  leaderboardTitleSection: {
    marginTop: 10,
    alignItems: "center",
    gap: 4,
  },
  txtLeaderboardTitle: {
    fontSize: 24,
    color: Colors.tabIconSelected,
    textShadowColor: Colors.black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
  },
  txtLeaderboardSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  rankingCard: {
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 2,
    padding: 12,
    alignItems: "center",
    gap: 12,
  },
  // Fondo rojo fuerte para resaltar los primeros lugares
  rankingCardTop: {
    backgroundColor: Colors.rojoFuerte,
    borderColor: Colors.rojoFuerteBorde,
  },
  rankingCardNormal: {
    backgroundColor: Colors.tarjetas,
    borderColor: Colors.borderDark,
  },
  rankPositionContainer: {
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  txtRankPosition: {
    fontSize: 22,
    textShadowColor: Colors.black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
  },
  rankPlayerDetails: {
    flex: 1,
    gap: 2,
  },
  txtPlayerName: {
    fontSize: 17,
    color: Colors.white,
  },
  txtPlayerNameTop: {
    fontSize: 18,
    color: Colors.white,
    textShadowColor: Colors.black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
  },
  txtPlayerTag: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  scoreContainer: {
    alignItems: "flex-end",
    minWidth: 60,
  },
  txtScoreValue: {
    fontSize: 18,
    color: Colors.btnSecundario,
  },
  txtScoreValueTop: {
    fontSize: 18,
    color: Colors.white,
    textShadowColor: Colors.black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
  },
  txtScoreLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  loadingContainer: {
    padding: 30,
    alignItems: "center",
    gap: 10,
  },
  txtLoading: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
});
