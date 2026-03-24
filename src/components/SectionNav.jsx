import { useState, useEffect } from 'react';
import './SectionNav.css';

const SECTIONS = [
  { id: 'hero',      label: 'Inicio' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'about',     label: 'Nosotros' },
  { id: 'details',   label: 'El día' },
  { id: 'gallery',   label: 'Galería' },
  { id: 'location',  label: 'Cómo llegar' },
  { id: 'rsvp',      label: 'RSVP' },
  { id: 'songs',     label: 'Canciones' },
  { id: 'dresscode', label: 'Dress Code' },
  { id: 'gifts',     label: 'Regalos' },
];

export default function SectionNav() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="section-nav" aria-label="Navegación de secciones">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          className={`section-nav-dot ${active === id ? 'active' : ''}`}
          onClick={() => handleClick(id)}
          aria-label={label}
          title={label}
        >
          <span className="dot-inner" />
          <span className="dot-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
