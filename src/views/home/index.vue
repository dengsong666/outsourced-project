<script lang='ts' setup>
const refVideo = ref();
const refRawVideo = ref();
const isPaused = reactive({
  rawVideo: true,
  video: true,
})
console.log(isPaused)
// watch(refRawVideo, val => console.log(val.paused), { deep: true })
</script>

<template>
  <div flex-col>
    <n-carousel draggable md:h80vh h20vh>
      <div class="bg-#d2f2f2" box-border px300px py50px w-full h-full>
        <img w-full src="https://guiji.cn/_nuxt/img/row-1.514b86a.png" alt="">
      </div>
      <div class="bg-#d2f2f2" box-border px300px py50px w-full h-full>
        <img w-full src="https://guiji.cn/_nuxt/img/row-1.514b86a.png" alt="">
      </div>
    </n-carousel>
    <div grid-1-2-32 items-center rd-24px p100px md:mx300px mx100px my50px class="bg-#d0eff2">
      <div flex-col>
        <div text-48px font-600>翻译视频到多国语言</div>
        <div my16px text-24px>一键翻译20多种国家语言</div>
        <div mxauto mt48px text-white px24px py12px rd-24px class="gradient">
          免费试用
        </div>
      </div>
      <div flex gap36px class="right-128px bottom-16px">
        <div relative flex-col items-center @click="isPaused.rawVideo ? refRawVideo.play() : refRawVideo.pause()">
          <video ref="refRawVideo" w324px h576px rd-24px @playing="isPaused.rawVideo = false"
            @pause="isPaused.rawVideo = true">
            <source src="https://gy.cdn.guiji.cn/www/assets/video/translate-before.mp4">
          </video>
          <div v-show="isPaused?.rawVideo" class="rd-50%" p4px absolute-center bg-gray-200>
            <i w48px h48px i-custom-play></i>
          </div>
          <span mt8px>原视频</span>
        </div>
        <div relative flex-col items-center @click="isPaused.video ? refVideo.play() : refVideo.pause()">
          <video ref="refVideo" w324px h576px rd-24px @playing="isPaused.video = false" @pause="isPaused.video = true">
            <source src="https://gy.cdn.guiji.cn/www/assets/video/translate-after.mp4">
          </video>
          <div v-show="isPaused?.video" class="rd-50%" p4px absolute-center bg-gray-200>
            <i w48px h48px i-custom-play></i>
          </div>
          <span mt8px>翻译后视频</span>
        </div>
      </div>
    </div>
    <div grid-1-2-32 items-center rd-24px p100px md:mx300px mx100px my50px class="bg-#d0eff2">
      <div flex-col>
        <div text-48px font-600>删除背景图</div>
        <div my16px text-24px>只需点击一下鼠标，即可立即移除图像背景</div>
        <div mxauto mt48px text-white px24px py12px rd-24px class="gradient">
          免费试用
        </div>
      </div>
      <img w600px h440px class="right-64px bottom-16px" src="./1.jpg" alt="">
    </div>
  </div>
</template>

<style scoped lang='scss'>
.gradient {
  background: linear-gradient(45deg, #59d6d4, #8f58f3);
}
</style>