import { useReveal } from '../hooks/useReveal';
import './Quote.css';

export default function Quote({ config }) {
  const ref = useReveal();
  return (
    <section className="quote-section">
      <div ref={ref} className="quote-inner reveal">
        <svg className="quote-mark quote-open" viewBox="0 0 40 32" fill="currentColor" aria-hidden="true">
          <path d="M16 0C7.16 0 0 7.16 0 16c0 5.52 2.8 10.4 7.06 13.28L4 32l6-2c1.88.64 3.88 1 5.98 1h.02c8.84 0 16-7.16 16-16S24.84 0 16 0zm0 0" opacity="0.3"/>
          <text x="4" y="28" fontSize="40" fontFamily="'Cormorant Garamond', serif" fontWeight="300" opacity="0.7">"</text>
        </svg>
        <blockquote className="quote-text">
          {config.texts.quoteText || 'Todos somos mortales, hasta el primer beso y la segunda copa de vino.'}
        </blockquote>
        <svg className="quote-mark quote-close" viewBox="0 0 40 32" fill="currentColor" aria-hidden="true">
          <text x="4" y="28" fontSize="40" fontFamily="'Cormorant Garamond', serif" fontWeight="300" opacity="0.7">"</text>
        </svg>
      </div>
    </section>
  );
}
