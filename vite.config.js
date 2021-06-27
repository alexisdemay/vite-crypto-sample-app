import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import pkg from './package.json';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [vue()],
  define: {
    _APP_VERSION: JSON.stringify(pkg.version),
  },
  build: {
    sourcemap: process.env.NODE_ENV !== 'production',
  },
});
