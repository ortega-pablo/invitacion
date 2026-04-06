import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { showToast } from '../utils/toast';
import weddingConfig from '../config/wedding.config';
import '../index.css';
import '../components/Gifts.css';

function GiftCard({ item, onSelect, loading }) {
  return (
    <div className={`gift-card ${item.reservado ? 'purchased' : ''}`}>
      <div className="gift-card-inner">
        <h3 className="gift-name">{item.nombre}</h3>
        {item.descripcion && <p className="gift-desc">{item.descripcion}</p>}
        {item.precio > 0 && <p className="gift-price">$ {item.precio}</p>}
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="gift-link">
            Ver referencia
          </a>
        )}
        <div className="gift-footer">
          {item.reservado ? (
            <div className="gift-purchased-tag">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Ya reservado
            </div>
          ) : (
            <button className={`btn btn-gold gift-btn ${loading === item.id ? 'loading' : ''}`}
              onClick={() => onSelect(item)} disabled={!!loading}>
              {loading === item.id ? (<><span className="spinner" />Reservando...</>) : 'Lo compro yo'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GiftsPage() {
  const { giftsSheet, couple, texts } = weddingConfig;
  const [items, setItems] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [confirmItem, setConfirmItem] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (giftsSheet.scriptUrl.includes('TU_SCRIPT')) {
      setFetching(false);
      return;
    }
    fetch(giftsSheet.scriptUrl)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data.map((g) => ({
            ...g,
            reservado: g.reservado === true || g.reservado === 'TRUE' || g.reservado === 'true',
          })));
        }
      })
      .catch(() => showToast('No se pudo cargar la lista de regalos', 'error'))
      .finally(() => setFetching(false));
  }, [giftsSheet.scriptUrl]);

  const confirmPurchase = async () => {
    if (!confirmItem) return;
    setLoadingId(confirmItem.id);
    setConfirmItem(null);
    try {
      await fetch(giftsSheet.scriptUrl, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ id: confirmItem.id }),
      });
      setItems((prev) => prev.map((i) => i.id === confirmItem.id ? { ...i, reservado: true } : i));
      showToast(`Reservaste "${confirmItem.nombre}"`, 'success', 4000);
    } catch {
      showToast('No se pudo reservar. Intentá de nuevo.', 'error');
    } finally {
      setLoadingId(null);
    }
  };

  const available = items.filter((i) => !i.reservado).length;
  const purchased = items.filter((i) => i.reservado).length;

  return (
    <div className="gifts-page">
      <header className="gifts-page-header">
        <Link to="/" className="gifts-back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Volver a la invitación
        </Link>
        <span className="gifts-page-brand">{couple.displayNames}</span>
      </header>

      <section className="gifts-section section">
        <div className="container">
          <div className="gifts-header">
            <span className="section-eyebrow section-eyebrow-light">{texts.giftsTitle}</span>
            <h2 className="gifts-heading">Lista de regalos</h2>
            <p className="gifts-sub">{texts.giftsSubtitle}</p>
            <div className="gifts-divider">
              <div className="gifts-divider-line" />
              <span className="gifts-divider-icon">✦</span>
              <div className="gifts-divider-line" />
            </div>
            {!fetching && items.length > 0 && (
              <div className="gifts-stats">
                <div style={{ textAlign: 'center' }}>
                  <div className="gifts-stat-num available">{available}</div>
                  <div className="gifts-stat-label">disponibles</div>
                </div>
                <div className="gifts-stat-sep" />
                <div style={{ textAlign: 'center' }}>
                  <div className="gifts-stat-num">{purchased}</div>
                  <div className="gifts-stat-label">reservados</div>
                </div>
              </div>
            )}
          </div>

          {fetching ? (
            <div className="gifts-loading">
              <span className="spinner" /> Cargando regalos...
            </div>
          ) : items.length === 0 ? (
            <div className="gifts-empty">Pronto publicaremos la lista de regalos.</div>
          ) : available === 0 ? (
            <div className="gifts-empty">Todos los regalos fueron reservados.</div>
          ) : (
            <div className="gifts-grid">
              {items.map((item) => (
                <GiftCard key={item.id} item={item} onSelect={setConfirmItem} loading={loadingId} />
              ))}
            </div>
          )}
        </div>
      </section>

      {confirmItem && (
        <div className="confirm-overlay" onClick={() => setConfirmItem(null)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="confirm-title">Confirmar regalo</h3>
            <p className="confirm-body">
              ¿Confirmás que querés reservar <strong>"{confirmItem.nombre}"</strong>?
              <span className="confirm-note">Una vez reservado no podrá ser elegido por otra persona.</span>
            </p>
            <div className="confirm-actions">
              <button className="btn btn-outline-light" onClick={() => setConfirmItem(null)}>Cancelar</button>
              <button className="btn btn-gold" onClick={confirmPurchase}>Sí, lo reservo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
