<script setup lang="ts">
const collapsed = ref<boolean>(false)
</script>

<template>
  <a-layout-header class="bg-#fff">
    <span class="text-24px font-600">{{ $route.meta.title }}</span>
    <div class="float-right">
      <a-badge dot><i class="i-ant-design-message-outlined text-20px"></i></a-badge>
      <i class="i-ant-design-setting-outlined mx16px text-20px"></i>
      <span @click="$router.push('/personal-center')" class="mr16px">
        <span class="mr16px text-14px">张三</span>
        <img src="@/assets/avatar.png" class="w50px rd-20px" />
      </span>
    </div>
  </a-layout-header>
</template>

<style lang="scss" scoped></style>
