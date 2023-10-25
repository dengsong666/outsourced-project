<script lang='ts' setup>
import { date } from '@/utils';
defineProps<{
  details: Item,
  type: number // 1-demo-选歌；2-歌词-选词；3-曲-填词 4比稿
}>()
const bigaoTag = { 填词: '#FC8525', 作曲: '#4B9EF7', 收歌: '#EF3516' }
</script>

<template>
  <div class="relative p16px rd-16px overflow-hidden h100%" :class="[type==4 ? 'bg-#fff' : 'bg-#fff/60']">
    <img v-if="type == 3" class="absolute w92px h68px right-0 top-0"
      src="https://file.fishyoumusic.top/source/129051cf-dd5f-447f-b42d-9c78ca1d9d5b.png" alt="">
    <div class="flex-row items-center">
      <img class="w72px h72px flex-shrink-0" src="@/static/icons/player.png" alt="">
      <div class="flex-col ml10px">
        <h3 class="text-18px">{{ details.name }}</h3>
        <div class="flex-row my6px text-10px gap-6px">
          <text v-if="details?.isEvidence"
            class="cunzheng flex-row items-center b-2px b-solid rd-2px c-#ffaa44 overflow-hidden nowrap h14px">
            <text class="iconfont icon-yugou m0! c-#fff text-10px"></text>
            <text class="px4px py1px">已存证</text>
          </text>
          <template v-if="type == 4">
            <text v-if="details.draftTypeTag" :style="`color:${bigaoTag[details.draftTypeTag]}`"
              class="center b-1px b-solid px4px py1px rd-2px font-500">
              {{ details.draftTypeTag }}
            </text>
            <text class="bigao-tag flex-row items-center b-1px b-solid rd-2px c-#FF539F overflow-hidden nowrap">
              <text class="iconfont icon-yugou m0! c-#fff text-10px w24px h24px" />
              <text class="px4px py1px">
                赏金
                <text class="c-default">
                  {{ details.rewardFishHookCount }}
                </text>/{{ details.contributeCount }}
              </text>
            </text>
          </template>
          <text v-for="v in details.musicStyleTagList" :key="v" class="center b-1px b-solid px4px py1px rd-2px c-#146DB3">
            {{ v }}
          </text>
        </div>
        <text class="text-12px c-#989EB3">{{ type == 4 ? '比稿发起' : '创建' }}时间：{{ type==4 ? date(details.draftStartTime) :  date(details?.createTime) }}</text>
        <text class="text-12px c-#989EB3 my2px">{{ type == 4 ? '比稿自动结束' : '最近更新' }}时间：{{ type==4 ? date(details.draftEndTime) : date(details?.updateTime) }}</text>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped lang='scss'>
.cunzheng {
  background: linear-gradient(to right, #ffaa44 14px, #fff 14px);
}
</style>