import './index.css';
import weddingConfig from './config/wedding.config';
import Navbar from './components/Navbar';
import SectionNav from './components/SectionNav';
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
import Gifts from './components/Gifts';
import Footer from './components/Footer';

export default function App() {
  const config = weddingConfig;

  return (
    <>
      <Navbar coupleNames={config.couple.displayNames} />
      <SectionNav />
      <main>
        <Hero     config={config} />
        <Quote    config={config} />
        <Countdown eventDate={config.event.date} />
        <About    config={config} />
        <EventDetails config={config} />
        <Gallery  config={config} />
        <Location config={config} />
        <RSVP     config={config} />
        <SongRequest config={config} />
        <DressCode config={config} />
        <Gifts    config={config} />
      </main>
      <Footer config={config} />
    </>
  );
}
