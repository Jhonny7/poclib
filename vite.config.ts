import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'IgnoreThis',
      fileName: () => 'PocLib.js',
      formats: ['iife'], 
    },
    rollupOptions: {
      output: {
        globals: {
          
        }
      }
    }
  }
});
