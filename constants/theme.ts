/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorDark = "#fff";

export const Colors = {
  text: "#bebebe",
  textSecondary: "#c4c4c4",
  background: "#1E2328",
  backgroundSecondary: "#0A1A2E",
  tint: tintColorDark,
  tarjetas: "#2A3038",
  btnPrincipal: "#2D88FF",
  btnSecundario: "#FFD700",
  icon: "#9BA1A6",
  tabIconDefault: "#9BA1A6",
  tabIconSelected: tintColorDark,
  // Colores para ranking y primeros lugares
  rojoFuerte: "#C62828",
  rojoFuerteBorde: "#EF5350",
  rojoFuerteOscuro: "#8E0000",
  white: "#FFFFFF",
  black: "#000000",
  gold: "#FFD700",
  silver: "#D1D5DB",
  bronze: "#CD7F32",
  rankBadge: "#15181C",
  borderDark: "#000000",
  // Colores para calificar / estrellas y diseño experimental
  starActive: "#FFD700",
  starInactive: "#4A525D",
  cardFeedback: "#252B33",
  inputFeedback: "#1A1E24",
  borderFeedback: "#374151",
  successGreen: "#4CAF50",
  chipSelected: "#2D88FF",
  chipUnselected: "#1E2328",
};

export const Fonts = {
  clash: "LilitaOne",
  texto: "Roboto",
  textoBold: "RobotoBold",
  sistema: Platform.select({
    ios: {
      sans: "system-ui",
      serif: "ui-serif",
      rounded: "ui-rounded",
      mono: "ui-monospace",
    },
    default: {
      sans: "normal",
      serif: "serif",
      rounded: "normal",
      mono: "monospace",
    },
    web: {
      sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      serif: "Georgia, 'Times New Roman', serif",
      rounded:
        "'SF Pro Roun ded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
      mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
  }),
};
