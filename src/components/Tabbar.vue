<script lang='ts' setup>
import { useCommon } from '@/store'
const common = useCommon()

// 导航栏数据
const tabbarList = [
  {
    name: '鱼塘',
    icon: 'https://file.fishyoumusic.top/source/fbc90238-f68e-4f11-9026-75859dedcd97.png',
    activeIcon: 'https://file.fishyoumusic.top/source/e243bd89-e028-41aa-aa53-8740b05739f7.png',
    url: '/pages/yutang/index',
  },
  {
    name: '鱼缸',
    icon: 'https://file.fishyoumusic.top/source/87389668-9bb6-48d9-ae8b-853cb6a743d8.png',
    activeIcon: 'https://file.fishyoumusic.top/source/16312f32-d8ad-4152-93a2-768fff343df5.png',
    url: '/pages/yugang/index',
  },
  {
    icon: 'https://file.fishyoumusic.top/source/8e2e5d63-445c-4197-8c65-e1b8f9f3c602.png',
    activeIcon: 'https://file.fishyoumusic.top/source/8e2e5d63-445c-4197-8c65-e1b8f9f3c602.png',
    url: '/pages/publish/index',
    size: '88',
  },
  {
    name: '鱼肆',
    icon: 'https://file.fishyoumusic.top/source/dfb89603-b4c1-4312-8987-ace037df91ea.png',
    activeIcon: 'https://file.fishyoumusic.top/source/672c0d91-d6b4-43cb-9d13-15d580f3f12b.png',
    url: '/pages/yusi/index',
  },
  {
    name: '我的',
    icon: 'https://file.fishyoumusic.top/source/8b6ed9d0-8cf5-4b1e-9230-7b21937efef3.png',
    activeIcon: 'https://file.fishyoumusic.top/source/b44fc4f5-62dc-427e-9e60-c02621852109.png',
    url: '/pages/my/index',
  },
]
const onSwitchTabbar = (url: string) => uni.switchTab({ url })
</script>

<script lang='ts'>
export default {
  options: {
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <tn-tabbar v-model="common.currentTabbar" fixed switch-animation :top-shadow="false" icon-size="48rpx">
    <tn-tabbar-item v-for="(item, index) in tabbarList" :key="index" :icon="item.icon" :active-icon="item.activeIcon"
      :icon-size="item.size" :text="item.name" @click="onSwitchTabbar(item.url)" />
  </tn-tabbar>
</template>

<style scoped lang='scss'>
:deep(.tn-tabbar){
  height: 50px !important;
  .tn-image{
    width: 24px;
    height: 24px;
  }
  .tn-tabbar-item__text{
    font-size: 12px;
  }
}

</style>
