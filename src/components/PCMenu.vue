<script lang='ts' setup>
import { MenuOption } from "naive-ui"
defineProps<{
  menus: MenuOption[]
}>()
</script>

<template>
  <div flex>
    <div lt-md:hidden flex-col items-center p10px h-full class="bg-#eee">
      <div text-20px font-500>Huohuo AI</div>
      <n-menu :options="menus" :default-value="$route.path.split('/').at(-1)"
        @update-value="$router.push(`/user/${$event}`)" />
    </div>
    <div flex-col flex-1 md:p24px p48px lt-md:mt24px border="t-1px t-solid t-#ccc">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang='scss'>
:deep(.n-menu-item-content) {
  padding: 0 32px !important;
}
</style>