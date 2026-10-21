import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
export default defineConfig({
 base: './', plugins: [react()],
 build: { rollupOptions: { input: {
 main: resolve('index.html'), pets: resolve('pages/our_pets.html'), jennifer: resolve('pages/pets/pet_jennifer.html')
 } } },
 test: { environment: 'jsdom', setupFiles: ['./src/test/setup.js'] }
});
