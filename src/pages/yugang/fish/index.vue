<script lang="ts" setup>
import { reactive } from 'vue';
import { getMyBiGaoList, getByHookList, getMyHookList, getMyStockingList, getFishTotal } from '@/apis';
import { usePage, navTo } from '@/utils';
import { useCommon } from '@/store';
const common = useCommon()
const fish = reactive({
  id: undefined,
  type: 0,
  title: '',
  tipCollapse: 1,
  currentTab: 0,
  isReport: false,
  bigaoTabs: [{ label: '投稿', value: 1 }, { label: '需求', value: 2 }],
  total: [] as any[],
  bigaoTotal: [] as any[],
  page: {} as any
})
onLoad(async (options) => {
  // 1我钓到的鱼 2被钓走的鱼 3我放养的鱼 4我的比稿
  const totalMap = [3, 2, 1, 4]
  fish.title = options?.title
  fish.type = +options?.type
  fish.page = usePage([getMyHookList, getByHookList, getMyStockingList, getMyBiGaoList][fish.type - 1], { musicTypeId: 2, type: 1 })
  fish.page.load()
  const { allTotal, musicTotal, demoTotal, lyricTotal, myDemandTotal, myContributeTotal } = await getFishTotal({ type: totalMap[fish.type - 1] as any })
  fish.total = [allTotal, lyricTotal, musicTotal, demoTotal]
  fish.bigaoTotal = [myContributeTotal, myDemandTotal]
})

</script>
<template>
  <Topbar :back-text="fish.title" bg="#fff" place back-color />
  <div v-if="fish.type != 4" class="flex-row items-center px16px py12px bg-#fff">
    <img class="w24px h24px mr6px" src="@/static/icons/all-word.png" alt="">
    {{ fish.title }} 共{{ fish.total[0] }}首
  </div>
  <!-- <Tips v-if="fish.type == 4" title="温馨提示：已经结束的比稿，无法获取对方联系方式。" /> -->
  <Tips v-if="fish.type == 3" title="温馨提示" :content="common.yutangText" />
  <Tips v-if="fish.type == 2" title="温馨提示"
    content="您放养在鱼塘的鱼被钓走后，请等待对方联系您沟通合作细节，通常的合作方式有分摊制作成本、版权转让等形式，请酌情商洽。被预留并不代表合作会继续推进，如对方未联系您，您可以主动联系对方，若被恶意预留，可以举报对方。" />
  <tn-tabs v-model="fish.currentTab" :scroll="false" active-color="#000" :bottom-shadow="false" height="100rpx"
    @change="fish.page.params.musicTypeId = common.tabs[$event]?.value, fish.page.params.type = fish.bigaoTabs[$event]?.value">
    <tn-tabs-item v-for="(item, idx) in (fish.type == 4 ? fish.bigaoTabs : common.tabs)" :key="idx" :title="item.label"
      :badge-config="{ value: (fish.type == 4 ? fish.bigaoTotal[idx] : fish.total[idx + 1]) || undefined }" />
    <template #bar>
      <text class="iconfont icon-tab-selected" />
    </template>
  </tn-tabs>
  <template v-if="fish.type == 3">
    <List :list="fish.page.result.list" class="px16px mt10px" fish padding @update="fish.page.load()" />
    <NoFound :more="fish.page.result.more" :nodata="fish.page.result.nodata" desc="暂无内容" />
  </template>
  <template v-else>
    <div v-for="(item, idx) in fish.page.result.list" :key="item.id"
      class="relative p10px rd-8px bg-#fff mx16px my10px">
      <p class="pb10px text-16px bdb-1-#F2F4F8" :class="{ 'mr56px': [1, 2, 4].includes(fish.type) }" @click="navTo(`/pages/common/details/${fish.type == 4 ? 'bigao' : 'other'}/index`, { idx, type: fish.type, worksId: item.id }), common.slide = fish.page.result">{{ item.draftTitle || item.name }}</p>
      <text class="absolute top-0 right-0 px8px py2px rd-rt-8px rd-lb-8px font-500"
        :class="{ 'bg-#46B33A/20 c-#46B33A': fish.type == 1, 'bg-default/20 c-default': fish.type == 2, 'bg-#FF539F/20 c-#FF539F': fish.type == 4 && item.draftEndStatus == 0 }">
        {{ { 1: '已预留', 2: '被预留', 4: `${item.draftEndStatus == 0 ? '比稿中' : ''}` }[fish.type] }}
      </text>
      <div class="flex-row justify-end mt8px items-center">
        <text v-if="fish.type == 4" class="mrauto">{{ item.name }}</text>
        <div v-if="fish.type == 2" class="px14px py5px bd-1-#E6E6E6 c-#676D84 rd-8px mr10px" @click="fish.isReport = true, fish.id = item.id">
          <text class="iconfont icon-report mr8px"></text>举报对方
        </div>
        <div v-if="fish.type != 4 || (item.draftEndStatus == 0 && fish.currentTab == 0)"
          class="px14px py5px bd-1-#E6E6E6 c-#fff bg-default rd-8px">
          <Author class="nowrap" :id="item.id" :type="([2, 1, , 3].at(fish.type - 1) as any)">
            <text class="iconfont icon-weixin mr8px"> </text>联系对方
          </Author>
        </div>
        <text v-else-if="fish.currentTab == 1" class="px14px py5px bd-1-#E6E6E6 c-#fff bg-default rd-8px nowrap" @click="navTo(`/pages/common/details/bigao/index`, { idx, type: fish.type, worksId: item.id })">
          查看详情
        </text>
        <text v-else class="px14px py5px bd-1-#E6E6E6 c-#989EB3 bg-#E4E4E7 rd-8px nowrap">已结束</text>
      </div>
    </div>
    <Report v-model="fish.isReport" :show-type="2" :type="3" :works-id="fish.id!" />
    <NoFound :more="fish.page.result.more" :nodata="fish.page.result.nodata" desc="暂无内容" />
  </template>
</template>


<style lang="scss" scoped>
:deep(.tn-badge__absolute) {
  transform: translate(100%, 0) !important;
  top: 50% !important;

  .tn-badge-content {
    border-radius: 8px !important;
    position: unset !important;
    background-color: #686d82 !important;
    font-size: 12px;
  }
}
</style>

<style>
page {
  padding: 0;
  background-color: #F4F4F4;
}
</style>