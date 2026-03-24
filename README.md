# 💚 Wedding Invitation Template

Template de invitación de casamiento responsive, construido con **React + Vite**.

## 🚀 Cómo usar

```bash
npm install
npm run dev      # desarrollo → http://localhost:5173
npm run build    # build de producción
```

## 📝 Personalizar para cada casamiento

**Todo el contenido editable está en un solo archivo:**

```
src/config/wedding.config.js
```

Editá: nombres, fecha, lugar, precios, URLs de Google, fotos, regalos, dress code y textos.

## 📸 Fotos

Las fotos van en `public/photos/` como `photo_001.jpg`, `photo_002.jpg`, etc.
Actualizá la lista en `wedding.config.js` → `gallery.photos`

## 🔗 Google Apps Script

Ver instrucciones en `docs/GOOGLE_APPS_SCRIPT.md`.

## 🌐 Deploy recomendado: Netlify (gratis)

1. `npm run build`
2. Subí la carpeta `dist/` a Netlify Drop → netlify.com/drop
