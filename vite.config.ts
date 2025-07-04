import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'PocLib',
      fileName: () => 'PocLib.js',
      formats: ['iife'], 
    },
     rollupOptions: {
    }
  }
});
