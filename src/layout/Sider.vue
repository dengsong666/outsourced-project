<script setup lang="ts">
import agentRoutes from '../router/routes/modules/agent'
import adminRoutes from '../router/routes/modules/admin'
import router from '@/router'
import { RouteRecordName } from 'vue-router'
import { MenuClickEventHandler } from 'ant-design-vue/lib/menu/src/interface'
const myRoute = ref(adminRoutes)
const selectedKeys = ref(['1'])

const handleClick: MenuClickEventHandler = ({ item, key, keyPath }) => {
  if (key == 'Agent') {
    myRoute.value.map((item) => {
      if (item.meta?.hidden) {
        item.meta.hidden = false
      }
      return item
    })
  }
  router.push({ name: key as RouteRecordName })
}
</script>

<template>
  <a-layout-sider theme="light" class="text-center p16px">
    <img src="@/assets/title-logo.png" alt="logo" m="x48px y8px" />
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline" @click="handleClick">
      <template v-for="{ name, meta } in [...agentRoutes, ...adminRoutes]">
        <a-menu-item v-if="!meta?.hidden" :key="name">
          <i :class="`i-ant-design-${meta?.icon} mr16px wh-24px`" />
          <span class="text-18px">{{ meta?.title }}</span>
        </a-menu-item>
      </template>
    </a-menu>
    <div mt-auto>
      <div class="flex-col items-stretch rd-24px bg-#e8f0fc p16px w60% mx-auto">
        <img src="@/assets/logo.png" alt="logo" m16px />
        <a-button @click="$router.push('/setting-center')" type="primary" class="flex-row items-center justify-between rd-8px">
          设置中心
          <template #icon>
            <i i-ant-design-setting-outlined></i>
          </template>
        </a-button>
      </div>
      <p my24px>
        <i i-ant-design-logout-outlined mr8px />
        Logout
      </p>
      <p text-left text-12px>运营管理平台</p>
      <p text-left text-12px>泰无忧</p>
    </div>
  </a-layout-sider>
</template>

<style lang="scss" scoped>
.ant-layout-sider {
  flex-basis: 300px !important;
  min-width: 300px !important;
  width: 300px !important;
  border-right: 1px solid #eee;
}
.ant-menu {
  border-right: none;
  padding: 0 24px;
  :deep(.ant-menu-title-content) {
    display: flex;
    align-items: center;
  }
  :deep(.ant-menu-item::after) {
    border-right: none;
  }
  :deep(.ant-menu-item-selected) {
    border-radius: 20px;
    background-color: #fff;
    z-index: 10;
  }
}
:deep(.ant-layout-sider-children) {
  display: flex;
  flex-direction: column;
}
</style>
