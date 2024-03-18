import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  build: {
    /** If you set esmExternals to true, this plugins assumes that
         all external dependencies are ES modules */

    commonjsOptions: {
      esmExternals: true,
    },
  },
})
