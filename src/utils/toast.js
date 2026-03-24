/**
 * Utilitario para mostrar notificaciones (toasts)
 */

let toastEl = null;
let timeoutId = null;

function getOrCreateToast() {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    document.body.appendChild(toastEl);
  }
  return toastEl;
}

export function showToast(message, type = 'success', duration = 3000) {
  const el = getOrCreateToast();

  if (timeoutId) clearTimeout(timeoutId);

  el.textContent = message;
  el.className = `toast toast-${type}`;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.classList.add('show');
    });
  });

  timeoutId = setTimeout(() => {
    el.classList.remove('show');
  }, duration);
}
