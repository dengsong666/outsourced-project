<script setup lang="ts">
import agentRoutes from '../router/routes/modules/agent'
import adminRoutes from '../router/routes/modules/admin'
import router from '@/router'
import { RouteRecordName } from 'vue-router'
const selectedKeys = ref(['1'])
</script>

<template>
  <a-layout-sider theme="light" class="text-center p16px">
    <img src="@/assets/title-logo.png" alt="logo" m="x24px y8px" />
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline" @click="({ key }) => router.push({ name: key as RouteRecordName })">
      <template v-for="{ name, meta } in [...agentRoutes, ...adminRoutes]">
        <a-menu-item v-if="!meta?.hidden" :key="name">
          <i :class="`i-ant-design-${meta?.icon} mr8px`" />
          <span>{{ meta?.title }}</span>
        </a-menu-item>
      </template>

      <!-- <a-menu-item key="0">
        <i class="i-ant-design-dashboard-outlined" />
        <span>仪表盘</span>
      </a-menu-item>
      <a-menu-item key="1">
        <i class="i-ant-design-usergroup-add-outlined" />
        <span>代理商</span>
      </a-menu-item>
      <a-menu-item key="2">
        <i class="i-ant-design-user-outlined" />
        <span>用户管理</span>
      </a-menu-item>
      <a-menu-item key="3">
        <i class="i-ant-design-menu-outlined" />
        <span>菜单管理</span>
      </a-menu-item>
      <a-menu-item key="4">
        <i class="i-ant-design-apartment-outlined />" />
        <span>角色管理</span>
      </a-menu-item>
      <a-menu-item key="5">
        <i class="i-ant-design-key-outlined />" />
        <span>第三方令牌</span>
      </a-menu-item>
      <a-menu-item key="6">
        <i class="i-ant-design-notification-outlined />" />
        <span>通知</span>
      </a-menu-item> -->
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
}
:deep(.ant-layout-sider-children) {
  display: flex;
  flex-direction: column;
}
</style>
