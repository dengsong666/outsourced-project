import { getUserInfo } from '@/apis'
import { createPinia, defineStore } from 'pinia'
import { App } from 'vue'
const store = createPinia()
export function setupStore(app: App<Element>) {
  app.use(store)
}
export const useCommon = defineStore('common', {
  state: () => ({
  }),
  actions: {
    Func() { }
  }
})
export const useUser = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userinfo: null as null | UserInfo,
    showLogin: false,
  }),
  actions: {
    getUserInfo() {
      getUserInfo().then(res => this.userinfo = res)
    },
    logout() {
      sessionStorage.removeItem('token')
      localStorage.removeItem('token')
      this.token = ''
      this.userinfo = null
    }
  }
})
