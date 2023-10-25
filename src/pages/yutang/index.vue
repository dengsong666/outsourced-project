<script lang="ts" setup>
import { getBannerList, getBiGaoList, getRecommendList, getStyleList, getYutangList } from '@/apis'
import { useCommon } from '@/store'
import { px2vw, usePage, useShare, navTo } from '@/utils'
const common = useCommon()
const { onShareAppMessage, onShareTimeline } = useShare('/pages/yutang/index', '我分享给你鱼塘里的最新作品榜单，快来选歌吧！')
const { bottom, top, left } = common.menuButtonPos
const yutang = reactive({
  currentTab: 0,
  recommend: []
})
const banner = reactive({
  url: '',
  top_limit: 180 - bottom - 4, // 粘性布局的滚动上限
  searchTop: px2vw(180 - 42),
  searchRight: px2vw(16),
  is_scroll_limit: false, // 滚动上限
})
const styles = reactive({
  height: px2vw(180), // 背景高度
  background: computed(() => banner.is_scroll_limit ? 'var(--tn-color-primary)' : `url(${banner.url}) center/contain`),
})
const filter = reactive({
  top: 0,
  rotate: false,
  styles: [],
})
const options = reactive({
  radio: {
    title: '时间',
    value: 0,
    options: [{ label: '近7日最热', value: 0 }, { label: '最新', value: 1 }],
  },
  checkbox: {
    title: '',
    options: computed(() => filter.rotate ? filter.styles : filter.styles.slice(0, 16)),
  },
  select: {
    title: '选择类型',
    options: [{ label: '收歌需求', value: 1 }, { label: '填词比稿', value: 3 }, { label: '作曲比稿', value: 2 }],
  },
})

const { load, result, params } = usePage(getYutangList, { musicTypeId: 1 as any, timeTypeId: 0 as any, musicStyleIdList: [] })
const pageBigao = usePage(getBiGaoList, { musicTypeId: undefined })

async function getStyles(pageSize: number) {
  const { dataList } = await getStyleList({ pageNum: 1, pageSize })
  filter.styles = dataList.map((item: any) => ({ label: item.name, value: item.id }))
}
async function getRecommends() {
  if (yutang.currentTab == 3) return yutang.recommend = []
  const { dataList } = await getRecommendList({ musicTypeId: params.value.musicTypeId, pageNum: 1, pageSize: 100 })
  yutang.recommend = dataList
}
onPageScroll((e) => {
  const scrollTop = e.scrollTop
  const searchTop = 180 - 42 - scrollTop
  filter.top = scrollTop > banner.top_limit ? banner.top_limit : scrollTop
  banner.searchTop = searchTop > top ? px2vw(searchTop) : `${top}px`
  banner.searchRight = searchTop > top ? px2vw(scrollTop + 16) : `${common.screenWidth - left + 48}px`
  banner.is_scroll_limit = scrollTop > banner.top_limit
})
onShow(async () => {
  uni.hideTabBar({ animation: false })
  common.currentTabbar = 0
  const { dataList } = await getBannerList()
  banner.url = dataList[0].imageUrl
  getStyles(100)
  getRecommends()
  load()
  console.log('onShow')
})
</script>

<template>
  <Topbar :back-text="banner.is_scroll_limit ? '鱼塘' : ' '" :place="banner.is_scroll_limit"
    :bg="banner.is_scroll_limit ? '#3A69F5' : 'transparent'" msg />
  <div class="relative pointer-events-none">
    <div class="w100%" :style="styles" />
  </div>
  <tn-input
    :custom-style="{ top: `${banner.searchTop}`, left: `${px2vw(banner.is_scroll_limit ? 64 : 16)}`, right: `${banner.searchRight}` }"
    height="32px" placeholder="搜索作品" @focus="navTo('/pages/common/search/index')">
    <template #prefix>
      <!-- <i class="iconfont icon-search text-16px ml10px" /> -->
      <div class="center ml8px">
        <img src="@/static/icons/search.svg" class="w16px h16px" alt="">
      </div>
    </template>
    <template #suffix>
      <text class="nowrap px14px py4px rd-14px" :class="{ 'bg-default': !banner.is_scroll_limit }"
        :style="`color: ${banner.is_scroll_limit ? 'var(--tn-color-primary)' : '#fff'};`">
        搜索
      </text>
    </template>
  </tn-input>
  <div class="bg-#fff flex-row items-center z2" :class="{ 'fixed w100%': banner.is_scroll_limit }" :style="`top:${bottom + 4}px;`">
    <tn-tabs v-model="yutang.currentTab" class="flex-basis-90%" :scroll="false" active-color="#000" height="100rpx"
      @change="idx => (idx == 3 ? pageBigao.load(true) : params.musicTypeId = idx + 1, getRecommends())">
      <tn-tabs-item v-for="(item, idx) in ['选歌', '选词', '填词', '比稿']" :key="idx" :title="item" />
      <template #bar>
        <text class="iconfont icon-tab-selected text-18px" />
      </template>
    </tn-tabs>
    <Select v-if="yutang.currentTab === 3" :select="options.select" :top="px2vw(220 - filter.top)"
      @confirm="pageBigao.params.value.musicTypeId = $event.select">
      <i class="iconfont icon-more text-18px c-#3a69f5" />
    </Select>
    <Select v-else :radio="options.radio" :checkbox="options.checkbox" :top="px2vw(220 - filter.top)"
      @confirm="params.musicTypeId = yutang.currentTab + 1, params.timeTypeId = $event.radio, params.musicStyleIdList = $event.checkbox"
      class="fenge-select">
      <i class="iconfont icon-more text-18px c-#3a69f5" />
      <template #checkboxTitle>
        <div class="w100%">
          风格
          <text class="iconfont icon-arrow float-right text-10px" :class="[filter.rotate ? 'rotate-180' : 'rotate-0']"
            @click="filter.rotate = !filter.rotate" />
        </div>
      </template>
    </Select>
  </div>
  <List v-if="yutang.currentTab === 3" class="bg-#fff px16px" from="鱼塘" :list="pageBigao.result.list" :recommend="yutang.recommend" index bigao @update="pageBigao.load(true)" />
  <List v-else-if="[1, 2].includes(yutang.currentTab)" class="bg-#fff px16px" from="鱼塘" :list="result.list" :recommend="yutang.recommend" :hot="params.timeTypeId ? 'New!' : 'Hot!'" index like
    @update="load(true)" />
  <List v-else class="bg-#fff px16px" from="鱼塘" :list="result.list" :recommend="yutang.recommend" :hot="params.timeTypeId ? 'New!' : 'Hot!'" index play like @update="load(true)" />
  <NoFound v-if="yutang.currentTab === 3" :more="pageBigao.result.more" :bottom="50" :nodata="pageBigao.result.nodata" desc="暂无内容" />
  <NoFound v-else :more="result.more" :bottom="50" :nodata="result.nodata" desc="暂无内容" />
  <Player mode="list" />
  <Tabbar />
</template>

<style lang="scss" scoped>
:deep(.tn-input) {
  position: fixed !important;
  z-index: 100;
  background-color: #fff;
  width: unset !important;
  border-radius: 16px !important;
  padding: 2px !important;
  font-size: 14px;
}

:deep(.fenge-select .select-checkbox-group .tn-checkbox-group) {
  padding: 1px;
}
</style>

<style>
page {
  padding: 0;
}
</style>
