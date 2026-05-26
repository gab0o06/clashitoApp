import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { StyleSheet, TextInput, View } from "react-native";
import { Texto } from "./Text";

interface InputProps {
  title?: string;
  placeholder?: string;
  icon?: any;
  value: string;
  onChangeText: (text: string) => void;
}

export const InputTagPlayer = ({
  title = "TU PLAYER TAG",
  placeholder = "YQYY2G89",
  icon = require("../assets/app/dragon_max.png"),
  value,
  onChangeText,
}: InputProps) => {
  return (
    <View>
      <Texto variante="bold" style={styles.textLabel}>
        {title}
      </Texto>
      <View style={styles.inputContainer}>
        <View style={styles.iconWrapper}>
          <Image source={icon} style={styles.avatarIcon} />
        </View>
        <View style={styles.inputHashContainer}>
          <Texto variante="bold" style={styles.hashtag}>
            #
          </Texto>
          <TextInput
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor="#7A8089"
            value={value}
            onChangeText={(text) =>
              onChangeText(
                text.replace("#", "").toUpperCase().replaceAll(" ", ""),
              )
            }
            autoCapitalize="characters"
            autoCorrect={false}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textLabel: {
    color: Colors.text,
    fontSize: 16,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#1C1C1C",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#000000",
    overflow: "hidden",
  },
  iconWrapper: {
    backgroundColor: "#2A2A2A",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarIcon: {
    width: 38,
    height: 30,
  },
  inputHashContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  hashtag: {
    color: "#FFFFFF",
    fontSize: 18,
    marginRight: 2,
  },
  textInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
