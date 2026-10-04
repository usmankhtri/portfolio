import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'react-vendor'
          if (id.includes('react-router-dom')) return 'router'
          if (id.includes('framer-motion')) return 'motion'
          if (id.includes('lenis')) return 'lenis'
          if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) return 'forms'
          if (id.includes('@emailjs')) return 'email'
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['framer-motion', 'react-router-dom', 'lenis'],
  },
})
