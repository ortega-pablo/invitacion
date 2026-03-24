import { useState, useEffect } from 'react';
import { getTimeRemaining } from '../utils/date';
import { useReveal } from '../hooks/useReveal';
import './Countdown.css';

function CountUnit({ value, label }) {
  return (
    <div className="count-unit">
      <div className="count-value">{String(value).padStart(2, '0')}</div>
      <div className="count-label">{label}</div>
    </div>
  );
}

export default function Countdown({ eventDate }) {
  const [time, setTime] = useState(getTimeRemaining(eventDate));
  const ref = useReveal();
  const year = eventDate.split('-')[0];

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeRemaining(eventDate)), 1000);
    return () => clearInterval(id);
  }, [eventDate]);

  return (
    <section className="countdown-section section" id="countdown">
      <div className="countdown-bg-year">{year}</div>
      <div ref={ref} className="countdown-inner reveal">
        <span className="countdown-eyebrow">Faltan</span>

        {time.total <= 0 ? (
          <p className="countdown-ended">¡El gran día ha llegado! 🎉</p>
        ) : (
          <div className="countdown-grid">
            <CountUnit value={time.days}    label="Días" />
            <CountUnit value={time.hours}   label="Horas" />
            <CountUnit value={time.minutes} label="Minutos" />
            <CountUnit value={time.seconds} label="Segundos" />
          </div>
        )}

        <div className="countdown-divider">
          <div className="countdown-divider-line" />
          <div className="countdown-divider-dot" />
          <div className="countdown-divider-line" />
        </div>
      </div>
    </section>
  );
}
