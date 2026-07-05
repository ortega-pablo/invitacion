import { useRevealChildren } from '../hooks/useReveal';
import { showToast } from '../utils/toast';
import './EventDetails.css';

const ICON_CLOCK = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const ICON_PARTY = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const ICON_PLACE = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const ICON_CALENDAR = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function EventDetails({ config }) {
  const { event, texts, ticket, googleCalendar } = config;
  const ref = useRevealChildren();
  const { paymentInfo } = ticket;

  const copyCbu = async () => {
    try {
      await navigator.clipboard.writeText(paymentInfo.cbu);
      showToast('CBU copiado al portapapeles', 'success');
    } catch {
      showToast('No se pudo copiar el CBU', 'error');
    }
  };

  const cards = [
    { icon: ICON_CLOCK,    label: 'Recepción',          title: '19:30 hs', sub: 'Inicio del evento' },
    { icon: ICON_CALENDAR, label: texts.ceremonyLabel,   title: '20:15 hs', sub: 'Ceremonia civil' },
    { icon: ICON_PARTY,    label: 'Lunch',              title: '20:45 hs', sub: 'Lunch y brindis' },
    { icon: ICON_PARTY,    label: 'Fiesta',             title: '23:00 hs', sub: 'Música y baile' },
  ];

  return (
    <section id="details" className="details-section section linen-texture" ref={ref}>
      <div className="container">
        <div className="details-header reveal">
          <span className="section-eyebrow section-eyebrow-dark">El gran día</span>
          <h2 className="details-heading">Detalles del evento</h2>
          <div className="details-divider">
            <div className="details-divider-line" />
            <span className="details-divider-icon">✦</span>
            <div className="details-divider-line" />
          </div>
        </div>

        <div className="details-grid">
          {cards.map((card, i) => (
            <div key={i} className={`detail-card reveal reveal-delay-${i + 1}`}>
              <div className="detail-icon-wrap">{card.icon}</div>
              <span className="detail-eyebrow">{card.label}</span>
              <div className="detail-title">{card.title}</div>
              <div className="detail-sub">{card.sub}</div>
            </div>
          ))}
        </div>

        <div className="details-actions reveal">
          <a href="#rsvp" className="btn btn-gold">
            Confirmar asistencia
          </a>
          <a
            href={googleCalendar.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-dark"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Agendar
          </a>
        </div>

        {/* Ticket */}
        <div className="ticket-card">
          <div className="ticket-inner">
            <div className="ticket-left">
              <span className="ticket-eyebrow">Valor de tarjeta</span>
              <div className="ticket-amount">
                <span className="ticket-currency">{ticket.currency}</span>
                <span className="ticket-price">{ticket.adultPrice}</span>
                <span className="ticket-unit">por persona</span>
              </div>
              <p className="ticket-child-note">
                {ticket.currency} {ticket.childPrice} · Niños de {ticket.childAgeRange}
              </p>
            </div>

            <div className="ticket-sep" />

            <div className="ticket-right">
              <div className="ticket-info-item">
                <span className="ticket-info-label">Cancelación hasta</span>
                <span className="ticket-info-value">{ticket.paymentDeadline}</span>
              </div>
              <div className="ticket-info-item ticket-transfer">
                <span className="ticket-info-label">
                  CBU · {paymentInfo.accountLabel}
                </span>
                <button
                  type="button"
                  className="ticket-cbu-copy"
                  onClick={copyCbu}
                  title="Copiar CBU"
                >
                  <span className="ticket-cbu">{paymentInfo.cbu}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
