<script lang='ts' setup>
import { MenuOption } from 'naive-ui';


</script>

<template>
  <div flex-col>
    <n-carousel autoplay draggable h80vh>
      <div class="bg-#d2f2f2" px300px py50px>
        <img w-full src="https://guiji.cn/_nuxt/img/row-1.514b86a.png" alt="">
      </div>
      <div class="bg-#d2f2f2" px300px py50px>
        <img w-full src="https://guiji.cn/_nuxt/img/row-1.514b86a.png" alt="">
      </div>
    </n-carousel>
    <div flex justify-between items-center rd-24px p100px mx300px my50px class="bg-#d0eff2">
      <div flex-col>
        <div text-48px font-600>翻译视频到多国语言</div>
        <div my16px text-24px>一键翻译20多种国家语言</div>
        <div mxauto mt48px text-white px24px py12px rd-24px class="gradient left-10% bottom-10%">
          免费试用
        </div>
      </div>
      <div flex gap36px class="right-128px bottom-16px">
        <div flex-col items-center>
          <video w324px h576px rd-24px controls>
            <source src="https://gy.cdn.guiji.cn/www/assets/video/translate-before.mp4">
          </video>
          <span mt8px>原视频</span>
        </div>
        <div flex-col items-center>
          <video w324px h576px rd-24px controls>
            <source src="https://gy.cdn.guiji.cn/www/assets/video/translate-before.mp4">
          </video>
          <span mt8px>翻译后视频</span>
        </div>
      </div>
    </div>
    <div flex justify-between items-center rd-24px p100px mx300px my50px class="bg-#d0eff2">
      <div flex-col>
        <div text-48px font-600>删除背景图</div>
        <div my16px text-24px>只需点击一下鼠标，即可立即移除图像背景</div>
        <div mxauto mt48px text-white px24px py12px rd-24px class="gradient left-10% bottom-10%">
          免费试用
        </div>
      </div>
      <img class="right-64px bottom-16px" src="./1.jpg" alt="">
    </div>
  </div>
</template>

<style scoped lang='scss'>
.gradient {
  background: linear-gradient(45deg, #59d6d4, #8f58f3);
}
</style>