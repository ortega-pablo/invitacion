import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  build: {
    // No borrar el directorio dist antes de construir
    // (necesario en sistemas de archivos montados)
    emptyOutDir: false,
    // Reportar tamaño de chunks
    reportCompressedSize: true,
    // Optimizaciones de chunk
    chunkSizeWarningLimit: 800,
  },
})
