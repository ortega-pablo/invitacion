import { useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import { showToast } from '../utils/toast';
import './SongRequest.css';

const empty = { artist: '', song: '', link: '' };

export default function SongRequest({ config }) {
  const { songsSheet, texts } = config;
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('idle');
  const ref = useReveal();

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.artist.trim() || !form.song.trim()) {
      showToast('Por favor completá artista y canción', 'error'); return;
    }
    setStatus('loading');
    try {
      await fetch(songsSheet.scriptUrl, {
        method: 'POST', mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ artist: form.artist.trim(), song: form.song.trim(), link: form.link.trim(), submittedAt: new Date().toISOString() }),
      });
      setStatus('success');
      setForm(empty);
      showToast('¡Canción sugerida! 🎵', 'success', 4000);
    } catch {
      setStatus('error');
      showToast('Hubo un error. Intentá de nuevo.', 'error');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="songs" className="songs-section section">
      <div ref={ref} className="reveal" style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}>
        <div className="songs-header">
          <span className="section-eyebrow songs-eyebrow">{texts.songsTitle}</span>
          <h2 className="songs-heading">¿Qué canción no puede faltar?</h2>
          <p className="songs-sub">{texts.songsSubtitle}</p>
          <div className="songs-divider">
            <div className="songs-divider-line" />
            <span className="songs-divider-icon">✦</span>
            <div className="songs-divider-line" />
          </div>
        </div>

        <form className="songs-form" onSubmit={handleSubmit} noValidate>
          <div className="songs-fields">
            <div className="form-group">
              <label className="form-label form-label-light" htmlFor="artist">Artista</label>
              <input id="artist" className="form-input form-input-dark" type="text"
                placeholder="Ej: Soda Stereo" value={form.artist}
                onChange={(e) => update('artist', e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label form-label-light" htmlFor="song">Canción</label>
              <input id="song" className="form-input form-input-dark" type="text"
                placeholder="Ej: De música ligera" value={form.song}
                onChange={(e) => update('song', e.target.value)} required />
            </div>
            <div className="form-group songs-link-group">
              <label className="form-label form-label-light" htmlFor="link">
                Link de Spotify o YouTube <span className="form-optional">(opcional)</span>
              </label>
              <input id="link" className="form-input form-input-dark" type="url"
                placeholder="https://open.spotify.com/..." value={form.link}
                onChange={(e) => update('link', e.target.value)} />
            </div>
          </div>

          <button type="submit" className={`btn btn-outline-light songs-submit ${status === 'loading' ? 'loading' : ''}`} disabled={status === 'loading'}>
            {status === 'loading' ? (<><span className="spinner" />Enviando...</>) : 'Sugerir canción'}
          </button>
        </form>
      </div>
    </section>
  );
}
