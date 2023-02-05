<script setup lang="ts">
import Layout from '@/layout/index.vue'
import 'uno.css'
import 'ant-design-vue/es/notification/style/index.css'
</script>

<template>
  <Layout><router-view /></Layout>
</template>

<style lang="scss">
#app {
  height: 100%;
  overflow: hidden;
  // background-image: url('@/assets/bg.jpg');
  // background-size: 100%;
}
</style>
