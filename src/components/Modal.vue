<script lang='ts' setup>
defineProps<{
  title?: string
  content?: string
  cancel?: { text?: string } | boolean
  confirm?: { text?: string, color?: string }
  warning?: boolean
}>()
const show = ref(false)
const emit = defineEmits(['confirm', 'cancel', 'change'])
watch(() => show.value, val => emit('change', val))
</script>
<script lang='ts'>
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>
<template>
  <div class="h100%" @click="show = true">
    <slot></slot>
  </div>
  <tn-popup v-model="show">
    <div class="py16px">
      <p v-if="warning" class="iconfont icon-warning c-#faad14 text-24px text-center mb10px"></p>
      <h3 v-if="title" class="text-16px font-500 text-center c-#000">{{ title }}</h3>
      <div class="my20px c-#333 center">
        <slot name="content">{{ content }}</slot>
      </div>
      <div class="flex-row justify-center items-center gap-16px">
        <text v-if="cancel" class="w50% c-#000 bg-#F4F4F4 rd-8px p8px text-center nowrap-e inline-block"
          @click="show = false, emit('cancel')">{{ (cancel as any)?.text || '取消' }}</text>
        <text class="w50% c-#fff rd-8px p8px text-center nowrap-e inline-block"
          :style="`background-color:${confirm?.color || '#3A69F5'}`" @click="show = false, emit('confirm')">
          {{ confirm?.text || '确定' }}
        </text>
      </div>
    </div>
  </tn-popup>
</template>

<style scoped lang='scss'>
:deep(.tn-popup__content) {
  width: 70% !important;
}
</style>