/**
 * FrançaisPro - Configuration Vite
 * Configuration de build et développement
 * 
 * @author FrançaisPro Team
 * @version 1.0.0
 * @license MIT
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    target: 'es2015',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ai: ['@google/generative-ai'],
          utils: ['bcryptjs', 'uuid', 'sql.js'],
          icons: ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  },
  preview: {
    port: 4173,
    host: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  },
  optimizeDeps: {
    include: ['@google/generative-ai', 'bcryptjs', 'uuid']
  },
  define: {
    global: 'globalThis',
  },
  worker: {
    format: 'es'
  },
  assetsInclude: ['**/*.wasm']
});
