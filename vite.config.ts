import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // resolve: {
  //   alias: [
  //     { find: '@apis', replacement: '/src/apis' },
  //     { find: '@components', replacement: '/src/components' },
  //     { find: '@features', replacement: '/src/features' },
  //     { find: '@utils', replacement: '/src/utils' },
  //   ],
  // }
})
