import { useState, useCallback } from 'react';
import { useReveal } from '../hooks/useReveal';
import './Gallery.css';

function LightboxModal({ photos, activeIndex, onClose, onPrev, onNext }) {
  if (activeIndex === null) return null;
  const photo = photos[activeIndex];
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Cerrar">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
      <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Anterior">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={`/photos/${photo.file}`} alt={photo.alt} className="lightbox-img" />
        <p className="lightbox-caption">{activeIndex + 1} / {photos.length}</p>
      </div>
      <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Siguiente">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  );
}

export default function Gallery({ config }) {
  const { gallery } = config;
  const [activeIndex, setActiveIndex] = useState(null);
  const [slide, setSlide] = useState(0);
  const titleRef = useReveal();

  const openPhoto  = useCallback((i) => setActiveIndex(i), []);
  const closePhoto = useCallback(() => setActiveIndex(null), []);
  const prevPhoto  = useCallback(() => setActiveIndex((i) => (i - 1 + gallery.photos.length) % gallery.photos.length), [gallery.photos.length]);
  const nextPhoto  = useCallback(() => setActiveIndex((i) => (i + 1) % gallery.photos.length), [gallery.photos.length]);

  // Chunkear las fotos en slides de 5 (1 grande + 4 chicas)
  const slides = [];
  for (let i = 0; i < gallery.photos.length; i += 5) {
    const chunk = gallery.photos.slice(i, i + 5).map((photo, j) => ({ photo, idx: i + j }));
    slides.push({ large: chunk[0], smalls: chunk.slice(1, 5) });
  }

  const goPrev = () => setSlide((s) => (s - 1 + slides.length) % slides.length);
  const goNext = () => setSlide((s) => (s + 1) % slides.length);

  const renderItem = ({ photo, idx }, extraClass = '') => (
    <button
      key={photo.file}
      className={`gallery-item ${extraClass}`}
      onClick={() => openPhoto(idx)}
      aria-label={`Ver foto ${idx + 1}`}
    >
      <img src={`/photos/${photo.file}`} alt={photo.alt} loading="lazy" className="gallery-img" />
      <div className="gallery-overlay">
        <div className="gallery-overlay-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
          </svg>
        </div>
      </div>
    </button>
  );

  return (
    <>
      <section id="gallery" className="gallery-section section">
        <div className="container">
          <div ref={titleRef} className="gallery-header reveal">
            <h2 className="gallery-heading">Momentos compartidos</h2>
            <div className="gallery-divider">
              <div className="gallery-divider-line" />
              <span className="gallery-divider-icon">✦</span>
              <div className="gallery-divider-line" />
            </div>
          </div>

          <div className="gallery-slider">
            <button
              className="gallery-slider-nav gallery-slider-prev"
              onClick={goPrev}
              aria-label="Slide anterior"
              disabled={slides.length <= 1}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            <div className="gallery-slider-viewport">
              <div className="gallery-slider-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
                {slides.map((s, i) => (
                  <div
                    key={i}
                    className={`gallery-block gallery-slide ${i % 2 === 0 ? 'gallery-block-left' : 'gallery-block-right'}`}
                  >
                    {renderItem(s.large, 'gallery-item-large')}
                    <div className="gallery-block-smalls">
                      {s.smalls.map((small) => renderItem(small, 'gallery-item-small'))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className="gallery-slider-nav gallery-slider-next"
              onClick={goNext}
              aria-label="Slide siguiente"
              disabled={slides.length <= 1}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>

          {slides.length > 1 && (
            <div className="gallery-slider-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`gallery-slider-dot ${slide === i ? 'active' : ''}`}
                  onClick={() => setSlide(i)}
                  aria-label={`Ir al slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <LightboxModal photos={gallery.photos} activeIndex={activeIndex} onClose={closePhoto} onPrev={prevPhoto} onNext={nextPhoto} />
    </>
  );
}
