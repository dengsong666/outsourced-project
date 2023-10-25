<script lang='ts' setup>
import { date } from '@/utils'
defineProps<{
  time: string
}>()
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
  <div v-for="v in 10" :key="v" class="absolute text-center text-0 rotate--30 z-0"
    :style="`top:${40 * (v - 1)}px;left:${100 * (v % 4 - 1)}px`">
    <img class="w100px h40px" src="https://file.fishyoumusic.top/source/1c6f627f-670b-4b10-86f8-734a3e66ef71.png" alt="">
    <p class="c-#F2D0D587 text-10px op70">
      上传时间：{{ date(time) }}
    </p>
  </div>
</template>

<style scoped lang='scss'></style>