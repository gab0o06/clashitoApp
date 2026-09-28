# Reglas del proyecto

- Todo el código va en TypeScript, nunca JavaScript plano (.js).
- Los colores y tipografías se toman siempre de constants/theme.ts.
  Nunca hardcodees valores hex directamente en un componente.
- Las pantallas nuevas siguen el patrón de Expo Router: van dentro de app/,
  no fuera de esa carpeta.
- Cualquier llamada nueva a la API de RoyaleAPI debe reutilizar el mismo
  patrón de fetch que ya existe en index.tsx, no crear uno nuevo desde cero.
- Todas las pantallas nuevas deben tener el nombre de su archivo en minúsculas
  y con guion bajo (ej. mi_pantalla.tsx), nunca camelCase ni kebab-case.
- Todo componente de tarjeta (card) debe importar Text.tsx, nunca el
  Text nativo de React Native, incluso para textos triviales como "Cargando...".
