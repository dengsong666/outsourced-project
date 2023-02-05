<script setup lang="ts">
import Sider from './Sider.vue'
import Header from './Header.vue'
import Content from './Content.vue'
</script>
<template>
  <a-layout class="h100%">
    <Sider />
    <a-layout>
      <Header />
      <Content>
        <slot></slot>
      </Content>
    </a-layout>
    <div class="bg bg1"></div>
    <div class="bg bg2"></div>
    <div class="bg bg3"></div>
  </a-layout>
</template>
<style scoped lang="scss">
.bg {
  position: fixed;
  &1 {
    top: 0;
    left: 100px;
    width: 400px;
    height: 200px;
    background: #fe9874;
    filter: blur(200px);
  }
  &2 {
    top: 500px;
    left: 1200px;
    width: 400px;
    height: 200px;
    background: #fe9874;
    filter: blur(200px);
  }
  &3 {
    top: 800px;
    left: 1400px;
    width: 200px;
    height: 100px;
    background: #70504b;
    filter: blur(200px);
  }
}
</style>
