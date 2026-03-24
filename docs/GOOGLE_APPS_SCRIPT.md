# Configuración de Google Apps Script

Este proyecto usa Google Apps Script como backend serverless para conectar el sitio con Google Sheets.
Necesitás crear **3 scripts** (o uno solo con múltiples endpoints):

---

## Paso a paso general

### 1. Crear los Google Sheets

Creá 3 hojas de cálculo en Google Drive:

| Hoja | Propósito |
|------|-----------|
| `Invitación - RSVP` | Guarda confirmaciones de asistencia |
| `Invitación - Canciones` | Guarda sugerencias de canciones |
| `Invitación - Regalos` | Lista de regalos y estado de compra |

---

## Script 1: RSVP (Confirmación de asistencia)

### Estructura del Sheet

Columnas en la primera fila (fila 1):
```
A: Fecha y hora | B: Nombre | C: DNI | D: Total invitados
```

### Código del script

1. Abrí tu Sheet de RSVP
2. Andá a **Extensiones → Apps Script**
3. Pegá este código:

```javascript
const SHEET_NAME = 'RSVP';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
      || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Agregar encabezados si la hoja está vacía
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Fecha y hora', 'Nombre', 'DNI', 'Total invitados', 'Evento']);
    }

    // Guardar cada invitado en una fila separada
    data.guests.forEach(guest => {
      sheet.appendRow([
        data.submittedAt,
        guest.name,
        guest.dni,
        data.totalGuests,
        data.event || ''
      ]);
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Guardá y hacé clic en **Implementar → Nueva implementación**
5. Tipo: **Aplicación web**
6. Ejecutar como: **Yo**
7. Quién tiene acceso: **Cualquier usuario**
8. Copiá la URL generada → pegala en `wedding.config.js` → `rsvpSheet.scriptUrl`

---

## Script 2: Sugerencias de canciones

### Estructura del Sheet

```
A: Fecha y hora | B: Artista | C: Canción | D: Link
```

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Fecha y hora', 'Artista', 'Canción', 'Link', 'Estado']);
    }

    sheet.appendRow([
      data.submittedAt,
      data.artist,
      data.song,
      data.link || '',
      'Pendiente'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Script 3: Lista de regalos (con marcar como comprado)

### Estructura del Sheet `Regalos`

```
A: id | B: name | C: description | D: price | E: category | F: purchased (TRUE/FALSE)
```

**Importante:** Poblá el sheet manualmente con los regalos del `wedding.config.js` antes de publicar.

```javascript
const GIFTS_SHEET = 'Regalos';

function doGet(e) {
  const action = e.parameter.action;

  if (action === 'list') {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(GIFTS_SHEET);
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const gifts = data.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = row[i]);
      return obj;
    });

    return ContentService
      .createTextOutput(JSON.stringify(gifts))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.action === 'purchase') {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(GIFTS_SHEET);
      const values = sheet.getDataRange().getValues();

      // Buscar la fila por id (columna A = index 0)
      for (let i = 1; i < values.length; i++) {
        if (String(values[i][0]) === String(data.id)) {
          // Columna F = index 5 = 'purchased'
          sheet.getRange(i + 1, 6).setValue(true);
          break;
        }
      }

      return ContentService
        .createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: 'Unknown action' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## Problema de CORS

Google Apps Script con `no-cors` no devuelve la respuesta al navegador, pero el dato **sí se guarda** en el Sheet. Para el script de **Regalos** (que necesita leer datos), necesitás activar CORS:

Agregá este header en el `doGet` de regalos:

```javascript
return ContentService
  .createTextOutput(JSON.stringify(gifts))
  .setMimeType(ContentService.MimeType.JSON);
```

Los requests GET de Gifts sí retornan datos correctamente ya que no usan `no-cors`.

---

## Checklist final

- [ ] Sheet RSVP creado y script publicado → URL en `rsvpSheet.scriptUrl`
- [ ] Sheet Canciones creado y script publicado → URL en `songsSheet.scriptUrl`
- [ ] Sheet Regalos creado, datos ingresados manualmente, script publicado → URL en `giftsSheet.scriptUrl`
- [ ] Link de Google Maps actualizado en `maps.url`
- [ ] Link de Google Calendar actualizado en `googleCalendar.url`
- [ ] Datos del evento completados (fecha, salón, dirección)
- [ ] Datos de transferencia completados en `ticket.paymentInfo`
