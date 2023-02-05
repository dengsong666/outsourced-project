<script setup lang="ts">
defineProps<{
  title: string
  scrollY?: number
}>()
</script>

<template>
  <h2 class="font-600 lh-40px mb0">{{ title }}</h2>
  <a-timeline overflow="x-hidden y-scroll" :style="`height: calc(100% - ${scrollY || 40}px);`">
    <a-timeline-item v-for="v in 20">
      <p mb4px>系统管理员开通“智慧电力运维平台”</p>
      <span class="c-#A098AE">2022.12.02 14:35:36 {{ v }}</span>
    </a-timeline-item>
  </a-timeline>
</template>

<style lang="scss" scoped>
.ant-timeline {
  // padding-top: 8px;
  margin-top: 16px;
  .ant-timeline-item {
    left: 20px;
    top: 20px;
  }
  :deep(.ant-timeline-item-head) {
    border: 0;
    border-radius: 8px;
    width: 40px;
    height: 40px;
    background-color: #fe9874;
    transform: translate(-50%, -50%);
  }
  :deep(.ant-timeline-item-content) {
    top: -10px;
  }
  :deep(.ant-timeline-item-tail) {
    left: 0;
  }
}
</style>
