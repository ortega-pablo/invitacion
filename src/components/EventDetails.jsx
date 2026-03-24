import { useRevealChildren } from '../hooks/useReveal';
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
  const { event, texts, ticket } = config;
  const ref = useRevealChildren();

  const cards = [
    { icon: ICON_CLOCK,    label: texts.ceremonyLabel,  title: event.ceremonyTime + ' hs', sub: 'Ceremonia civil' },
    { icon: ICON_PARTY,    label: texts.receptionLabel, title: event.receptionTime + ' hs', sub: 'Cena y festejo' },
    { icon: ICON_PLACE,    label: 'Lugar',              title: event.venueName, sub: event.venueAddress },
    { icon: ICON_CALENDAR, label: 'Confirmación',       title: event.rsvpDeadline, sub: 'Fecha límite de RSVP' },
  ];

  return (
    <section id="details" className="details-section section" ref={ref}>
      <div className="container">
        <div className="details-header reveal">
          <span className="section-eyebrow section-eyebrow-light">El gran día</span>
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

        {/* Ticket */}
        <div className="ticket-card reveal">
          <div className="ticket-inner">
            <div className="ticket-left">
              <span className="ticket-eyebrow">Valor de la entrada</span>
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
              <div className="ticket-info-item">
                <span className="ticket-info-label">A nombre de</span>
                <span className="ticket-info-value">{ticket.paymentInfo.holder}</span>
                <span className="ticket-alias">{ticket.paymentInfo.alias}</span>
                <span className="ticket-cbu">CBU: {ticket.paymentInfo.cbu}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
