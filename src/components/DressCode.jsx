import { useReveal } from '../hooks/useReveal';
import './DressCode.css';

export default function DressCode({ config }) {
  const { dressCode } = config;
  const ref = useReveal();

  return (
    <section id="dresscode" className="dresscode-section section linen-texture-dark">
      <div ref={ref} className="dresscode-inner reveal">
        <span className="section-eyebrow dresscode-eyebrow">Indumentaria</span>
        <h2 className="dresscode-heading">{dressCode.title}</h2>
        {dressCode.subtitle && (
          <p className="dresscode-subtitle">{dressCode.subtitle}</p>
        )}

        <div className="dresscode-divider">
          <div className="dresscode-divider-line" />
          <span className="dresscode-divider-icon">✦</span>
          <div className="dresscode-divider-line" />
        </div>

        <p className="dresscode-desc">{dressCode.description}</p>

        {dressCode.paletteText && (
          <div className="dresscode-palette-text">
            <span className="dresscode-palette-label">Paleta sugerida</span>
            <p className="dresscode-palette-value">{dressCode.paletteText}</p>
          </div>
        )}

        <div className="dresscode-warning">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Para cuidar la estética general, te pedimos evitar el blanco y plateado en vestidos, y los azules medios en trajes
        </div>
      </div>
    </section>
  );
}
