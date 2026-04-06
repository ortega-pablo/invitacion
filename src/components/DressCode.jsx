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

        <div className="dresscode-divider">
          <div className="dresscode-divider-line" />
          <span className="dresscode-divider-icon">✦</span>
          <div className="dresscode-divider-line" />
        </div>

        <p className="dresscode-desc">{dressCode.description}</p>

        {dressCode.suggestedColors?.length > 0 && (
          <>
            <span className="dresscode-palette-label">Paleta sugerida</span>
            <div className="dresscode-swatches">
              {dressCode.suggestedColors.map((color, i) => (
                <div key={color} className="swatch-item">
                  <div className="swatch-circle" style={{ background: color }} title={dressCode.colorLabels?.[i]} />
                  <span className="swatch-name">{dressCode.colorLabels?.[i] || ''}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="dresscode-warning">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Te pedimos por favor evitar el color blanco en vestidos
        </div>
      </div>
    </section>
  );
}
