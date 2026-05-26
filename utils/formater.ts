export const formatearFechaClash = (fechaClash: string) => {
  const año = parseInt(fechaClash.slice(0, 4));
  const mes = parseInt(fechaClash.slice(4, 6)) - 1;
  const dia = parseInt(fechaClash.slice(6, 8));
  const hora = parseInt(fechaClash.slice(9, 11));
  const minuto = parseInt(fechaClash.slice(11, 13));
  const segundo = parseInt(fechaClash.slice(13, 15));

  const fechaBatalla = new Date(Date.UTC(año, mes, dia, hora, minuto, segundo));
  const fechaActual = new Date();

  const diferenciaMs = fechaActual.getTime() - fechaBatalla.getTime();

  const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
  const horas = Math.floor(diferenciaMs / (1000 * 60 * 60));
  const minutos = Math.floor(diferenciaMs / (1000 * 60));

  if (dias > 0) {
    return `Hace ${dias} día${dias > 1 ? "s" : ""}`;
  } else if (horas > 0) {
    return `Hace ${horas} hora${horas > 1 ? "s" : ""}`;
  } else if (minutos > 0) {
    return `Hace ${minutos} min`;
  } else {
    return "Hace un momento";
  }
};
