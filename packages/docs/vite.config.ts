import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
export default defineConfig({
  plugins: [solid()],
});
