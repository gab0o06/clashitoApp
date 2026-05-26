import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Texto } from "./Text";

interface BattleCardProps {
  winCondition?: boolean;
  battleDetails?: string;
  player1?: string;
  player2?: string;
  battleDate?: string;
  battleType?: string;
}

export const BattlePlayerRival = ({
  winCondition = true,
  battleDetails = "3 - 2",
  player1 = "Player1",
  player2 = "Player2",
  battleDate = "Hace 2 días",
  battleType = "1v1",
}: BattleCardProps) => {
  return (
    <TouchableOpacity style={styles.battleCard} activeOpacity={0.7}>
      <View
        style={[
          styles.cardColor,
          {
            backgroundColor: winCondition ? "#68a9ff" : "#ff6868",
          },
        ]}
      ></View>
      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <Texto variante="bold" style={styles.txtCardDay}>
            {battleType}
          </Texto>
          <Texto variante="bold" style={styles.txtCardDay}>
            {battleDate}
          </Texto>
        </View>
        <View style={styles.battleInfo}>
          <Texto
            variante="bold"
            style={[
              styles.battleCondition,
              {
                color: winCondition ? "#68a9ff" : "#ff6868",
              },
            ]}
          >
            {winCondition ? "Victoria" : "Derrota"}
          </Texto>
          <Texto variante="titulo" style={styles.battleDetails}>
            {battleDetails}
          </Texto>
          <Image
            source={
              winCondition
                ? require("../assets/app/noble.png")
                : require("../assets/app/noble_max.png")
            }
            style={styles.battleIcon}
          />
        </View>
        <View style={styles.PlayersInfo}>
          <Texto variante="bold" style={styles.txtPlayer}>
            {player1}
          </Texto>
          <Texto variante="bold">vs</Texto>
          <Texto variante="bold" style={styles.txtPlayer}>
            {player2}
          </Texto>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  battleCard: {
    flexDirection: "row",
    backgroundColor: Colors.tarjetas,
    borderRadius: 8,
    borderColor: "#000",
    borderWidth: 2,
    overflow: "hidden",
    marginTop: 16,
    minHeight: 120,
  },
  cardColor: {
    backgroundColor: "#68a9ff",
    width: 8,
  },
  cardInfo: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 8,
  },
  txtCardDay: {
    color: "#767779",
    fontSize: 12,
    textAlign: "right",
    marginRight: 16,
    marginTop: 8,
  },
  battleInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 1,
    marginRight: 32,
  },
  battleCondition: {
    color: "#68a9ff",
    fontSize: 28,
    textAlign: "center",
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 1,
  },
  battleDetails: {
    color: "#fff",
    fontSize: 38,
    textAlign: "center",
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 1,
  },
  battleIcon: {
    width: 50,
    height: 50,
  },
  PlayersInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    marginLeft: 16,
    marginBottom: 8,
  },
  txtPlayer: {
    backgroundColor: Colors.background,
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: "#fff",
    fontSize: 18,
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 3 },
    textShadowRadius: 1,
  },
});
