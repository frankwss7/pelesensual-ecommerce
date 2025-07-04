import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Importante para o Vercel
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true
  },
  publicDir: 'public' // Garante que assets públicos sejam copiados
})
