import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['api-sitna', 'jsnlog'],
  },
  resolve: {
    alias: {
      'tracasa-components': path.resolve(
        __dirname,
        './src/shared/vendor/tracasa-components.ts',
      ),
      '@/config': path.resolve(__dirname, './src/app-config.ts'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
