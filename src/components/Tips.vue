<script lang='ts' setup>
defineProps<{
  title: string
  content?: string
}>()
const collapse = ref(1)
</script>
<script lang='ts'>
export default {
  options: {
    styleIsolation: 'shared',
  },
}
</script>
<template>
  <tn-collapse v-model="collapse" :show-arrow="!!content">
    <tn-collapse-item>
      <template #title>
        <text class="iconfont icon-tips c-#ae9d2d mr4px"></text>{{ title }}
      </template>
      <text v-if="content">{{ content }}</text>
    </tn-collapse-item>
  </tn-collapse>
</template>

<style scoped lang='scss'>
:deep(.tn-collapse-item) {
  height: 28px !important;
  line-height: 28px;
  font-size: 12px;
  background-color: #F7DF4236;

  &.is-active {
    height: min-content !important;
  }

  .tn-collapse-item__title {
    height: 28px;
  }
  ._wn_title{
    display: flex;
    align-items: center;
  }

  .tn-collapse-item__content {
    padding: 8px 16px !important;
  }
}
</style>