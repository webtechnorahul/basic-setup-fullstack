import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Intercepts all requests starting with /api
      '/api': {
        target: 'http://localhost:3000/api', // Change this to your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Removes '/api' from the target URL path if your backend doesn't use it
      },
    },
  },
})
