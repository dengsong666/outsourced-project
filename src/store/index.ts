import { createPinia, defineStore } from 'pinia'
import { App } from 'vue'
import mitt from 'mitt'
const store = createPinia()
export function setupStore(app: App<Element>) {
  app.use(store)
}
export const useCommon = defineStore('common', {
  state: () => ({
    bus: mitt()
  }),
  actions: {
    Func() {}
  }
})
export * from './table'
