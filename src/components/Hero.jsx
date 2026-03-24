import { useEffect, useRef } from 'react';
import { formatDateShort } from '../utils/date';
import './Hero.css';

export default function Hero({ config }) {
  const { couple, event, texts, googleCalendar, gallery } = config;
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleScroll = () => {
      el.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="hero section"
      ref={heroRef}
      style={{ backgroundImage: `url(/photos/${gallery.heroPhoto})` }}
    >
      <div className="hero-overlay" />

      {/* Líneas verticales decorativas */}
      <div className="hero-lines">
        <div className="hero-line" />
        <div className="hero-line" />
      </div>

      {/* Esquinas decorativas */}
      <div className="hero-corner hero-corner-tl" />
      <div className="hero-corner hero-corner-tr" />
      <div className="hero-corner hero-corner-bl" />
      <div className="hero-corner hero-corner-br" />

      <div className="hero-content">
        <span className="hero-eyebrow">{texts.heroTagline}</span>

        <div className="hero-names">
          <span className="hero-name-1">{couple.person1.firstName}</span>
          <div className="hero-amp-wrap">
            <span className="hero-amp">&amp;</span>
          </div>
          <span className="hero-name-2">{couple.person2.firstName}</span>
        </div>

        <div className="hero-date-row">
          <div className="hero-date-line" />
          <span className="hero-date-text">{formatDateShort(event.date)}</span>
          <div className="hero-date-line" />
        </div>

        <p className="hero-venue-text">{event.venueShort}</p>

        <div className="hero-actions">
          <a href="#rsvp" className="btn btn-gold">
            Confirmar asistencia
          </a>
          <a
            href={googleCalendar.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-light"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Agendar
          </a>
        </div>
      </div>

      <a href="#countdown" className="hero-scroll" aria-label="Ir al siguiente">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </a>
    </section>
  );
}
