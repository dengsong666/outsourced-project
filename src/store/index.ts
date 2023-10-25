import piniaPluginPersist from 'pinia-plugin-persist-uni'
import defaultAvatar from '@/static/avatar.png'
import { getUserInfo } from '@/apis'

const store = createPinia()
const { screenWidth, statusBarHeight, safeAreaInsets } = uni.getSystemInfoSync()
store.use(piniaPluginPersist)
export default store
export const useCommon = defineStore('common', {
  state: () => ({
    menuButtonPos: uni.getMenuButtonBoundingClientRect(), // 胶囊菜单水平中轴线距离顶部高度，iphone X机型
    ratio: screenWidth / 375, // 机型比例
    topbarH: (statusBarHeight ?? 0) + 40,
    bottomH: `${safeAreaInsets?.bottom ?? 0}px`,
    token: uni.getStorageSync('token'),
    slide: [] as any[],
    checked: [] as number[],
    sets: [] as any[],
    checkConfirm: false,
    userinfo: {} as UserInfo,
    config: {} as Config,
    audioCtx: null as unknown as UniApp.InnerAudioContext,
    currentTabbar: 0,
    tabs: [{ label: '词', value: 2 }, { label: '曲', value: 3 }, { label: 'demo', value: 1 }],
    unread: 0,
    screenWidth,
    defaultAvatar,
  }),
  getters: {
    yutangText: (state) => `每位用户在鱼塘中免费发布的词＋曲+ demo 总数 ≤ ${state.config.fishPondTotalCapacity}。每花费${state.config.limitFishSpeciesCostFishHookNum}鱼钩可放养1条超额限时鱼，可存活${state.config.limitFishSpeciesCostFishHookNum}天。`
  },
  actions: {
    async onGetUserInfo() {
      this.userinfo = await getUserInfo()
    }
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: ['userinfo'] }
    ]
  },
})
