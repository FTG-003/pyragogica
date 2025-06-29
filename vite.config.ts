import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Ottimizzazioni per performance
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separazione vendor per caching ottimale
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react'],
          // Separazione logica business
          rag: ['./src/services/ragService.ts'],
          data: ['./src/data/libraryContent.ts', './src/data/vectorStore.ts']
        },
        // Nomi file ottimizzati per caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Compressione aggressiva
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    }
  },
  server: {
    // Preload ottimizzato
    warmup: {
      clientFiles: [
        './src/App.tsx',
        './src/pages/HomePage.tsx',
        './src/components/ui/ModernButton.tsx'
      ]
    }
  },
  // Resolve ottimizzato
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // CSS ottimizzazioni
  css: {
    devSourcemap: false,
    postcss: {
      plugins: [
        // Autoprefixer già configurato in postcss.config.js
      ]
    }
  }
});