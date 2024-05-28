import { defineConfig } from 'vite'
import regPxToVw from './vite-plugin-reg-px-to-vw'
export default defineConfig({
  plugins: [regPxToVw()],
  build: {
    target: "es2022"
  },
  esbuild: {
    target: "es2022"
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2022",
    }
  },
  server: {
    proxy: {
      "http://192.168.1.37:5173/": "http://localhost:5173/"
    }
  }
})