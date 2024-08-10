<script lang='ts' setup>
import { MenuOption } from 'naive-ui';

const menuOptions: MenuOption[] = [
  {
    label: '个人资料',
    key: 'userinfo',
  },
  {
    label: '我的账户',
    key: 'my-account',
  },
  {
    label: '下载中心',
    key: 'download-center',
  },
  {
    label: '会员中心',
    key: 'member-center',
  },
]
</script>

<template>
  <div flex>
    <div flex-col items-center p10px h-full class="bg-#eee">
      <div text-20px font-500>Huohuo AI</div>
      <n-menu :options="menuOptions" :default-value="$route.path.split('/').at(-1)"
        @update-value="$router.push(`/user/${$event}`)" />
    </div>
    <div flex-col flex-1 p24px border="t-1px t-solid t-#ccc">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang='scss'>
:deep(.n-menu-item-content) {
  padding: 0 32px !important;
}
</style>