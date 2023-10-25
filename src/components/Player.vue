<!-- eslint-disable no-console -->
<script lang='ts' setup>
import { getLatelyPlayList, removeLatelyPlay, setLike } from '@/apis'
import { useCommon } from '@/store'
import { navTo, px2vw, usePlayer } from '@/utils'

const props = withDefaults(defineProps<{
  mode: 'list' | 'single'
  color?: string
  options?: {
    singlePlay?: boolean
  }
}>(), {
  options: () => ({ singlePlay: true })
})
const common = useCommon()
const { player, onPlay, audioCtx } = usePlayer()
const sToHms = (s: number) => `${String(((s / 60) | 0)).padStart(2, '0')}:${String(((s % 60) | 0)).padStart(2, '0')}`
const progress = computed(() => `${+(player.currentTime / player.duration * 100).toFixed() || 0}%`)
const music = reactive({
  list: [] as any[],
  total: 0,
  showPlayList: false,
  playModeList: [
    { label: '随机播放', icon: 'icon-play-random' },
    { label: '列表循环', icon: 'icon-play-cyclic' },
    { label: '单曲播放', icon: 'icon-play-one' },
  ],
  playMode: 0,
})
const emit = defineEmits(['update'])
onMounted(() => {
  player.paused = true
  player.currentTime = 0
  player.duration = 0
  audioCtx.stop()
})
/**
 * 播放模式
 */
audioCtx.onEnded(() => {
  if (music.list.length) {
    audioCtx.seek(0)
    switch (music.playMode) {
      case 0:
        // 随机播放
        return onPlay(music.list[Math.floor(Math.random() * music.total)], true)
      case 1:
        // 列表循环
        return onPlay(music.list[+player.music.serialNumber % music.total])
      default:
        // 单曲循环
        return onPlay(player.music, true)
    }
  } else player.paused = true
})
/**
 * 获取最近播放列表
 */
async function getLatelyList() {
  const { dataList, totalCount } = await getLatelyPlayList()
  music.list = dataList
  music.total = totalCount
}
/**
 * 打开最近播放列表
 */
async function onOpenLatelyPlayList() {
  music.showPlayList = true
  getLatelyList()
}
/**
 * 删除最近播放音乐
 * @param worksId
 */
async function onDelLatelyMusic(worksId: number) {
  const { success } = await removeLatelyPlay({ worksId })
  getLatelyList()
}
/**
 * 点赞
 * @param worksId 
 */
async function onLike(worksId: number) {
  const { success } = await setLike({ worksId })
  success && getLatelyList()
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
  <div class="relative z-10">
    <template v-if="mode === 'list'">
      <div :style="`bottom:calc(${common.bottomH} + ${px2vw(50)})`"
        class="flex-row items-center fixed left-16px right-15px bg-#F5F7FE rd-24px">
        <div class="player text-0">
          <img class="flex-shrink-0 w48px h48px" src="@/static/icons/player.png"
          :style="`animation: ${player.paused || 'rotate-player'} 6s linear infinite;`">
        </div>
        <tn-notice-bar v-if="player.music?.name" class="flex-1" bg-color="transparent" :loop="!player.paused"
          :data="[`${player.music.name}`]" direction="horizontal" />
        <text v-else class="ml4px mr16px">
          暂无播放
        </text>
        <div class="mlauto">
          <text class="flex-shrink-0 iconfont text-20px" :class="[player.paused ? 'icon-play-line' : 'icon-play-stop-line']"
            @click="onPlay()" />
          <text class="flex-shrink-0 iconfont icon-play-list text-18px mx16px" @click="onOpenLatelyPlayList" />
        </div>
      </div>
      <tn-popup v-model="music.showPlayList" open-direction="bottom">
        <div class="pt12px h100%">
          <div class="overflow-y-scroll h100%">
            <h2 class="text-center text-18px font-500 pb20px border-b-1 border-b-#f4f4f4 border-b-solid">
              最近播放
            </h2>
            <template v-for="(item, idx) in music.playModeList" :key="idx">
              <div v-show="idx === music.playMode" class="flex-row items-center mt10px mb6px"
                @click="music.playMode = ++music.playMode % 3">
                <text :class="`ml16px iconfont ${item.icon}`" />
                <text class="mx6px">
                  {{ item.label }}
                </text>
                <text class="c-#989EB3">
                  {{ music.list.length }}
                </text>
              </div>
            </template>

            <div v-for="item in music.list" :key="item.id" class="flex-row py12px px16px"
              :class="{ 'bg-#f5f7fe c-default': player.music.id === item.id }"
              @click="navTo(`/pages/common/details/${item.musicTypeId == 4 ? 'bigao' : 'other'}/index`, { idx: item.serialNumber, type: item.musicTypeId, worksId: item.id }), common.slide = music.list">
              <text>{{ item.serialNumber }}</text>
              <text class="ml10px mr20px nowrap-e">
                {{ item.name }}
              </text>
              <text class="mlauto iconfont"
                :class="[!player.paused && player.music.id === item.id ? 'icon-play-stop c-default' : 'icon-play-line']"
                @click.stop="onPlay(item)" />
              <text class="ml16px iconfont" :class="[item.isLike ? 'icon-liked c-default' : 'icon-like']"
                @click.stop="onLike(item.id)" />
              <text class="ml16px iconfont icon-close-line" @click.stop="onDelLatelyMusic(item.id)" />
            </div>
          </div>
        </div>
      </tn-popup>
    </template>
    <template v-if="mode === 'single'">
      <div class="flex-row items-center">
        <text v-if="options?.singlePlay" class="box-border iconfont text-32px rd-50%"
          :class="[player.paused ? 'icon-play' : 'icon-play-stop']"
          :style="`box-shadow:0 0 8px 0 ${color},0 0 0 4px ${color} inset;color:${color}`" @click="onPlay()" />
        <div class="flex-1 ml12px">
          <tn-slider v-model="player.currentTime" class="ml6px" :min="0" :max="player.duration" :step="1"
            :active-color="color" inactive-color="#262B2F" @change="audioCtx.seek($event as any)" />
          <div class="flex-row justify-between text-12px font-500 ml--8px c-#262B2F">
            <text>{{ sToHms(player.currentTime) }}</text>
            <text>{{ sToHms(player.duration) }}</text>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang='scss'>
:deep(.tn-slider) {
  margin: 8px 0;
  height: 2px !important;

  .tn-slider__active {
    box-shadow: 0px 0px 4px 0px v-bind(color) !important;
  }

  .tn-slider__bar {
    width: 14px;
    height: 14px;
    background: radial-gradient(v-bind(color) 4px, #fff 4px);
  }
}

.player {
  padding: 1px;
  border-radius: 50%;
  background-image: conic-gradient(#3A69F5 v-bind(progress), #DCE1F0);
}
</style>
