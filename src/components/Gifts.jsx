import { useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import { showToast } from '../utils/toast';
import './Gifts.css';

function GiftCard({ item, onSelect, loading }) {
  return (
    <div className={`gift-card ${item.purchased ? 'purchased' : ''}`}>
      <div className="gift-card-inner">
        <span className="gift-tag">{item.category}</span>
        <h3 className="gift-name">{item.name}</h3>
        <p className="gift-desc">{item.description}</p>
        {item.price > 0 && <p className="gift-price">USD {item.price}</p>}
        <div className="gift-footer">
          {item.purchased ? (
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

export default function Gifts({ config }) {
  const { giftsSheet, texts } = config;
  const [items, setItems] = useState(giftsSheet.items);
  const [loadingId, setLoadingId] = useState(null);
  const [confirmItem, setConfirmItem] = useState(null);
  const ref = useReveal();

  useEffect(() => {
    const url = giftsSheet.scriptUrl;
    if (url.includes('TU_SCRIPT')) return;
    fetch(url + '?action=list').then((r) => r.json()).then((data) => {
      if (Array.isArray(data)) setItems(data);
    }).catch(() => {});
  }, [giftsSheet.scriptUrl]);

  const confirmPurchase = async () => {
    if (!confirmItem) return;
    setLoadingId(confirmItem.id);
    setConfirmItem(null);
    try {
      await fetch(giftsSheet.scriptUrl, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'purchase', id: confirmItem.id }),
      });
      setItems((prev) => prev.map((i) => i.id === confirmItem.id ? { ...i, purchased: true } : i));
      showToast(`¡Gracias! Reservaste "${confirmItem.name}" 🎁`, 'success', 4000);
    } catch {
      showToast('No se pudo reservar. Intentá de nuevo.', 'error');
    } finally {
      setLoadingId(null);
    }
  };

  const available = items.filter((i) => !i.purchased).length;
  const purchased  = items.filter((i) => i.purchased).length;

  return (
    <>
      <section id="gifts" className="gifts-section section">
        <div className="container">
          <div ref={ref} className="reveal">
            <div className="gifts-header">
              <span className="section-eyebrow gifts-eyebrow section-eyebrow-light">{texts.giftsTitle}</span>
              <h2 className="gifts-heading">Lista de regalos</h2>
              <p className="gifts-sub">{texts.giftsSubtitle}</p>
              <div className="gifts-divider">
                <div className="gifts-divider-line" />
                <span className="gifts-divider-icon">✦</span>
                <div className="gifts-divider-line" />
              </div>
              <div className="gifts-stats">
                <div style={{ textAlign: 'center' }}>
                  <div className={`gifts-stat-num available`}>{available}</div>
                  <div className="gifts-stat-label">disponibles</div>
                </div>
                <div className="gifts-stat-sep" />
                <div style={{ textAlign: 'center' }}>
                  <div className="gifts-stat-num">{purchased}</div>
                  <div className="gifts-stat-label">reservados</div>
                </div>
              </div>
            </div>

            {available === 0 ? (
              <div className="gifts-empty reveal">🎉 ¡Todos los regalos fueron reservados! Muchas gracias.</div>
            ) : (
              <div className="gifts-grid">
                {items.map((item) => (
                  <GiftCard key={item.id} item={item} onSelect={setConfirmItem} loading={loadingId} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {confirmItem && (
        <div className="confirm-overlay" onClick={() => setConfirmItem(null)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="confirm-title">Confirmar regalo</h3>
            <p className="confirm-body">
              ¿Confirmás que querés reservar <strong>"{confirmItem.name}"</strong>?
              <span className="confirm-note">Una vez reservado no podrá ser elegido por otra persona.</span>
            </p>
            <div className="confirm-actions">
              <button className="btn btn-outline-light" onClick={() => setConfirmItem(null)}>Cancelar</button>
              <button className="btn btn-gold" onClick={confirmPurchase}>Sí, lo reservo</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
