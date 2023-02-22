import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [AntDesignVueResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'types/auto-imports.d.ts'
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
      dts: 'types/components.d.ts'
    }),
    Unocss({
      configFile: './uno.config.ts'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '#': resolve(__dirname, './types')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/global.scss" as *;`
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: `http://api.taiwuyou.cn:9007/api/1.0/TwyAgent`, // 代理到 目标路径
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', '')
      }
    }
  }
})
