<script lang='ts' setup>
import { useCommon } from '@/store'
import { px2vw } from '@/utils'
const props = defineProps<{
  more: boolean
  bottom?: number
  nodata?: boolean
  desc?: string
}>()
const { bottomH } = useCommon()
const emit = defineEmits(['refresh'])
const bh = computed(() => `calc(${bottomH} + ${px2vw( + (props.bottom ?? 0) + 66)})`)

</script>
<script lang='ts'>
export default {
  options: {
    styleIsolation: 'shared',
    virtualHost: true,
  }
}
</script>
<template>
  <div v-if="nodata && desc" class="center flex-col w100% h100% bg-#fff">
    <img class="w170px h140px" src="https://file.fishyoumusic.top/source/9b966db9-2499-4f53-b6a0-9e5c98b3ccb6.png" alt="">
    <text class="text-16px c-#989EB3 mt30px">{{ desc }}</text>
  </div>
  
  <div v-else @click="emit('refresh')" :style="`padding-bottom:${bh};top:calc(100vh - ${bh})`" class="sticky c-#999 text-center text-12px">
    {{ more ? '~ 加载更多 ~' : '~ 没有更多了~' }}
  </div>
  <!-- <tn-loadmore v-else-if="more !== undefined" class="mxauto" color="#999" :text="{ nomore: '~ 没有更多了 ~' }"
    :status="more ? 'loadmore' : 'nomore'" /> -->
</template>

<style scoped lang='scss'>
:deep(.tn-loadmore) {
  padding-bottom: v-bind(bh);

  .tn-loadmore__content {

    &::after,
    &::before {
      display: none;
    }
  }
}
</style>