// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  build: {
    // Ottimizzazioni per performance
    target: "es2020",
    minify: "terser",
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separazione vendor per caching ottimale
          vendor: ["react", "react-dom"],
          ui: ["lucide-react"],
          // Separazione logica business
          rag: ["./src/services/ragService.ts"],
          data: ["./src/data/libraryContent.ts", "./src/data/vectorStore.ts"]
        },
        // Nomi file ottimizzati per caching
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]"
      }
    },
    // Compressione aggressiva
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"]
      }
    }
  },
  server: {
    // Preload ottimizzato
    warmup: {
      clientFiles: [
        "./src/App.tsx",
        "./src/pages/HomePage.tsx",
        "./src/components/ui/ModernButton.tsx"
      ]
    }
  },
  // Resolve ottimizzato
  resolve: {
    alias: {
      "@": "/src"
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
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgLy8gT3R0aW1penphemlvbmkgcGVyIHBlcmZvcm1hbmNlXG4gICAgdGFyZ2V0OiAnZXMyMDIwJyxcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA1MDAsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIC8vIFNlcGFyYXppb25lIHZlbmRvciBwZXIgY2FjaGluZyBvdHRpbWFsZVxuICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICB1aTogWydsdWNpZGUtcmVhY3QnXSxcbiAgICAgICAgICAvLyBTZXBhcmF6aW9uZSBsb2dpY2EgYnVzaW5lc3NcbiAgICAgICAgICByYWc6IFsnLi9zcmMvc2VydmljZXMvcmFnU2VydmljZS50cyddLFxuICAgICAgICAgIGRhdGE6IFsnLi9zcmMvZGF0YS9saWJyYXJ5Q29udGVudC50cycsICcuL3NyYy9kYXRhL3ZlY3RvclN0b3JlLnRzJ11cbiAgICAgICAgfSxcbiAgICAgICAgLy8gTm9taSBmaWxlIG90dGltaXp6YXRpIHBlciBjYWNoaW5nXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5bZXh0XSdcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIENvbXByZXNzaW9uZSBhZ2dyZXNzaXZhXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuICAgICAgICBwdXJlX2Z1bmNzOiBbJ2NvbnNvbGUubG9nJywgJ2NvbnNvbGUuaW5mbycsICdjb25zb2xlLmRlYnVnJ11cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIC8vIFByZWxvYWQgb3R0aW1penphdG9cbiAgICB3YXJtdXA6IHtcbiAgICAgIGNsaWVudEZpbGVzOiBbXG4gICAgICAgICcuL3NyYy9BcHAudHN4JyxcbiAgICAgICAgJy4vc3JjL3BhZ2VzL0hvbWVQYWdlLnRzeCcsXG4gICAgICAgICcuL3NyYy9jb21wb25lbnRzL3VpL01vZGVybkJ1dHRvbi50c3gnXG4gICAgICBdXG4gICAgfVxuICB9LFxuICAvLyBSZXNvbHZlIG90dGltaXp6YXRvXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiAnL3NyYydcbiAgICB9XG4gIH0sXG4gIC8vIENTUyBvdHRpbWl6emF6aW9uaVxuICBjc3M6IHtcbiAgICBkZXZTb3VyY2VtYXA6IGZhbHNlLFxuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgLy8gQXV0b3ByZWZpeGVyIGdpXHUwMEUwIGNvbmZpZ3VyYXRvIGluIHBvc3Rjc3MuY29uZmlnLmpzXG4gICAgICBdXG4gICAgfVxuICB9XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLGNBQWM7QUFBQSxFQUMxQjtBQUFBLEVBQ0EsT0FBTztBQUFBO0FBQUEsSUFFTCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCx1QkFBdUI7QUFBQSxJQUN2QixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUE7QUFBQSxVQUVaLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUM3QixJQUFJLENBQUMsY0FBYztBQUFBO0FBQUEsVUFFbkIsS0FBSyxDQUFDLDhCQUE4QjtBQUFBLFVBQ3BDLE1BQU0sQ0FBQyxnQ0FBZ0MsMkJBQTJCO0FBQUEsUUFDcEU7QUFBQTtBQUFBLFFBRUEsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxRQUNmLFlBQVksQ0FBQyxlQUFlLGdCQUFnQixlQUFlO0FBQUEsTUFDN0Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFTixRQUFRO0FBQUEsTUFDTixhQUFhO0FBQUEsUUFDWDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUs7QUFBQSxJQUNQO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxLQUFLO0FBQUEsSUFDSCxjQUFjO0FBQUEsSUFDZCxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUE7QUFBQSxNQUVUO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
