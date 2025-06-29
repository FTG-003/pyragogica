import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // Add WebContainer-specific optimizations
    hmr: {
      port: 5173,
    },
    // Disable file system watching optimizations that might cause issues in WebContainer
    watch: {
      usePolling: false,
      interval: 100,
    },
  },
  // Optimize for WebContainer environment
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
    force: true,
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
  // Ensure compatibility with WebContainer
  define: {
    global: 'globalThis',
  },
})