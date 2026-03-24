import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Nosotros', href: '#about' },
  { label: 'El día', href: '#details' },
  { label: 'Galería', href: '#gallery' },
  { label: 'RSVP', href: '#rsvp' },
  { label: 'Regalos', href: '#gifts' },
];

export default function Navbar({ coupleNames }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-inner">
        <a href="#hero" className="navbar-brand" onClick={handleLinkClick}>
          {coupleNames}
        </a>

        <nav className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
