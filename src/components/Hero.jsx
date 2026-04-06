import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero({ config }) {
  const { couple, texts, gallery } = config;
  const bgRef = useRef(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const handleScroll = () => {
      el.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="hero section">
      <div className="hero-bg" ref={bgRef} style={{ backgroundImage: `url(/photos/${gallery.heroPhoto})` }} />
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
        <div className="hero-names">
          <span className="hero-name-1"><strong>{couple.person1.firstName[0]}</strong>{couple.person1.firstName.slice(1)}</span>
          <div className="hero-amp-wrap">
            <span className="hero-amp">&amp;</span>
          </div>
          <span className="hero-name-2"><strong>{couple.person2.firstName[0]}</strong>{couple.person2.firstName.slice(1)}</span>
        </div>

        <span className="hero-tagline">{texts.heroTagline}</span>

      </div>

      <a href="#countdown" className="hero-scroll" aria-label="Ir al siguiente">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </a>
    </section>
  );
}
