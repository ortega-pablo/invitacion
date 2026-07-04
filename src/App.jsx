import './index.css';
import { Link } from 'react-router-dom';
import weddingConfig from './config/wedding.config';
import Hero from './components/Hero';
import Quote from './components/Quote';
import Countdown from './components/Countdown';
import About from './components/About';
import EventDetails from './components/EventDetails';
import Gallery from './components/Gallery';
import Location from './components/Location';
import RSVP from './components/RSVP';
import SongRequest from './components/SongRequest';
import DressCode from './components/DressCode';
import Footer from './components/Footer';

export default function App() {
  const config = weddingConfig;

  return (
    <>
      <main>
        <Hero     config={config} />
        <Quote    config={config} />
        <Countdown eventDate={config.event.date} venueShort={config.event.venueShort} />
        <About    config={config} />
        <EventDetails config={config} />
        <Location config={config} />
        <Gallery  config={config} />
        <RSVP     config={config} />
        <SongRequest config={config} />
        <DressCode config={config} />

        <section id="gifts" className="section" style={{ minHeight: 'auto', padding: '80px 40px' }}>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
            <span className="section-eyebrow section-eyebrow-light">Lista de regalos</span>
            <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 300, color: 'white', marginBottom: 16 }}>
              {config.texts.giftsTitle}
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontWeight: 300, marginBottom: 40 }}>
              {config.texts.giftsSubtitle}
            </p>
            <Link to="/regalos" className="btn btn-gold">
              Ver lista de regalos
            </Link>
          </div>
        </section>
      </main>
      <Footer config={config} />
    </>
  );
}
