<script lang='ts' setup>
</script>

<template>
  <div v-if="$route.hash === '#protocol'">用户协议</div>
  <div v-else-if="$route.hash === '#privacy'">隐私政策</div>
</template>

<style scoped lang='scss'></style>