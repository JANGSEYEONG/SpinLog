import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
// import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  define: {
    global: {},
  },
  server: {
    host: '0.0.0.0', // 모든 IP에서 접근 가능하게 설정
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@service': path.resolve(__dirname, 'src/service'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@layout': path.resolve(__dirname, 'src/components/layout'),
      src: path.resolve(__dirname, './src'),
    },
  },
  build: {
    cssCodeSplit: false,
    cssMinify: true,
    rollupOptions: {
      input: {
        main: './index.html',
        sw: './sw.js',
      },
    },
  },
});
