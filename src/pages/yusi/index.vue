<script lang="ts" setup>
import { useCommon } from "@/store";
import { showMsg } from "@/utils";
const common = useCommon()
const list = ref([
  { icon: 'https://file.fishyoumusic.top/source/9ed40930-b78a-4052-a71e-34a3dd7103f3.png', router: "/pages/yusi/czjl/index" },
  { icon: 'https://file.fishyoumusic.top/source/5e8d7d9e-34e0-4730-a940-e85bbec56b37.png' },
  { icon: 'https://file.fishyoumusic.top/source/c2789d1b-710d-4e57-a299-e5a995f389ef.png' },
  { icon: 'https://file.fishyoumusic.top/source/5cfe8cf3-fa77-4d54-84a8-405857c6d9d6.png' },
  { icon: 'https://file.fishyoumusic.top/source/4db6596f-6267-42b2-b4bf-76d30d83e3c9.png', router: "/pages/yusi/protocalAssistant/index" },
  { icon: 'https://file.fishyoumusic.top/source/a146f4a5-6964-49bd-8f80-59cf1a160b2d.png' },
]);
const handleClick = (item: any) => {
  if (item.router) {
    uni.navigateTo({ url: item.router });
  } else showMsg('即将上线，敬请期待！')
};
onShow(() => {
  common.currentTabbar = 3
})
</script>
<template>
  <Topbar back-text="鱼肆" bg="#fff" place back-color msg />
  <div class="w-full">
    <!-- 顶部 -->
    <div class="text-16px w-full flex justify-between my24px">
      <text>增值服务</text>
      <text class="mlauto">
        我的订单
        <text class="iconfont icon-arrow-more"></text>
      </text>
    </div>
    <!-- 表格 -->
    <div class="grid-3-2-16">
      <div class="p8px" v-for="item in list">
        <img :src="item.icon" class="w-100% h-120px" @click="handleClick(item)" />
      </div>
    </div>
  </div>
  <Tabbar />
</template>

<style lang="scss" scoped></style>
<style lang="scss">
page {
  padding-left: 16px;
  padding-right: 16px;
}
</style>
