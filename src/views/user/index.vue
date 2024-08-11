<script lang='ts' setup>
import { my } from '@/menus';


</script>

<template>
  <PCMenu :menus="my" />
</template>

<style scoped lang='scss'>
:deep(.n-menu-item-content) {
  padding: 0 32px !important;
}
</style>