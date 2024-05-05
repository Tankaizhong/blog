import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
// import { visualizer } from 'rollup-plugin-visualizer'
import { analyzer } from 'vite-bundle-analyzer'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // visualizer({
    //   emitFile: false,
    //   filename: 'analysis-chart.html', // 分析图生成的文件名
    //   open: true, // 如果存在本地服务端口，将在打包后自动展示
    // }),
    analyzer(),
  ],
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
