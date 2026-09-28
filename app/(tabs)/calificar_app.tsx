import { Texto } from "@/components/Text";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIAS = [
  "Tracker de Rivalidades",
  "Ranking Global",
  "Diseño Visual",
  "Velocidad",
  "Estadísticas",
];

const MENSAJES_ESTRELLAS: { [key: number]: string } = {
  1: "¡El Esqueleto Gigante explotó todo! 💀 (1/5)",
  2: "Le falta elixir a la estrategia 🧪 (2/5)",
  3: "Sólido como un Caballero ⚔️ (3/5)",
  4: "¡Nivel Legendario! 🌟 (4/5)",
  5: "¡3 Coronas perfectas! 👑 (5/5)",
};

export default function CalificarAppScreen() {
  const [calificacion, setCalificacion] = useState<number>(0);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<
    string[]
  >([]);
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);

  const toggleCategoria = (cat: string) => {
    if (categoriasSeleccionadas.includes(cat)) {
      setCategoriasSeleccionadas(
        categoriasSeleccionadas.filter((item) => item !== cat),
      );
    } else {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, cat]);
    }
  };

  const manejarEnvioSimulado = () => {
    if (calificacion === 0) {
      alert("Por favor selecciona al menos una estrella para calificar.");
      return;
    }
    // No se envían datos a ningún servidor externo.
    setEnviado(true);
  };

  const reiniciarFormulario = () => {
    setCalificacion(0);
    setCategoriasSeleccionadas([]);
    setComentario("");
    setEnviado(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.titleContainer}>
        <Texto variante="titulo">Calificar App</Texto>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badgeExperimental}>
          <Ionicons
            name="flask-outline"
            size={18}
            color={Colors.btnSecundario}
          />
          <Texto variante="bold" style={styles.txtBadge}>
            DISEÑO EXPERIMENTAL (OFFLINE)
          </Texto>
        </View>

        {!enviado ? (
          <View style={styles.cardContainer}>
            <Texto variante="titulo" style={styles.txtCardTitulo}>
              ¿Qué te parece ClashitoApp?
            </Texto>

            <Texto variante="normal" style={styles.txtCardSubtitulo}>
              Tu opinión nos ayuda a subir copas y mejorar la experiencia.
            </Texto>

            {/* Selector de estrellas */}
            <View style={styles.starsWrapper}>
              {[1, 2, 3, 4, 5].map((estrella) => (
                <TouchableOpacity
                  key={estrella}
                  activeOpacity={0.7}
                  onPress={() => setCalificacion(estrella)}
                  style={styles.starTouch}
                >
                  <Ionicons
                    name={calificacion >= estrella ? "star" : "star-outline"}
                    size={40}
                    color={
                      calificacion >= estrella
                        ? Colors.starActive
                        : Colors.starInactive
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.feedbackMensajeBox}>
              <Texto variante="bold" style={styles.txtFeedbackMensaje}>
                {calificacion > 0
                  ? MENSAJES_ESTRELLAS[calificacion]
                  : "Toca las estrellas para calificar"}
              </Texto>
            </View>

            {/* Categorías destacadas */}
            <View style={styles.sectionDivider} />

            <Texto variante="bold" style={styles.txtSeccionTags}>
              ¿Qué aspectos te gustan más?
            </Texto>

            <View style={styles.chipsContainer}>
              {CATEGORIAS.map((cat) => {
                const seleccionada = categoriasSeleccionadas.includes(cat);
                return (
                  <TouchableOpacity
                    key={cat}
                    activeOpacity={0.7}
                    onPress={() => toggleCategoria(cat)}
                    style={[
                      styles.chip,
                      seleccionada
                        ? styles.chipSelected
                        : styles.chipUnselected,
                    ]}
                  >
                    <Texto
                      variante="bold"
                      style={
                        seleccionada
                          ? styles.txtChipSelected
                          : styles.txtChipUnselected
                      }
                    >
                      {cat}
                    </Texto>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Campo de comentarios */}
            <View style={styles.sectionDivider} />

            <Texto variante="bold" style={styles.txtSeccionTags}>
              Comentario adicional (opcional)
            </Texto>

            <TextInput
              style={styles.inputComentario}
              placeholder="Escribe aquí tus sugerencias o ideas..."
              placeholderTextColor={Colors.icon}
              value={comentario}
              onChangeText={setComentario}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            {/* Botón de envío simulado */}
            <TouchableOpacity
              style={styles.btnEnviar}
              activeOpacity={0.8}
              onPress={manejarEnvioSimulado}
            >
              <Texto variante="bold" style={styles.txtBtnEnviar}>
                CALIFICAR APP (SIMULADO)
              </Texto>
            </TouchableOpacity>

            <Texto variante="normal" style={styles.txtAdvertencia}>
              * No se enviarán datos a ningún servidor externo.
            </Texto>
          </View>
        ) : (
          <View style={styles.cardContainer}>
            <View style={styles.exitoIconWrapper}>
              <Ionicons
                name="checkmark-circle"
                size={70}
                color={Colors.btnSecundario}
              />
            </View>

            <Texto variante="titulo" style={styles.txtExitoTitulo}>
              ¡Muchas Gracias!
            </Texto>

            <Texto variante="normal" style={styles.txtExitoMensaje}>
              Has calificado la aplicación con {calificacion} de 5 estrellas.
            </Texto>

            <View style={styles.resumenBox}>
              <Texto variante="bold" style={styles.txtResumenLabel}>
                Detalle de tu calificación experimental:
              </Texto>
              <Texto variante="normal" style={styles.txtResumenDato}>
                Puntuación: {calificacion} estrellas
              </Texto>
              {categoriasSeleccionadas.length > 0 && (
                <Texto variante="normal" style={styles.txtResumenDato}>
                  Aspectos: {categoriasSeleccionadas.join(", ")}
                </Texto>
              )}
              {comentario.trim().length > 0 && (
                <Texto variante="normal" style={styles.txtResumenDato}>
                  Comentario: &quot;{comentario}&quot;
                </Texto>
              )}
            </View>

            <TouchableOpacity
              style={styles.btnReiniciar}
              activeOpacity={0.8}
              onPress={reiniciarFormulario}
            >
              <Texto variante="bold" style={styles.txtBtnReiniciar}>
                CALIFICAR DE NUEVO
              </Texto>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    gap: 16,
  },
  badgeExperimental: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.tarjetas,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.borderFeedback,
  },
  txtBadge: {
    color: Colors.btnSecundario,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  cardContainer: {
    backgroundColor: Colors.cardFeedback,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.borderDark,
    padding: 20,
    gap: 16,
  },
  txtCardTitulo: {
    fontSize: 22,
    color: Colors.tabIconSelected,
    textAlign: "center",
    textShadowColor: Colors.black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
  },
  txtCardSubtitulo: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  starsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginVertical: 10,
  },
  starTouch: {
    padding: 4,
  },
  feedbackMensajeBox: {
    backgroundColor: Colors.inputFeedback,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.borderFeedback,
  },
  txtFeedbackMensaje: {
    color: Colors.gold,
    fontSize: 15,
    textAlign: "center",
  },
  sectionDivider: {
    height: 1,
    backgroundColor: Colors.borderFeedback,
    marginVertical: 4,
  },
  txtSeccionTags: {
    fontSize: 15,
    color: Colors.white,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: Colors.chipSelected,
    borderColor: Colors.btnPrincipal,
  },
  chipUnselected: {
    backgroundColor: Colors.chipUnselected,
    borderColor: Colors.borderFeedback,
  },
  txtChipSelected: {
    color: Colors.white,
    fontSize: 13,
  },
  txtChipUnselected: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  inputComentario: {
    backgroundColor: Colors.inputFeedback,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderFeedback,
    color: Colors.white,
    padding: 12,
    fontSize: 14,
    minHeight: 90,
  },
  btnEnviar: {
    backgroundColor: Colors.btnPrincipal,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    borderColor: Colors.borderDark,
    borderWidth: 3,
    marginTop: 8,
  },
  txtBtnEnviar: {
    color: Colors.white,
    fontSize: 18,
    textShadowColor: Colors.black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
  },
  txtAdvertencia: {
    color: Colors.textSecondary,
    fontSize: 12,
    textAlign: "center",
  },
  exitoIconWrapper: {
    alignItems: "center",
    marginTop: 10,
  },
  txtExitoTitulo: {
    fontSize: 26,
    color: Colors.tabIconSelected,
    textAlign: "center",
    textShadowColor: Colors.black,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 1,
  },
  txtExitoMensaje: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  resumenBox: {
    backgroundColor: Colors.inputFeedback,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.borderFeedback,
    padding: 14,
    gap: 6,
    marginVertical: 10,
  },
  txtResumenLabel: {
    color: Colors.gold,
    fontSize: 14,
    marginBottom: 4,
  },
  txtResumenDato: {
    color: Colors.white,
    fontSize: 13,
  },
  btnReiniciar: {
    backgroundColor: Colors.tarjetas,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    borderColor: Colors.borderDark,
    borderWidth: 2,
  },
  txtBtnReiniciar: {
    color: Colors.white,
    fontSize: 16,
  },
});
