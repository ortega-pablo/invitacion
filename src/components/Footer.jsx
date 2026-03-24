import { formatDateLong } from '../utils/date';
import './Footer.css';

export default function Footer({ config }) {
  const { couple, event, texts } = config;
  return (
    <footer className="footer">
      <div className="footer-bg-text">{couple.hashtag}</div>

      <div className="footer-names">
        {couple.person1.firstName}
        <span className="footer-amp"> &amp; </span>
        {couple.person2.firstName}
      </div>

      <div className="footer-divider">
        <div className="footer-divider-line" />
        <span className="footer-divider-icon">✦</span>
        <div className="footer-divider-line" />
      </div>

      <p className="footer-date">{formatDateLong(event.date)}</p>
      <p className="footer-venue">{event.venueShort}</p>

      <div className="footer-hr" />

      <p className="footer-message">
        {texts.footerMessage} <strong>{couple.person1.firstName} &amp; {couple.person2.firstName}</strong> 💚
      </p>
      <p className="footer-hashtag">{couple.hashtag}</p>
      <p className="footer-copy">&copy; {new Date().getFullYear()} · Hecho con amor</p>
    </footer>
  );
}
