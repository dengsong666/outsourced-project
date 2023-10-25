<script lang='ts' setup>
import { useCommon } from '@/store'

defineProps<{
  type: '比稿模式' | '存证' | '鱼塘'
}>()
const common = useCommon()
</script>

<script lang='ts'>
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<template>
  <Modal v-if="type == '比稿模式'" :confirm="{ text: '知道了' }">
    <text class="iconfont icon-tips m0" />
    <template #content>
      <ul class="m16px">
        <li class="li">
          设置悬赏来吸引多人投稿，比稿结束时，每位投稿人将平均获得悬赏鱼钩。
        </li>
        <li class="li">
          悬赏奖励仅限于本次比稿活动服务消耗，并不涉及用户作品著作权相关任何交易，如需版权交易，请联系对方进一步酌商。
        </li>
      </ul>
    </template>
  </Modal>
  <Modal v-if="type == '存证'" :confirm="{ text: '知道了' }">
    <text class="iconfont icon-tips m0" />
    <template #content>
      <div class="m16px text-left">
        消耗{{ common.config.depositFishHookNum }}鱼钩，区块链存证证书请到我的存证中查看，亦可在有鱼音乐存证平台（<text class="c-default">chain.fishyoumusic.top</text>）查询公示。
      </div>
    </template>
  </Modal>
  <Modal v-if="type == '鱼塘'" :confirm="{ text: '知道了' }">
    <text class="iconfont icon-tips m0" />
    <template #content>
      <ul class="m16px">
        <li class="li">您发布的作品通过审核后将展示在鱼塘里。</li>
        <li class="li">
          {{ common.yutangText }}
        </li>
      </ul>
    </template>
  </Modal>
</template>

<style scoped lang='scss'>
.li {
  text-align: left;

  &::before {
    content: "\2022";
    font-size: 30px;
    vertical-align: sub;
    margin-right: 4px;
    color: var(--tn-color-primary);
  }
}
</style>