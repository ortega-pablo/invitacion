import { useRevealChildren } from '../hooks/useReveal';
import { formatDateLong } from '../utils/date';
import './About.css';

export default function About({ config }) {
  const { couple, event, texts, gallery } = config;
  const ref = useRevealChildren();

  return (
    <section id="about" className="about-section section" style={{ padding: 0, alignItems: 'stretch' }} ref={ref}>
      <div className="about-split">
        {/* Foto izquierda */}
        <div className="about-photo-side reveal">
          <img
            src={`/photos/${gallery.couplePhoto}`}
            alt={`${couple.person1.firstName} y ${couple.person2.firstName}`}
            loading="lazy"
          />
          <div className="about-photo-accent" />
        </div>

        {/* Texto derecha */}
        <div className="about-text-side">
          <div className="about-text-inner">
            <span className="about-pre reveal reveal-delay-1">Nuestra historia</span>

            <h2 className="about-title reveal reveal-delay-2">
              {couple.person1.firstName}
              <span className="about-title-amp"> &amp; </span>
              {couple.person2.firstName}
            </h2>

            <div className="about-divider reveal reveal-delay-3">
              <div className="about-divider-line" />
              <span className="about-divider-icon">✦</span>
              <div className="about-divider-line" />
            </div>

            <p className="about-body reveal reveal-delay-3">{texts.aboutText}</p>

            <div className="about-date-pill reveal reveal-delay-4">
              <div className="about-date-pill-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <span className="about-date-pill-text">{formatDateLong(event.date)}</span>
            </div>
          </div>

          <div className="about-bg-number">{event.date.split('-')[2]}</div>
        </div>
      </div>
    </section>
  );
}
