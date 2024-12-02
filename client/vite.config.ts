import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for the built files
  },
  // Remove or comment out the server part for production deployment
  // server: {
  //   port: 3000,
  //   proxy: {
  //     '/api': {
  //       target: 'https://azsa-system-backend.onrender.com',
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
