import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

import { BattlePlayerRival } from "@/components/battlePlayerRival";
import { InputTagPlayer } from "@/components/InputTagPlayer";
import { Texto } from "@/components/Text";
import { Colors } from "@/constants/theme";
import { formatearFechaClash } from "@/utils/formater";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [playerTag, setPlayerTag] = useState("");
  const [rivalTag, setRivalTag] = useState("");
  const [rivalBattles, setRivalBattles] = useState<any[]>([]);
  const [globalScore, setGlobalScore] = useState({ wins: 0, losses: 0 });

  const isValidTag = (tag: string) => {
    const regex = /^[A-Z0-9]+$/i;
    if (!regex.test(tag) || tag.length !== 9) {
      alert(
        "El tag solo puede contener los caracteres: A-Z y 0-9. y debe cumplir con 9 caracteres.",
      );
      return false;
    }
    return true;
  };

  const analizarRivalidad = async () => {
    if (isValidTag(playerTag) && isValidTag(rivalTag)) {
      console.log(playerTag, rivalTag);
      const apiKey = process.env.EXPO_PUBLIC_API_KEY;
      const res = await fetch(
        `https://api.clashroyale.com/v1/players/%23${playerTag}/battlelog`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        },
      );
      let batallas: any[] = [];
      let globalScoreTemp = { wins: 0, losses: 0 };
      const data = await res.json();
      data.forEach((batalla: any) => {
        const rival = batalla.opponent.find(
          (op: { tag: string }) => op.tag === `#${rivalTag}`,
        );
        if (rival) {
          const user = batalla.team.find(
            (team: { tag: string }) => team.tag === `#${playerTag}`,
          );

          if (user) {
            const userCrowns = user.crowns;
            const rivalCrowns = rival.crowns;
            const winCondition = userCrowns > rivalCrowns;
            globalScoreTemp.wins += winCondition ? 1 : 0;
            globalScoreTemp.losses += !winCondition ? 1 : 0;
            const battleType = batalla.gameMode.name;
            const fecha = formatearFechaClash(batalla.battleTime);
            batallas.push({
              winCondition,
              battleDetails: `${userCrowns} - ${rivalCrowns}`,
              player1: user.name,
              player2: rival.name,
              battleDate: fecha,
              battleType,
            });
          }
        }
      });

      if (batallas.length === 0) {
        alert("No se encontraron batallas entre el jugador y el rival.");
      }
      setRivalBattles(batallas);
      setGlobalScore(globalScoreTemp);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={styles.titleContainer}>
        <Texto variante="titulo">ClashitoApp - Tracker</Texto>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.mainContainer}
        showsVerticalScrollIndicator={false}
      >
        <InputTagPlayer
          title="PLAYER TAG"
          placeholder="YQYY2G89A"
          value={playerTag}
          onChangeText={setPlayerTag}
        />
        <InputTagPlayer
          title="RIVAL TAG"
          placeholder="GQWA3G892"
          value={rivalTag}
          onChangeText={setRivalTag}
          icon={require("../../assets/app/marksman_max.png")}
        />
        <TouchableOpacity
          style={styles.btnPrincipal}
          activeOpacity={0.7}
          onPress={analizarRivalidad}
        >
          <Texto variante="bold" style={styles.txtBtnPrincipal}>
            ANALIZAR RIVALIDAD
          </Texto>
        </TouchableOpacity>
        {rivalBattles.length > 0 && (
          <View>
            <Texto variante="titulo" style={styles.txtRival}>
              RESUMEN DE BATALLAS
            </Texto>
            <Texto variante="bold" style={styles.txtRivalSecondary}>
              Global Score (15 ultimas batallas)
            </Texto>
            <Texto>Victorias: {globalScore.wins}</Texto>
            <Texto>Derrotas: {globalScore.losses}</Texto>
            <View>
              {rivalBattles.map((batalla, index) => (
                <BattlePlayerRival
                  key={index}
                  winCondition={batalla.winCondition}
                  battleDetails={batalla.battleDetails}
                  player1={batalla.player1}
                  player2={batalla.player2}
                  battleDate={batalla.battleDate}
                  battleType={batalla.battleType}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 15,
    backgroundColor: Colors.tarjetas,
  },
  mainContainer: {
    flexGrow: 1,
    padding: 20,
    gap: 30,
  },
  btnPrincipal: {
    backgroundColor: Colors.btnPrincipal,
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 3,
  },
  txtBtnPrincipal: {
    color: Colors.tabIconSelected,
    fontSize: 24,
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 1,
  },
  txtRival: {
    color: Colors.tabIconSelected,
    fontSize: 26,
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 1,
    textAlign: "center",
  },
  txtRivalSecondary: {
    color: Colors.textSecondary,
    fontSize: 16,
    textAlign: "center",
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 1,
  },
});
