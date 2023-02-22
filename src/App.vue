<script setup lang="ts">
import Layout from '@/layout/index.vue'
import 'uno.css'
import '@/styles/reset.scss'
import 'ant-design-vue/es/notification/style/index.css'
import 'ant-design-vue/es/message/style/index.css'
</script>

<template>
  <router-view v-if="$route.path == '/login'" />
  <Layout v-else><router-view /></Layout>
</template>

<style lang="scss">
#app {
  height: 100%;
  overflow: hidden;
  // 666
  // background-image: url('@/assets/bg.jpg');
  // background-size: 100%;
}
</style>
