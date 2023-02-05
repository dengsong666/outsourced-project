<script setup lang="ts">
const { duration } = defineProps<{
  title: string
  width?: number | string
  duration?: number
}>()
const visible = ref(false)
watchEffect(() => visible.value && duration && setTimeout(() => (visible.value = false), duration * 1000))
</script>

<template>
  <span @click.stop="visible = true"><slot></slot></span>
  <a-modal v-model:visible="visible" :footer="null" :title="title" :width="width" @cancel="visible = false" centered :closable="!duration">
    <template #closeIcon>
      <i class="i-ant-design-close-circle-outlined c-red" />
    </template>
    <slot name="content"> </slot>
  </a-modal>
</template>

<style lang="scss" scoped></style>
