import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { showToast } from '../utils/toast';
import './RSVP.css';

const DIETARY_OPTIONS = [
  'Ninguna',
  'Vegetariano',
  'Vegano',
  'Celíaco',
  'Sin TACC',
  'Otra',
];

const emptyGuest = () => ({ firstName: '', lastName: '', dni: '', type: 'adulto', dietary: 'Ninguna', dietaryOther: '' });

export default function RSVP({ config }) {
  const { rsvpSheet, event, texts, ticket } = config;
  const { paymentInfo } = ticket;
  const [guests, setGuests] = useState([emptyGuest()]);
  const [status, setStatus] = useState('idle');
  const ref = useReveal();

  const copyCbu = async () => {
    try {
      await navigator.clipboard.writeText(paymentInfo.cbu);
      showToast('CBU copiado al portapapeles', 'success');
    } catch {
      showToast('No se pudo copiar el CBU', 'error');
    }
  };

  const addGuest    = () => setGuests((g) => [...g, emptyGuest()]);
  const removeGuest = (i) => setGuests((g) => g.filter((_, idx) => idx !== i));
  const updateGuest = (i, field, value) =>
    setGuests((g) => g.map((guest, idx) => idx === i ? { ...guest, [field]: value } : guest));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (guests.some((g) => !g.firstName.trim() || !g.lastName.trim() || !g.dni.trim())) {
      showToast('Por favor completá nombre, apellido y DNI de todos', 'error');
      return;
    }
    if (guests.some((g) => g.dietary === 'Otra' && !g.dietaryOther.trim())) {
      showToast('Por favor especificá la restricción alimentaria', 'error');
      return;
    }
    setStatus('loading');
    try {
      await fetch(rsvpSheet.scriptUrl, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({
          submittedAt: new Date().toISOString(),
          guests: guests.map((g) => ({
            firstName: g.firstName.trim().toUpperCase(),
            lastName: g.lastName.trim().toUpperCase(),
            dni: g.dni.trim(),
            type: g.type,
            dietary: g.dietary === 'Otra' ? g.dietaryOther.trim() : g.dietary,
          })),
        }),
      });
      setStatus('success');
      showToast('¡Asistencia confirmada! 🎉', 'success', 4000);
    } catch {
      setStatus('error');
      showToast('Hubo un error. Por favor intentá de nuevo.', 'error');
    }
  };

  if (status === 'success') {
    return (
      <section id="rsvp" className="rsvp-section section">
        <div className="rsvp-inner reveal">
          <div className="rsvp-success-emoji">🎉</div>
          <h2 className="rsvp-success-title">¡Gracias por confirmar!</h2>
          <p className="rsvp-success-body">
            Ya tenemos tu confirmación. Nos vemos el {event.date.split('-')[2]}.{event.date.split('-')[1]} en {event.venueName}.<br />
            ¡Va a ser una noche increíble!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="rsvp-section section">
      <div ref={ref} className="rsvp-inner reveal">
        <span className="section-eyebrow rsvp-eyebrow">¿Vas a venir?</span>
        <h2 className="rsvp-heading">{texts.rsvpTitle}</h2>
        <p className="rsvp-deadline">
          {texts.rsvpSubtitle} <strong>{event.rsvpDeadline}</strong>
        </p>

        <div className="rsvp-divider">
          <div className="rsvp-divider-line" />
          <span className="rsvp-divider-icon">✦</span>
          <div className="rsvp-divider-line" />
        </div>

        <form className="rsvp-form" onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {guests.map((guest, i) => (
              <div key={i} className="rsvp-guest-row">
                <div className="rsvp-guest-header">
                  <span className="rsvp-guest-num">Invitado {i + 1}</span>
                  {guests.length > 1 && (
                    <button type="button" className="rsvp-remove" onClick={() => removeGuest(i)} aria-label="Quitar">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  )}
                </div>
                <div className="rsvp-guest-fields">
                  <div className="form-group">
                    <label className="form-label form-label-light" htmlFor={`firstName-${i}`}>Nombre</label>
                    <input id={`firstName-${i}`} className="form-input form-input-dark" type="text"
                      placeholder="María" value={guest.firstName}
                      onChange={(e) => updateGuest(i, 'firstName', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label form-label-light" htmlFor={`lastName-${i}`}>Apellido</label>
                    <input id={`lastName-${i}`} className="form-input form-input-dark" type="text"
                      placeholder="González" value={guest.lastName}
                      onChange={(e) => updateGuest(i, 'lastName', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label form-label-light" htmlFor={`dni-${i}`}>DNI</label>
                    <input id={`dni-${i}`} className="form-input form-input-dark" type="text"
                      placeholder="30.123.456" value={guest.dni}
                      onChange={(e) => updateGuest(i, 'dni', e.target.value)} required inputMode="numeric" />
                  </div>
                  <div className="form-group">
                    <label className="form-label form-label-light" htmlFor={`type-${i}`}>Tipo</label>
                    <select id={`type-${i}`} className="form-input form-input-dark"
                      value={guest.type} onChange={(e) => updateGuest(i, 'type', e.target.value)}>
                      <option value="adulto">Adulto</option>
                      <option value="niño">Niño</option>
                    </select>
                  </div>
                  <div className="form-group rsvp-dietary-field">
                    <label className="form-label form-label-light" htmlFor={`dietary-${i}`}>Restricción alimentaria</label>
                    <select id={`dietary-${i}`} className="form-input form-input-dark"
                      value={guest.dietary} onChange={(e) => updateGuest(i, 'dietary', e.target.value)}>
                      {DIETARY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  {guest.dietary === 'Otra' && (
                    <div className="form-group rsvp-dietary-field">
                      <label className="form-label form-label-light" htmlFor={`dietaryOther-${i}`}>Especificá cuál</label>
                      <input id={`dietaryOther-${i}`} className="form-input form-input-dark" type="text"
                        placeholder="Describí tu restricción..." value={guest.dietaryOther}
                        onChange={(e) => updateGuest(i, 'dietaryOther', e.target.value)} required />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="rsvp-add-btn" onClick={addGuest}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Agregar otro invitado
          </button>

          <div className="rsvp-summary">
            <span>
              {guests.filter((g) => g.type === 'adulto').length} {guests.filter((g) => g.type === 'adulto').length === 1 ? 'adulto' : 'adultos'}
              {guests.filter((g) => g.type === 'niño').length > 0 && (
                <> · {guests.filter((g) => g.type === 'niño').length} {guests.filter((g) => g.type === 'niño').length === 1 ? 'niño' : 'niños'}</>
              )}
            </span>
            <span className="rsvp-total">
              {ticket.currency} {guests.filter((g) => g.type === 'adulto').length * ticket.adultPrice + guests.filter((g) => g.type === 'niño').length * ticket.childPrice}
            </span>
          </div>

          <button type="submit" className={`btn btn-gold rsvp-submit ${status === 'loading' ? 'loading' : ''}`} disabled={status === 'loading'}>
            {status === 'loading' ? (<><span className="spinner spinner-dark" />Enviando...</>) : 'Confirmar asistencia'}
          </button>

          <div className="rsvp-payment">
            <span className="rsvp-payment-label">Datos para la transferencia</span>
            <span className="rsvp-payment-account">CBU · {paymentInfo.accountLabel}</span>
            <button type="button" className="rsvp-cbu-copy" onClick={copyCbu} title="Copiar CBU">
              <span className="rsvp-cbu">{paymentInfo.cbu}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
