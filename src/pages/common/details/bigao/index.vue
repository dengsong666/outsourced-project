<script lang="ts" setup>
import Card from '../components/Card.vue'
import Watermark from '../components/Watermark.vue'
import ButtonOpt from './ButtonOpt.vue'
import { useCommon } from '@/store'
import { addBiGao, getBiGaoExtraDetails, getBiGaoMsg, getMyBiGaoDetails, getMyBiGaoExtraDetails, markBiGao, setReaded } from '@/apis'
import { inform, px2vw, showMsg, usePage, usePlayer, useShare } from '@/utils'

const common = useCommon()
const { player, onPlay } = usePlayer()
const details = reactive({
  type: 0, // 1-收歌；2-作曲；3-填词；
  typeLabel: [, '收歌需求', '作曲比稿', '填词比稿'],
  value: {} as Item,
  extra: {} as ExtraDetails,
  myextra: {} as ExtraMyDetails[],
  collect: false,
  tabs: { '全部': undefined, '未读': undefined, '标记': undefined },
  currentTab: 0,
  currentSwiperIdx: 0,
  currentCollapse: -1,
  isReport: false,
  read: new Set()
})
const input = reactive({
  isEdit: false,
  // value: details.value.content,
  contributeDemoId: '',
  contributeLyric: details.value.content,
  contributeMusicId: ''
})
const { load, params, page } = usePage(getMyBiGaoExtraDetails, { typeId: 1 as 1 | 2 | 3})
const { topbarH } = useCommon()
const { share, onShareAppMessage, onShareTimeline } = useShare('/pages/common/details/bigao/index')
const content = computed(() => details.value.isAuthor ? details.myextra : details.extra.contributeDetailsDataList)
const showDetails = computed(() => details.type == 3 || (details.type == 2 && content.value?.length) || details.currentTab || details.type == 1)
/**
 * 加载作品
 * @param worksId 
 */
const loadDetails = async (worksId: number) => {
  details.value = await getMyBiGaoDetails({ worksId })
  player.music = details.value
  details.type = details.value?.draftType as any
  share.title = `${details.typeLabel[details.type]}赏金${details.value.rewardFishHookCount}：${details.value.name}，快来参加吧！`
  share.params = { type: details.type, worksId: details.value.id }
  if (details.value.isAuthor) {
    params.value.worksId = worksId
    const { list } = await load(true)
    details.myextra = list
    const { allTotal, markTotal, unreadTotal } = await getBiGaoMsg({ worksId })
    details.tabs.全部 = allTotal
    details.tabs.标记 = markTotal
    details.tabs.未读 = unreadTotal
    list[0]?.id && onSetReaded(list[0].id)
  } else {
    details.extra = await getBiGaoExtraDetails({ worksId })
    details.type != 3 && (player.music = details.extra.contributeDetailsDataList?.[0])
  }
}
const style = reactive({
  card: {} as any,
})
watchEffect(() => {
  // 1-收歌；2-作曲；3-填词；
  switch (details.type) {
    case 1:
      return style.card = details.currentCollapse < 0 && `height:calc(100% - ${px2vw(96)})`
    case 2:
      return style.card = showDetails.value ? `height:calc(100% - ${details.value.isAuthor ? px2vw(272) : px2vw(212)})` : `height:calc(100% - ${px2vw(96)})`
  }

  console.log(style.card)
})
onLoad(async (options: any) => {
  const { worksId } = options
  loadDetails(worksId)
})
/**
 * 标记
 * @param worksId 
 */
async function onMark(worksId: number) {
  console.log(worksId)
  const { success } = await markBiGao({ worksId })
  success && loadDetails(details.value.id)
}
/**
 * 提交作品
 * @param worksId 
 */
async function onInputSubmit(worksId: number, data = { contributeMusicId: undefined, contributeDemoId: undefined }) {
  const { contributeDemoId, contributeMusicId } = data
  const { id } = await addBiGao({ worksId, contributeLyric: input.contributeLyric, contributeMusicId, contributeDemoId })
  inform('参加比稿')
  id && loadDetails(worksId)
}
/**
 * 设置已读
 */
async function onSetReaded(worksId: number) {
  if (worksId && !details.read.has(worksId)) {
    const { success } = await setReaded({ worksId })
    success && details.read.add(worksId)
  }
}
watch(() => details.currentSwiperIdx, async val => {
  details.type != 3 && onPlay(details.myextra[val])
  onSetReaded(details.myextra[val]?.id)
  if (val + 2 == page.len) {
    const { list } = await load()
    details.myextra = list
  }
})
</script>

<template>
  <Topbar back-text="详情" bg="transptant" msg />
  <div :style="{ 'padding-top': px2vw(topbarH) }" class="bg flex-col pb32px h100%">
    <Card v-show="!input.isEdit" class="m16px mb0" :class="[]" :style="style.card" :details="details.value" :type="4">
      <Player v-show="details.type == 3" color="#e71d25" mode="single" />
      <div class="center mx--16px mb--16px mt16px text-12px py8px"
        :style="`background:${details.type == 3 ? 'linear-gradient(to bottom, #fef3d3, #fec4a0)' : '#F7DF4236'}`">
        <p v-if="details.value.isDraftEnd"> 共收到投稿<text class="c-default">{{ details.value.contributeCount }}</text>，
          人均发放赏金<text class="c-#FF539F">{{ details.value.rewardFishHookCount }}</text>/
          <text class="c-default">{{ details.value.contributeCount }}</text></p>
        <p v-else>
          已投稿<text class="c-#E71D25">{{ details.value.contributeCount }}</text>，
          预期赏金≤<text class="c-default">{{ details.value.rewardFishHookCount }}</text>/
          <text class="c-#FF539F">{{ details.value.contributeCount }}</text>，发起者可提前结束
        </p>
      </div>
      <template v-if="details.type == 2">
        <h3 class="mb16px mt32px">歌词</h3>
        <div class="h-[calc(100%-196px)] pre-wrap overflow-y-scroll">
          {{ details.value.content }}
        </div>
      </template>
      <tn-collapse v-else-if="details.type == 1" :show-arrow="Boolean(details.myextra.length || details.extra.isSubmit)" v-model="details.currentCollapse">
        <tn-collapse-item title="收歌需求" :key="1" :disabled="!Boolean(details.myextra.length || details.extra.isSubmit)">
          {{ details.value.content }}
        </tn-collapse-item>
      </tn-collapse>
    </Card>
    <template v-if="details.type == 1 ? !details.currentCollapse : true">
      <tn-tabs class="mx16px" v-if="details.myextra?.length || details.currentTab" v-model="details.currentTab" :scroll="false" :before-switch="(idx) => Boolean(Object.entries(details.tabs)[idx][1] ? true : showMsg(['无消息可读', '无标记可看'][idx - 1], false))"
      :bottom-shadow="false" :bar="false" height="60rpx" @change="params.typeId = $event + 1 as any, details.currentSwiperIdx = 0, loadDetails(details.value.id)">
      <tn-tabs-item v-for="(value, k) in details.tabs" :key="k" :title="k" :badge-config="{ value }" />
      </tn-tabs>
      <!-- 有额外详情用额外（包括本人和投稿者）详情，没有就用发起者 -->
      <tn-swiper v-if="showDetails" v-model="details.currentSwiperIdx" :data="content?.length ? content : (details.currentTab ? [] : [{ lyric: details.value.content }])"
        width="100%" :height="details.type == 2 ? (details.value.isAuthor ? '300rpx' : '230rpx') : '100%'" :previous-margin="details.type == 3 ? '32rpx' : '0'" :next-margin="details.type == 3 ? '32rpx' : '0'">
        <template #default="{ data, active }">
          <div class="flex-row items-center h100%">
            <div class="relative p16px rd-16px mt16px overflow-hidden w100%"
              :class="[active ? 'h-[calc(100%-16px)] bg-#fff' : 'h-[calc(100%-64px)] bg-#fabbbb', { 'mx10px': active && details.myextra?.length > 1 }, { 'mx16px': details.type != 3 }]">
              <Watermark v-if="!input.isEdit && (details.extra.isSubmit || details.myextra.length)"
                :time="details.value?.createTime" />
              <img v-if="details.value?.isEvidence" class="absolute w128px h120px right-0 top-0"
                src="https://file.fishyoumusic.top/source/129051cf-dd5f-447f-b42d-9c78ca1d9d5b.png" alt="">
              <h3 v-if="data.name" class="mb8px mt--16px ml--16px px16px py4px bg-#FDF8D8 rd-br-16px w-fit">
                <template v-if="details.value.isAuthor">{{ data.contributeIndex }}/<text class="c-#FF539F">{{ data.contributeCount }}</text></template>
                {{ data.name }}
              </h3>
              <h3 v-if="details.type == 3 && !details.extra.isSubmit && !details.myextra.length" class="mb8px text-16px font-500">
                {{ details.type == 3 && !input.isEdit ? '词格' : '歌词' }}
              </h3>
              <!-- {{ details.type }} -->
              <template v-if="[1, 3].includes(details.type)">
                <tn-input v-if="input.isEdit" v-model="input.contributeLyric"
                :custom-style="{ height: 'calc(100% - 48px)' }" type="textarea" :disabled="!input.isEdit"
                placeholder="请输入歌词" auto-height />
                <div v-else-if="details.type == 1" class="pre-wrap overflow-y-scroll" :class="[details.value.isAuthor ? 'h-[calc(100%-104px)]' : 'h-[calc(100%-72px)]']" >{{ data.lyric }}</div>
                <div v-else-if="details.type == 3" class="pre-wrap overflow-y-scroll h100%" :class="{ 'h-[calc(100%-32px)]!': !input.isEdit }">{{ data.lyric }}</div>
              </template>
              <template v-if="[1, 2].includes(details.type) && data.musicUrl">
                <Player class="relative z1" :options="{ singlePlay: !details.value?.isAuthor }" color="#e71d25"
                  mode="single" />
                <div v-if="details.value?.isAuthor" class="grid-1-5-16 place-items-center relative z1">
                  <text :class="{ 'invisible': details.type == 1 }" class="iconfont icon-report c-#e71d25 bg-#f7e0dc rd-50% p8px" @click="details.isReport = true"></text>
                  <text class="iconfont icon-pre-arrow" @click="details.currentSwiperIdx > 0 ? details.currentSwiperIdx-- : showMsg('没有更多了')"/>
                  <text class="iconfont text-24px rd-50% c-#e71d25" :class="[player.paused ? 'icon-play' : 'icon-play-stop']" style="box-shadow:0 0 0 4px #e71d25,0 0 0 4px #e71d25 inset" @click="onPlay(details.myextra?.[details.currentSwiperIdx])" />
                  <text class="iconfont icon-next-arrow" @click="details.currentSwiperIdx < (details.myextra.length - 1) ? details.currentSwiperIdx++ : showMsg('没有更多了')"/>
                  <text :class="[{ 'invisible': details.type == 1 }, data.isMark ? 'icon-collected' : 'icon-collect']" class="iconfont c-#e71d25 bg-#f7e0dc rd-50% p8px" @click="onMark(data.id)" />
                </div>
              </template>
              <div v-if="details.myextra?.length && details.type != 2" class="flex-col absolute top-32px right-16px z-10">
                <text class="iconfont c-#e71d25 bg-#f7e0dc rd-50% p8px"
                  :class="[data.isMark ? 'icon-collected' : 'icon-collect']" @click="onMark(data.id)" />
                <text class="iconfont icon-report c-#e71d25 bg-#f7e0dc rd-50% p8px mt10px" @click="details.isReport = true"></text>
              </div>
            </div>
          </div>
        </template>
      </tn-swiper>
    </template>
    <Report v-model="details.isReport" :show-type="1" :type="2" :works-id="details.myextra[details.currentSwiperIdx]?.id" color="#e71d25" />
    <ButtonOpt :details="details.value" :extra-details="details.extra" :extra-my-details="details.myextra[details.currentSwiperIdx]" :type="details.type"
      @edit="input.isEdit = true" @submit="onInputSubmit(details.value.id, $event)" @update="loadDetails(details.value.id)"
      :is-edit="input.isEdit" />
  </div>
</template>

<style lang="scss" scoped>
.bg {
  background: url('https://file.fishyoumusic.top/source/786d9123-473e-41c3-a029-21d9567a0834.png'), linear-gradient(360deg, #FF868B 0%, #FF9799 29%, #FEA09F 54%, #FF817C 81%, #FF665C 90%, #EA3E33 100%);
  background-repeat: no-repeat, no-repeat;
  background-size: contain, contain;
  background-position: 0 0, 0 215px;
}

:deep(.tn-tabs) {
  margin-top: 16px;
  background-color: #390901 !important;
  border-radius: 24px;

  .tn-tabs-item {
    &--bold {
      background-color: #E71D25;
      border-radius: 24px;
    }

    .tn-tabs-item__content__value {
      font-size: 14px !important;
      color: #fff;

      .tn-badge__absolute {
        transform: translate(100%, 0) !important;
        top: 50% !important;

        .tn-badge-content {
          color: #FFC71E;
          position: unset !important;
          background-color: unset !important;
        }
      }
    }
  }
}

:deep(.tn-input--disabled) {
  background-color: transparent !important;

  .tn-input__textarea {
    user-select: none;
  }
}

:deep(.tn-collapse) {
  margin-top: 32px;
  // height: calc(100% - 208px);
  height: calc(100% - 160px);

  .tn-collapse-item {
    height: 100% !important;
    overflow-y: scroll !important;
    min-height: 1.2em;

    &.is-disabled {
      opacity: 1 !important;
      background-color: #fff !important;
    }

    &__title {
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index: 1;
      height: 1.2em !important;
      padding: 0 !important;
      margin-bottom: 18px;

      .arrow {
        transform: rotate(-90deg);
      }
    }

    &__content {
      height: min-content !important;
      opacity: 1 !important;
      padding: 0 !important;
    }

    &.is-active {
      .tn-collapse-item__title {
        justify-content: center !important;

        .content {
          width: unset !important;
        }
      }

      .tn-collapse-item__content {
        // display: block !important;
        // display: none !important;
        height: 0 !important;
      }
    }
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
