import { useReveal } from '../hooks/useReveal';
import './Location.css';

export default function Location({ config }) {
  const { event, maps, texts, googleCalendar } = config;
  const ref = useReveal();

  return (
    <section id="location" className="location-section section linen-texture-dark">
      <div className="container">
        <div ref={ref} className="reveal">
          <div className="location-header">
            <span className="section-eyebrow location-eyebrow section-eyebrow-light">{texts.mapTitle}</span>
            <h2 className="location-heading">¿Dónde nos encontramos?</h2>
            <div className="location-divider">
              <div className="location-divider-line" />
              <span className="location-divider-icon">✦</span>
              <div className="location-divider-line" />
            </div>
          </div>

          <div className="location-card">
            <div className="location-info" style={{ position: 'relative' }}>
              <div className="location-card-accent" />
              <div>
                <h3 className="location-name">{event.venueName}</h3>
                <p className="location-address">{event.venueAddress}</p>
              </div>

              <div className="location-times">
                <div className="location-time-block">
                  <span className="location-time-label">
                    <span className="location-time-dot dot-ceremony" />
                    Inicio
                  </span>
                  <span className="location-time-value">20:00 hs</span>
                </div>
                <div className="location-time-block">
                  <span className="location-time-label">
                    <span className="location-time-dot dot-reception" />
                    Ceremonia
                  </span>
                  <span className="location-time-value">{event.ceremonyTime} hs</span>
                </div>
              </div>

              <div className="location-actions">
                <a href={googleCalendar.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Agendar
                </a>
              </div>
            </div>

            <div className="location-map-side">
              {maps.embedUrl ? (
                <iframe src={maps.embedUrl} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa" />
              ) : (
                <a href={maps.url} target="_blank" rel="noopener noreferrer" className="location-map-placeholder" aria-label="Abrir mapa">
                  <div className="map-pin-wrap">
                    <div className="map-pin-ring" />
                    <div className="map-pin-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" opacity="0.9"/>
                        <circle cx="12" cy="10" r="3" fill="white" opacity="0.95"/>
                      </svg>
                    </div>
                  </div>
                  <p className="map-cta-label">Ver en Google Maps</p>
                  <p className="map-venue-name">{event.venueName}</p>
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
