import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pxtoviewport from 'postcss-px-to-viewport-8-plugin';
// https://vitejs.dev/config/
export default ({ mode }) => {
  const { VITE_BASE_URL } = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [NaiveUiResolver()],
        imports: ['vue', 'vue-router', 'pinia', '@vueuse/core', { 'lodash-es': [] }, {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }],
        dts: 'types/auto-imports.d.ts'
      }),
      Components({
        resolvers: [NaiveUiResolver()],
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
      // preprocessorOptions: {
      //   scss: {
      //     additionalData: `@use "@/styles/global.scss" as *;`
      //   }
      // }
      postcss: {
        plugins: [
          Pxtoviewport({
            unitToConvert: 'px',
            viewportWidth: 1920,
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            exclude: [], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vw', // 横屏时使用的单位
            landscapeWidth: 1024, // 横屏时使用的视口宽度
          }),
        ],
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        '/api': {
          // 需要代理的路径   例如 '/api'
          // target: `${VITE_BASE_URL}:${VITE_BASE_PORT}`, // 代理到 目标路径
          target: `${VITE_BASE_URL}`, // 代理到 目标路径
          changeOrigin: true,
          rewrite: (path) => path.replace('/api', '')
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              const arr = id.toString()?.split('node_modules/')[2]?.split('/')
              if (arr?.includes('vue')) return 'vue'
              else return 'module'
            } else return 'src'
          }
        }
      }
    }
  })
}
