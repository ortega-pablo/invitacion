import { useReveal } from '../hooks/useReveal';
import './Quote.css';

export default function Quote({ config }) {
  const ref = useReveal();
  return (
    <section className="quote-section linen-texture">
      <div ref={ref} className="quote-inner reveal">
        <span className="quote-mark quote-open" aria-hidden="true">&ldquo;</span>
        <blockquote className="quote-text">
          {config.texts.quoteText || 'Todos somos mortales, hasta el primer beso y la segunda copa de vino.'}
        </blockquote>
        <span className="quote-mark quote-close" aria-hidden="true">&rdquo;</span>
      </div>
    </section>
  );
}
