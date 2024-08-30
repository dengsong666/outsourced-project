import { getUserBalanceTotal, getUserInfo } from '@/apis'
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
    account: null as null | { balance: number, integral: number }
  }),
  getters: {
    headers: (state) => ({ Authorization: state.token })
  },
  actions: {
    getUserInfo() {
      getUserInfo().then(res => this.userinfo = res)
      getUserBalanceTotal().then(res => this.account = res)
    },
    logout() {
      sessionStorage.removeItem('token')
      localStorage.removeItem('token')
      this.token = ''
      this.userinfo = null
    }
  }
})
