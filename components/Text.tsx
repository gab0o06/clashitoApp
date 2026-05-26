import { Colors, Fonts } from "@/constants/theme";
import { StyleSheet, Text, TextProps } from "react-native";

interface TextoProps extends TextProps {
  variante?: "normal" | "titulo" | "bold";
}

export const Texto = ({
  variante = "normal",
  style,
  children,
  ...resto
}: TextoProps) => {
  let estiloBase = styles.normal;
  if (variante === "titulo") estiloBase = styles.titulo;
  if (variante === "bold") estiloBase = styles.bold;

  return (
    <Text style={[estiloBase, style]} {...resto}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  normal: {
    fontFamily: Fonts.texto,
    fontSize: 16,
    color: Colors.text,
  },
  bold: {
    fontFamily: Fonts.textoBold,
    fontSize: 16,
    color: Colors.text,
  },
  titulo: {
    fontFamily: Fonts.clash,
    fontSize: 32,
    color: Colors.tabIconSelected,
  },
});
