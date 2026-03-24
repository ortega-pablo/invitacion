import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { showToast } from '../utils/toast';
import './RSVP.css';

const emptyGuest = () => ({ name: '', dni: '' });

export default function RSVP({ config }) {
  const { rsvpSheet, event, texts, ticket } = config;
  const [guests, setGuests] = useState([emptyGuest()]);
  const [status, setStatus] = useState('idle');
  const ref = useReveal();

  const addGuest    = () => setGuests((g) => [...g, emptyGuest()]);
  const removeGuest = (i) => setGuests((g) => g.filter((_, idx) => idx !== i));
  const updateGuest = (i, field, value) =>
    setGuests((g) => g.map((guest, idx) => idx === i ? { ...guest, [field]: value } : guest));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (guests.some((g) => !g.name.trim() || !g.dni.trim())) {
      showToast('Por favor completá nombre y DNI de todos', 'error');
      return;
    }
    setStatus('loading');
    try {
      await fetch(rsvpSheet.scriptUrl, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: event.venueName, eventDate: event.date,
          submittedAt: new Date().toISOString(),
          guests: guests.map((g) => ({ name: g.name.trim(), dni: g.dni.trim() })),
          totalGuests: guests.length,
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
                    <label className="form-label form-label-light" htmlFor={`name-${i}`}>Nombre completo</label>
                    <input id={`name-${i}`} className="form-input form-input-dark" type="text"
                      placeholder="María González" value={guest.name}
                      onChange={(e) => updateGuest(i, 'name', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label form-label-light" htmlFor={`dni-${i}`}>DNI</label>
                    <input id={`dni-${i}`} className="form-input form-input-dark" type="text"
                      placeholder="30.123.456" value={guest.dni}
                      onChange={(e) => updateGuest(i, 'dni', e.target.value)} required inputMode="numeric" />
                  </div>
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
            <span>{guests.length} {guests.length === 1 ? 'persona' : 'personas'}</span>
            <span className="rsvp-total">
              {ticket.currency} {guests.length * ticket.adultPrice}
            </span>
          </div>

          <button type="submit" className={`btn btn-gold rsvp-submit ${status === 'loading' ? 'loading' : ''}`} disabled={status === 'loading'}>
            {status === 'loading' ? (<><span className="spinner spinner-dark" />Enviando...</>) : 'Confirmar asistencia'}
          </button>
        </form>
      </div>
    </section>
  );
}
