<script lang='ts' setup>
import { inform, storage, usePlayer } from '@/utils'
import playIcon from '@/static/icons/play.png'
import playStopIcon from '@/static/icons/play-stop.png'
import { cancelCooperation, setLike, setRecommend } from '@/apis'
import { useCommon } from '@/store'

defineProps<{
  details: YuTangItem,
  type: number // 1-demo-选歌；2-歌词-选词；3-曲-填词
}>()
const common = useCommon()
const { player, onPlay } = usePlayer()
const emit = defineEmits(['update'])
const other = reactive({
  more: false,
  slide: false,
  isReport: false
})
onMounted(() => {
  const isFirst = storage.get('browser-details')
  other.slide = isFirst ?? true
})
async function onRecommend(worksId: number) {
  const { success } = await setRecommend({ worksId })
}
async function onCancelCooperation(worksId: number, isAuthor: number) {
  const { success } = await cancelCooperation({ worksId })
  isAuthor ? inform('放弃合作-作者') : inform('放弃合作-预留者')
  success && uni.navigateBack()
}
async function onEdit(id: number) {
  storage.set('edit-id', id)
  uni.switchTab({ url: '/pages/publish/index' })
}
/**
 * 点赞
 * @param worksId 
 */
async function onLike(worksId: number) {
  const { success } = await setLike({ worksId })
  success && emit('update')
}
</script>

<script lang='ts'>
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<template>
  <div class="mt16px mx16px">
    <div v-if="details?.isHook" class="flex-row gap-16px">
      <Modal @confirm="onCancelCooperation(details?.id, details.isAuthor)">
        <button class="flex-3 btn btn-#989EB3 c-#fff">放弃合作
          <text class="iconfont icon-report text-24px ml24px pl24px bdl-1-#A4ABBE"></text>
        </button>
        <template #content>
          您将放弃与对方的合作，确定吗？
        </template>
      </Modal>
      <button class="flex-2 btn bg-default/6 shadow-none c-default">
        <text class="iconfont icon-zhonggou text-24px"></text>已中钩
      </button>
    </div>
    <div v-else-if="details?.isAuthor" class="grid-1-2-16 c-#fff">
      <text class="bg-default py16px rd-16px shadow-0--1-4-0-#8095FF text-center"
        @click="onEdit(details?.id)">编辑修改</text>
      <Modal @confirm="onRecommend(details?.id)" cancel>
        <button class="btn m0 h100%" v-if="details.isRecommend" disabled>推荐中</button>
        <div v-else class="bg-#FF539F py16px rd-16px shadow-0--1-4-0-#FF539F text-center">自荐</div>
        <template #content>
          您将花费<text class="c-default">{{ common.config.recommendCostFishHookNum }}</text>鱼钩，推荐自己的作品到鱼塘榜单置顶位滚动展示{{ common.config.recommendCycle }}小时，审核通过后，立即生效。
        </template>
      </Modal>
    </div>
    <template v-else>
      <div class="grid-1-3-8 mtauto items-center bg-default rd-16px px20px py8px c-#fff">
        <Author :id="details?.id" :type="6" tips @update="emit('update')">
          <text class="text-16px nowrap">预留并联系ta</text>
        </Author>
        <div class="center">
          <img v-if="type != 2" @click="onPlay(details as any)" class="relative bottom-12px w40px h40px scale-200"
            :src="player.paused ? playIcon : playStopIcon" alt="">
        </div>
        <div class="flex-row justify-around">
          <div class="flex-col items-center">
            <text class="iconfont" :class="[details.isLike ? 'icon-liked c-#fff' : 'icon-like']" @click="onLike(details.id)"></text>
            <text class="text-12px">{{ details.likeCount }}</text>
          </div>
          <div class="flex-col items-center" @click="other.more = true">
            <text class="iconfont icon-more-dot"></text>
            <text class="text-12px">更多</text>
          </div>
        </div>
      </div>
      <tn-popup v-model="other.more" open-direction="bottom">
        <h4 class="mt16px mb30px">{{ details.name }}</h4>
        <div class="flex-row">
          <div class="flex-col items-center" @click="other.isReport = true">
            <text class="iconfont icon-report text-24px bg-#f5f7fe c-#676d84 center w60px h60px rd-50%"></text>
            <text class="text-12px">举报</text>
          </div>
          <div class="flex-col ml40px items-center">
            <text class="iconfont icon-share text-18px bg-#f5f7fe c-#676d84 center w60px h60px rd-50%"></text>
            <text class="text-12px">分享</text>
          </div>
        </div>
      </tn-popup>
      <Report v-model="other.isReport" :type="1" :works-id="details.id" />
    </template>
  </div>
  <tn-popup v-model="other.slide">
    <div class="flex-col">
      <img class="w240px h216px" src="https://file.fishyoumusic.top/source/2d697c69-a746-4ebf-9a92-717f92d46cb2.png"
        alt="">
      <text class="text-16px font-500">支持【左右滑动】查看作品详情</text>
    </div>
    <button class="btn w128px" @click="other.slide = false, storage.set('browser-details', false)">知道了</button>
  </tn-popup>
</template>

<style scoped lang='scss'></style>