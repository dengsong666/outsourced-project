<script lang='ts' setup>
import { disableYutang, enableYutang, setLike } from '@/apis'
import { useCommon } from '@/store'
import { navTo, showMsg, usePlayer } from '@/utils'

const props = defineProps<{
  list: Item[]
  recommend?: Item[]
  from?: string
  index?: boolean
  play?: boolean
  like?: boolean
  hot?: string
  more?: boolean
  check?: boolean
  enabled?: boolean
  border?: number | boolean
  fish?: boolean
  bigao?: boolean
  padding?: boolean
  limit?: number
}>()
const { player, onPlay } = usePlayer()
const common = useCommon()
const bigaoTag = { 填词: '#FC8525', 作曲: '#4B9EF7', 收歌: '#EF3516' }
const emit = defineEmits(['update'])
/**
 * 点赞
 * @param worksId 
 */
async function onLike(worksId: number) {
  const { success } = await setLike({ worksId })
  success && emit('update')
}
/**
 * 打开鱼塘
 * @param worksId 
 */
async function onOpenYutang(worksId: number) {
  const { success } = await enableYutang({ worksId })
  success && emit('update')
}
/**
 * 关闭鱼塘
 * @param worksId 
 */
async function onCloseYutang(worksId: number) {
  const { success } = await disableYutang({ worksId })
  success && emit('update')
}
/**
 * 跳转详情
 * @param item 
 */
function onDetails(item: Item) {
  const { serialNumber: idx, musicTypeId: type, id: worksId } = item
  common.slide = props.list
  console.log(common.slide)
  navTo(`/pages/common/details/${type == 4 ? 'bigao' : 'other'}/index`, { idx, type, worksId, from: props.from })
}
</script>

<script lang='ts'>
export default {
  options: {
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <tn-checkbox-group v-if="list?.length" v-model="common.checked">
    <div class="w100% text-16px">
      <div v-if="recommend?.length" class="flex-row items-center h44px">
        <text class=" text-center c-#EF3516 font-500 text-15px w32px">
          荐
        </text>
        <tn-notice-bar class="flex-1" :data="recommend.map(item => item.name)" direction="vertical" :speed="3000"
          :loop="false" @click="onDetails(recommend[$event] as any)"/>
      </div>
      <div v-for="(item, idx) in list" :key="`${idx}${item}`" @click="onDetails(item)"
        class="flex-row items-center py8px w100% bg-#fff" :class="{ 'px10px py8px rd-8px mb8px': padding }"
        :style="`border-bottom:${+(border || 0)}px solid #eee`">
        <div v-if="index" class="w32px center flex-col mr8px c-#666" :class="{ 'c-#EF3516 font-600': idx < 3 }">
          <text class="text-16px">
            {{ item.serialNumber }}
          </text>
          <text v-if="hot && idx < 3" class="text-12px">
            {{ hot }}
          </text>
        </div>
        <tn-checkbox v-if="check" :label="item.id" :disabled="Boolean(common.checked.length >= (limit ?? Infinity) && !common.checked.includes(item.id) && showMsg(`最多可选${limit}首`))" />
        <div :class="[bigao ? 'w-[calc(100%-100px)]' : 'w-[calc(100%-136px)]']">
          <div class="c-#262B2F font-500" v-html="`<div class='nowrap-e'>${item.name}</div>`"></div>
          <!-- <div class="c-#262B2F font-500 nowrap-e">{{ item.name }}</div> -->
          <div class="flex-row text-10px mt4px flex-wrap gap-6px">
            <text v-if="bigao && item.draftTypeTag" :style="`color:${bigaoTag[item.draftTypeTag]}`"
              class="center b-1px b-solid px4px py1px rd-2px font-500">
              {{ item.draftTypeTag }}
            </text>
            <text v-if="bigao" class="bigao-tag flex-row items-center b-1px b-solid rd-2px c-#FF539F overflow-hidden nowrap">
              <text class="iconfont icon-yugou m0! c-#fff text-10px w24px h24px" />
              <text class="px4px py1px">
                赏金
                <text class="c-default">
                  {{ item.rewardFishHookCount }}
                </text>/{{ item.joinDraftCount }}
              </text>
            </text>
            <text v-if="item?.isEvidence" class="center b-1px b-solid px4px py1px rd-2px c-#FFAA44 font-500">
              已存证
            </text>

            <text v-for="v in item.musicStyleTagList" :key="v"
              class="center b-1px b-solid px4px py1px rd-2px c-#146DB3 font-500">
              {{ v }}
            </text>
            <template v-if="!bigao">
              <text v-if="item.isTimeLimit" class="center b-1px font-500 b-solid px4px py1px rd-2px c-#29B11B">
                限时
              </text>
              <text v-if="item.isRecommend" class="center b-1px font-500 b-solid px4px py1px rd-2px c-#E71D25">
                自荐
              </text>
            </template>
          </div>
        </div>
        <div class="flex-row items-center ml-auto mr8px c-#989EB3">
          <text v-if="more" class="iconfont icon-arrow-more" />
          <text v-if="play" class="iconfont text-22px"
            :class="[!player.paused && player.music.id == item.id ? 'icon-play-stop c-default' : 'icon-play-line']"
            @click.stop="onPlay(item)" />
          <template v-if="like">
            <text class="iconfont text-22px ml12px" :class="[item.isLike ? 'icon-liked c-default' : 'icon-like']"
              @click.stop="onLike(item.id)" />
            <div class="flex-col items-center w22px text-12px">
              <text class="c-default">
                {{ item.likeCountInRecentDays }}
              </text>
              <text>{{ item.likeCount }}</text>
            </div>
          </template>
          <img v-if="bigao && item.isShowTodayDraftEnd" class="w48px h30px" src="@/static/icons/jiegao.png" alt="">
          <div v-if="fish" class="flex-row items-center c-#fff bg-default rd-8px px10px py5px text-14px" @click.stop="onCloseYutang(item.id)"><text class="iconfont icon-wangdou text-24px mr4px" />捞起</div>
          <template v-if="enabled">
            <text v-if="item.isReserved" class="bg-#DCE4FF c-default px4px py2px rd-4px">
              被预留
            </text>
            <tn-switch v-else v-model="item.isFishpond" :active-value="1" :inactive-value="0"
              @change.stop="item.isFishpond ? onOpenYutang(item.id) : onCloseYutang(item.id)" />
          </template>
        </div>
      </div>
    </div>
  </tn-checkbox-group>
</template>

<style scoped lang='scss'>
:deep(.tn-notice-bar) {
  padding: 5px 8px !important;

  .tn-column-notice-bar__swiper {
    height: 1.5em !important;
  }
}
</style>
