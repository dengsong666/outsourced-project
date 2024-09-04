<script lang='ts' setup>
import { MenuOption } from "naive-ui"
// 定义组件属性，接收一个名为menus的数组，其元素类型为MenuOption
defineProps<{
  menus: MenuOption[]
}>()
</script>

<template>
  <div flex>
    <!-- 侧边栏导航 -->
    <div lt-md:hidden flex-col items-center p10px h-full class="bg-#eee">
      <!-- 应用名称 -->
      <div text-20px font-500>Huohuo AI</div>
      <!-- 菜单组件，根据menus属性和当前路由路径来设置选中项，点击菜单项时跳转到/user/{菜单值}页面 -->
      <n-menu :options="menus" :value="$route.path.split('/').at(-1)" @update-value="$router.push(`/user/${$event}`)" />
    </div>
    <!-- 主内容区域 -->
    <div flex-col flex-1 md:p24px p48px lt-md:mt24px border="t-1px t-solid t-#ccc">
      <!-- 路由视图，用于渲染匹配的组件 -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang='scss'>
:deep(.n-menu-item-content) {
  padding: 0 32px !important;
}
</style>