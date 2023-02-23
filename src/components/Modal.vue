<script setup lang="ts">
import { useCommon } from '@/store'

const { duration } = defineProps<{
  title: string
  width?: number | string
  duration?: number
}>()
const visible = ref(false)
const { bus } = useCommon()
watchEffect(() => visible.value && duration && setTimeout(() => (visible.value = false), duration * 1000))
bus.on('close', () => (visible.value = false))
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
