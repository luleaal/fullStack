import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default {
  server: {
    host: '0.0.0.0', // This allows external access
    port: 5173, // The port you want to use
  }, 
  plugins: [react()],
};

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
