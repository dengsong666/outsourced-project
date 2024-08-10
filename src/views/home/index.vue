<script lang='ts' setup>
import { MenuOption } from 'naive-ui';

const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: 'home',
  },
  {
    label: '提示词',
    key: 'tips',
  },
  {
    label: 'AI工具',
    key: 'ai',
  },
]
</script>

<template>
  <n-menu mode="horizontal" :options="menuOptions" responsive />
</template>

<style scoped lang='scss'></style>