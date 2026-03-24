/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║         CONFIGURACIÓN CENTRAL DE LA INVITACIÓN              ║
 * ║  Editá este archivo para personalizar cada casamiento        ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * INSTRUCCIONES:
 * 1. Completá los datos de la pareja y el evento
 * 2. Reemplazá las URLs de Google (Sheets, Maps, Calendar)
 * 3. Actualizá la lista de regalos
 * 4. Personalizá colores y tipografías si es necesario
 */

export const weddingConfig = {
  // ─────────────────────────────────────────────
  // 👫 PAREJA
  // ─────────────────────────────────────────────
  couple: {
    person1: {
      firstName: "Pablo",
      lastName: "Ortega",
    },
    person2: {
      firstName: "Camila",
      lastName: "",
    },
    // Texto que aparece en el hero: "Pablo & Camila"
    displayNames: "Pablo & Camila",
    // Apellido conjunto para el footer
    jointName: "Ortega",
    // Hashtag para redes sociales
    hashtag: "#PabloYCamila",
  },

  // ─────────────────────────────────────────────
  // 📅 EVENTO
  // ─────────────────────────────────────────────
  event: {
    // Fecha del casamiento (formato ISO: YYYY-MM-DD)
    date: "2026-12-05",
    // Hora de inicio de la ceremonia
    ceremonyTime: "19:00",
    // Hora de inicio del festejo (recepción)
    receptionTime: "21:00",
    // Nombre del salón / lugar
    venueName: "Nombre del Salón",
    // Dirección completa
    venueAddress: "Dirección del Salón, Ciudad, Argentina",
    // Texto corto para mostrar en la tarjeta
    venueShort: "Nombre del Salón · Ciudad",
    // Fecha límite de confirmación
    rsvpDeadline: "31 de agosto de 2026",
  },

  // ─────────────────────────────────────────────
  // 💵 TICKET / PRECIO
  // ─────────────────────────────────────────────
  ticket: {
    currency: "USD",
    adultPrice: 70,
    childPrice: 35,         // niños de 3 a 10 años
    childAgeRange: "3 a 10 años",
    paymentDeadline: "31 de agosto de 2026",
    // Datos de transferencia / pago
    paymentInfo: {
      alias: "ALIAS.CBU.AQUI",
      cbu: "0000000000000000000000",
      bankName: "Banco",
      holder: "Pablo Ortega",
    },
  },

  // ─────────────────────────────────────────────
  // 🗓️ GOOGLE CALENDAR
  // ─────────────────────────────────────────────
  googleCalendar: {
    // Generá tu link en: https://calendar.google.com/calendar/r/eventedit
    // O usá este formato:
    // https://calendar.google.com/calendar/render?action=TEMPLATE&text=NOMBRE&dates=INICIO/FIN&details=DESCRIPCION&location=LUGAR
    url: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Casamiento+Pablo+%26+Camila&dates=20261205T220000Z/20261206T060000Z&details=¡Celebremos+juntos!&location=Nombre+del+Salón,+Argentina",
  },

  // ─────────────────────────────────────────────
  // 📍 GOOGLE MAPS
  // ─────────────────────────────────────────────
  maps: {
    // Reemplazá con el link de Google Maps al lugar
    url: "https://maps.google.com/?q=Nombre+del+Salón+Argentina",
    // Embed URL para el mapa integrado (opcional)
    embedUrl: "",
  },

  // ─────────────────────────────────────────────
  // 📋 GOOGLE SHEETS – CONFIRMACIÓN DE ASISTENCIA
  // ─────────────────────────────────────────────
  rsvpSheet: {
    // URL de tu Google Apps Script (web app) para enviar el form
    // Ver: /docs/GOOGLE_APPS_SCRIPT.md para instrucciones de configuración
    scriptUrl: "https://script.google.com/macros/s/TU_SCRIPT_ID_RSVP/exec",
    // URL directa al Google Sheet (para el admin)
    sheetUrl: "https://docs.google.com/spreadsheets/d/TU_SHEET_ID_RSVP",
  },

  // ─────────────────────────────────────────────
  // 🎵 GOOGLE SHEETS – SUGERENCIAS DE CANCIONES
  // ─────────────────────────────────────────────
  songsSheet: {
    scriptUrl: "https://script.google.com/macros/s/TU_SCRIPT_ID_SONGS/exec",
    sheetUrl: "https://docs.google.com/spreadsheets/d/TU_SHEET_ID_SONGS",
  },

  // ─────────────────────────────────────────────
  // 🎁 GOOGLE SHEETS – LISTA DE REGALOS
  // ─────────────────────────────────────────────
  giftsSheet: {
    // Script URL para leer/marcar regalos
    scriptUrl: "https://script.google.com/macros/s/TU_SCRIPT_ID_GIFTS/exec",
    sheetUrl: "https://docs.google.com/spreadsheets/d/TU_SHEET_ID_GIFTS",
    // Lista de regalos (también visible en el Sheet)
    // Campos: id, name, description, price, imageUrl (opcional), purchased
    items: [
      {
        id: "1",
        name: "Set de sábanas premium",
        description: "King size, algodón 500 hilos",
        price: 150,
        category: "Dormitorio",
        purchased: false,
      },
      {
        id: "2",
        name: "Batería de cocina",
        description: "Set 10 piezas antiadherente",
        price: 200,
        category: "Cocina",
        purchased: false,
      },
      {
        id: "3",
        name: "Cafetera italiana",
        description: "Moka de aluminio + molino de café",
        price: 80,
        category: "Cocina",
        purchased: false,
      },
      {
        id: "4",
        name: "Vajilla completa",
        description: "Servicio para 8 personas",
        price: 250,
        category: "Cocina",
        purchased: false,
      },
      {
        id: "5",
        name: "Cava de vinos",
        description: "Capacidad 12 botellas",
        price: 300,
        category: "Living",
        purchased: false,
      },
      {
        id: "6",
        name: "Set de toallas",
        description: "Pack 6 piezas 100% algodón",
        price: 90,
        category: "Baño",
        purchased: false,
      },
      {
        id: "7",
        name: "Robot de cocina",
        description: "Procesador multiuso",
        price: 180,
        category: "Cocina",
        purchased: false,
      },
      {
        id: "8",
        name: "Aspiradora robot",
        description: "Con app y mapeo del hogar",
        price: 350,
        category: "Hogar",
        purchased: false,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 👗 DRESS CODE
  // ─────────────────────────────────────────────
  dressCode: {
    title: "Dress Code",
    description: "Formal. Les pedimos evitar el blanco y el negro.",
    suggestedColors: ["#D4B896", "#8B9A6B", "#C4A882", "#B5C4A0"],
    colorLabels: ["Arena", "Sage", "Camel", "Verde suave"],
  },

  // ─────────────────────────────────────────────
  // 📸 GALERÍA DE FOTOS
  // ─────────────────────────────────────────────
  gallery: {
    // Lista de fotos del directorio /public/photos
    // El script de copia las renombra a photo_001.jpg, photo_002.jpg, etc.
    // Podés editar cuáles mostrar y en qué orden
    // Podés reordenar o quitar fotos de esta lista para la galería
    photos: [
      { file: "photo_001.jpg", alt: "Pablo y Camila" },
      { file: "photo_002.jpg", alt: "Pablo y Camila" },
      { file: "photo_003.jpg", alt: "Pablo y Camila" },
      { file: "photo_004.jpg", alt: "Pablo y Camila" },
      { file: "photo_005.jpg", alt: "Pablo y Camila" },
      { file: "photo_006.jpg", alt: "Pablo y Camila" },
      { file: "photo_007.jpg", alt: "Pablo y Camila" },
      { file: "photo_008.jpg", alt: "Pablo y Camila" },
      { file: "photo_009.jpg", alt: "Pablo y Camila" },
      { file: "photo_012.jpg", alt: "Pablo y Camila" },
      { file: "photo_013.jpg", alt: "Pablo y Camila" },
      { file: "photo_014.jpg", alt: "Pablo y Camila" },
    ],
    // Foto del hero (fondo principal) — elegí la más impactante
    heroPhoto: "photo_010.jpg",
    // Foto del about section
    couplePhoto: "photo_011.jpg",
  },

  // ─────────────────────────────────────────────
  // 🎨 TEMA / COLORES (usados como variables CSS)
  // ─────────────────────────────────────────────
  theme: {
    colors: {
      primary: "#4E5B31",       // Verde oliva
      secondary: "#E8DFC9",     // Beige lino
      neutral: "#8B6B4A",       // Madera natural
      accent: "#C96A3D",        // Terracota
      gold: "#C6A75E",          // Dorado
      white: "#FAFAF7",
      dark: "#2C3018",
    },
    fonts: {
      title: "'Cormorant Garamond', serif",
      body: "'Raleway', sans-serif",
    },
  },

  // ─────────────────────────────────────────────
  // 📝 TEXTOS PERSONALIZABLES
  // ─────────────────────────────────────────────
  texts: {
    quoteText: "Todos somos mortales, hasta el primer beso y la segunda copa de vino.",
    heroTagline: "¡Nos casamos!",
    heroSubtitle: "Queremos compartir este día tan especial con vos",
    aboutTitle: "Nuestra historia",
    aboutText:
      "Después de tantos momentos compartidos, queremos dar el paso más importante de nuestras vidas rodeados de las personas que más amamos. Gracias por ser parte de este camino.",
    ceremonyLabel: "Ceremonia",
    receptionLabel: "Festejo",
    rsvpTitle: "Confirmá tu asistencia",
    rsvpSubtitle: "Por favor confirmá antes del",
    songsTitle: "Sugerí una canción",
    songsSubtitle: "¡Ayudanos a armar la playlist perfecta!",
    giftsTitle: "Lista de regalos",
    giftsSubtitle: "Si querés hacernos un regalo, acá está nuestra lista",
    mapTitle: "¿Cómo llegar?",
    footerMessage: "Con amor,",
  },
};

export default weddingConfig;
