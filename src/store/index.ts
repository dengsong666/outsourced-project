import { getUserBalanceTotal, getUserInfo } from '@/apis'
import { getStorage } from '@/utils'
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
    token: getStorage('token') as null | string,
    userinfo: null as null | UserInfo,
    showLogin: false,
    showProtocol: false,
    account: null as null | { balance: number, integral: number }
  }),
  getters: {
    headers: (state) => ({ Authorization: state.token || '' })
  },
  actions: {
    init() {
      getUserInfo().then(res => this.userinfo = res)
      getUserBalanceTotal().then(res => this.account = res)
    },
  }
})
