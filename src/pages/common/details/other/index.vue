<script lang="ts" setup>
import Card from '../components/Card.vue'
import Watermark from '../components/Watermark.vue'
import ButtonOpt from './ButtonOpt.vue'
import { useCommon } from '@/store'
import { showMsg, px2vw, useShare, usePlayer } from '@/utils'
import { getDetails } from '@/apis'
const details = reactive({
  type: 0, // 1-demo-选歌；2-歌词-选词；3-曲-填词 4比稿
  from: '',
  value: {} as Item,
  slide: { start: 0, currentIdx: 0 },
  collect: false,
  currentTab: 0,
})
const { share, onShareAppMessage, onShareTimeline } = useShare('/pages/common/details/other/index')
const common = useCommon()
const { player, onPlay } = usePlayer()
const { topbarH, userinfo, tabs } = common
/**
 * 加载作品
 * @param worksId 
 */
const loadDetails = async (worksId: number) => {
  details.value = await getDetails({ worksId })
  share.title = details.from == '鱼塘' ? `我分享给你鱼塘里的作品《${details.value.name}》，快来预留吧！` : `${userinfo.nickName}分享给你ta鱼缸里的${tabs.find(item => item.value == details.type)?.label}《${details.value.name}》，快来预留吧！`
  player.music = details.value as any
}
onLoad(async (options: any) => {
  const { worksId, type, idx, from } = options
  details.type = +type
  details.from = from
  share.params = { type, worksId }
  details.slide.currentIdx = +idx
  loadDetails(worksId)
})
/**
 * 滑动
 * @param e 
 */
function onSlide(e: any) {
  const distance = details.slide.start - e.changedTouches[0].clientX
  const idx = details.slide.currentIdx
  if (Math.abs(distance) < 50) return
  else {
    if (distance > 0 ? (++details.slide.currentIdx <= common.slide.length) : (--details.slide.currentIdx >= 1)) {
      const works = common.slide[details.slide.currentIdx - 1]
      details.type = works.musicTypeId
      loadDetails(works.id)
      onPlay(works)
    } else {
      details.slide.currentIdx = idx
      showMsg('没有更多作品了')
    }
  }
}
</script>

<template>
  <Topbar back-text="详情" bg="transptant" backColor msg />
  <div v-if="details.value?.isVisible" :style="{ 'padding-top': px2vw(topbarH) }" class="bg flex-col pb32px h100%"
    @touchstart="details.slide.start = $event.changedTouches[0].clientX" @touchend="onSlide">
    <Card class="m16px" :details="details.value" :type="details.type" />
    <div class="relative p16px rd-16px bg-#fff/60 mx16px flex-1 overflow-hidden">
      <img v-if="details.value?.isEvidence" class="absolute w128px h120px right-0 top-0"
        src="https://file.fishyoumusic.top/source/129051cf-dd5f-447f-b42d-9c78ca1d9d5b.png" alt="">
      <h3 class="mb16px">{{ details.type == 3 ? '词格' : '歌词' }}</h3>
      <div class="h-[calc(100%-40px)] overflow-y-scroll pre-wrap">
        {{ details.value?.content ?? '未输入词格' }}
      </div>
      <!-- 水印：歌词和demo非输入状态下有 -->
      <Watermark v-if="[1, 2].includes(details.type) && !details.value?.isAuthor" :time="details.value?.createTime" />
    </div>
    <Player class="mx16px" v-if="[1, 3].includes(details.type)" :options="{ singlePlay: !!details.value?.isAuthor }" color="#3a69f5"
      mode="single" />
    <ButtonOpt :details="details.value" :type="details.type" @update="loadDetails(details.value.id)" />
  </div>
  <div v-else-if="details.value?.isVisible === 0" class="center flex-col h100% bg-#fff">
    <img class="w200px h200px" src="https://file.fishyoumusic.top/source/6e031fd8-6e20-41a4-85e0-d321d1e38c9f.png" alt="">
    <text class="text-16px">
      该作品已经被别人预留啦！ 到鱼塘里看其他。
    </text>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background: radial-gradient(circle, #CEEBF9 0%, #EAEEFB 100%);
  background-position: '-50% 80%';
}



:deep(.tn-input--disabled) {
  background-color: transparent !important;

  .tn-input__textarea {
    user-select: none;
  }
}

.reason :deep(.tn-input) {
  background-color: #F4F4F4;
}
</style>

<style>
page {
  padding: 0;
}
</style>
