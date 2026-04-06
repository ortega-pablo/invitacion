/**
 * Utilitarios de fecha para el countdown y el evento
 */

/**
 * Calcula el tiempo restante hasta una fecha objetivo
 * @param {string} targetDate - formato ISO: "YYYY-MM-DD"
 * @returns {{ days, hours, minutes, seconds, total }}
 */
export function getTimeRemaining(targetDate) {
  // Forzar zona horaria Argentina (UTC-3)
  const total = Date.parse(targetDate + 'T00:00:00-03:00') - Date.now();

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds, total };
}

/**
 * Formatea una fecha ISO a texto legible en español
 * @param {string} dateStr - "YYYY-MM-DD"
 * @returns {string} - "sábado, 5 de diciembre de 2026"
 */
export function formatDateLong(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  const weekday = date.toLocaleDateString('es-AR', { weekday: 'long' });
  const day = date.getDate();
  const month = date.toLocaleDateString('es-AR', { month: 'long' });
  const year = date.getFullYear();
  const capitalized = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return `${capitalized}, ${day} de ${month} de ${year}`;
}

/**
 * Formatea una fecha ISO a texto corto
 * @param {string} dateStr - "YYYY-MM-DD"
 * @returns {string} - "5 · 12 · 2026"
 */
export function formatDateShort(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return `${day} · ${month} · ${year}`;
}
