<script lang="ts" setup>
import { navTo, usePage } from '@/utils';
import icon1 from '@/static/wdddy-c.png'
import icon2 from '@/static/bdzdy-c.png'
import icon3 from '@/static/wfydy-c.png'
import icon4 from '@/static/wdbg-c.png'
import { addSet, delSet, getYugangAll, getYugangSetList } from '@/apis';
import { useCommon } from '@/store';
const common = useCommon()
const yugang = reactive({
  showDel: false,
  currentTab: 0,
  all: [] as any[]
})
const fish = [
  { title: '我钓到的鱼', icon: icon1 },
  { title: '被钓走的鱼', icon: icon2 },
  { title: '我放养的鱼', icon: icon3 },
  { title: '我的比稿', icon: icon4 },
]
const { load, params, result } = usePage(getYugangSetList, { musicTypeId: 2 })
const getAllList = async () => {
  const { dataList } = await getYugangAll({ musicTypeId: params.value.musicTypeId as any, pageNum: 1, pageSize: 100 })
  yugang.all = dataList
}
onShow(async () => {
  common.currentTabbar = 1
  getAllList()
  load(true)
})
/**
 * 新增集合
 */
async function onAddSet() {
  const { success } = await addSet({ musicTypeId: params.value.musicTypeId as any })
  success && load(true)
}
/**
 * 删除集合
 */
async function onDelSet(gatherId: number) {
  const { success } = await delSet({ gatherId })
  success && load(true)
}
watch(() => result.list, val => common.sets = val, { deep: true })
</script>

<template>
  <Topbar back-text="鱼缸" bg="#fff" place back-color msg />
  <div class="flex-row justify-between px16px py12px rd-16px bg-#fff my10px">
    <div class="center flex-col" v-for="(item, idx) in fish" :key="item.title"
      @click="navTo('/pages/yugang/fish/index', { type: idx + 1, title: item.title })">
      <img class="h56px w56px" :src="item.icon" alt="">
      <text class="text-12px nowrap">{{ item.title }}</text>
    </div>
  </div>
  <tn-tabs v-model="yugang.currentTab" :scroll="false" active-color="#000" height="100rpx" :bottom-shadow="false"
    @change="params.musicTypeId = common.tabs[$event].value, getAllList()">
    <tn-tabs-item v-for="item in common.tabs" :key="item.value" :title="`我的${item.label}集`" />
    <template #bar>
      <text class="iconfont icon-tab-selected" />
    </template>
  </tn-tabs>
  <!--  -->
  <div class="grid grid-cols-3 gap-10px my10px">
    <div v-for="item in yugang.all.slice(0, 1)" :key="item.id" class="h108px center rd-8px bg-#fff"
      @click="navTo('/pages/yugang/wordSet/index', { id: item.id, name: item.name, type: params.musicTypeId, all: 1 })">
      {{ item.name }}
    </div>
    <div class="h108px center flex-col rd-8px bg-#fff" @click="onAddSet">
      <div class="center flex-col">
        <text class="iconfont icon-add c-default text-32px"></text>
        <text class="mt4px">创建新{{ common.tabs[yugang.currentTab].label }}集</text>
      </div>
    </div>
    <div v-for="item in common.sets" :key="item.id" class="relative" @longpress="yugang.showDel = !yugang.showDel"
      @click="navTo('/pages/yugang/wordSet/index', { id: item.id, name: item.name, type: params.musicTypeId, all: 0 })">
      <div class="relative flex-col h108px bg-#fff p6px rd-8px overflow-hidden shadow-0-2-4-0-#8095FF80">
        <h4 class="text-12px lh-20px c-#676D84 font-500 mxauto nowrap-e" :title="item.name">{{ item.name }}</h4>
        <text class="text-11px lh-18px c-#989EB3 nowrap-e" v-for="item1 in item.tankGatherDataList" :key="item1.serialNumber">
          {{ item1.serialNumber }} {{ item1.worksName }}
        </text>
        <text class="absolute bottom-0 left-0 right-0 bg-default c-#fff py2px text-12px text-center">共{{ item.worksCount }}首</text>
      </div>
      <text :style="`display:${yugang.showDel ? 'block' : 'none'}`"
        class="absolute right-0 top-0 translate-y--50% translate-x-50% iconfont icon-close c-#989eb3 m0!"
        @click.stop="onDelSet(item.id)"></text>
    </div>
  </div>
  <NoFound :more="result.more" />
  <Tabbar />
</template>

<style lang="scss" scoped></style>

<style lang="scss">
page {
  background-color: #F4F4F4;
}
</style>
