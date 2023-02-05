<script setup lang="ts">
const props = defineProps<{
  province: string
  city: string
  area: string
}>()
const provinces: any = {
  北京: { 北京: ['海淀'] },
  浙江: { 杭州: ['fsf', 'sggf'], 宁波: [], 梧州: [] },
  江苏: { 南京: [], 苏州: ['sdfds'], 镇江: [] }
}
const cities = computed(() => Object.keys(provinces[props.province] ?? {}))
const areas = computed(() => provinces?.[props.province]?.[props.city])
const emit = defineEmits(['update:province', 'update:city', 'update:area'])
</script>

<template>
  <a-space>
    <a-select :value="province || undefined" @change="emit('update:province', $event)" :options="Object.keys(provinces)?.map((value) => ({ value }))" placeholder="省"></a-select>
    <a-select :value="city || undefined" @change="emit('update:city', $event)" :options="cities?.map((value) => ({ value }))" placeholder="市"></a-select>
    <a-select :value="area || undefined" @change="emit('update:area', $event)" :options="areas?.map((value: any) => ({ value }))" placeholder="区/县"></a-select>
  </a-space>
</template>

<style lang="scss" scoped>
.ant-space {
  width: 100%;
  :deep(.ant-space-item) {
    flex: 1;
  }
}
</style>
