<script setup lang="ts">
import type { GlobalThemeOverrides, MenuOption } from 'naive-ui';
import { lightTheme } from 'naive-ui'
import { aitools, my } from './menus';
import { useUser } from './store';
import avatar from '@/static/avatar.jpeg'
const user = useUser();
const route = useRoute();
const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: 'home',
  },
  {
    label: '我的',
    key: 'user',
    children: my
  },
  {
    label: '提示词',
    key: 'tips',
  },
  {
    label: 'AI工具',
    key: 'ai',
    children: aitools
  },
  {
    label: '文生图',
    key: 'wushengtu',
  },
  {
    label: '版权库',
    key: 'copyright',
  },
]
const showDrawer = ref(false)
const isH5 = ref(/mobile/i.test(navigator.userAgent));
const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontSize: isH5.value ? '12px' : '14px',
    // fontSizeLarge: isH5 ? '12px' : '18px',
    // fontSizeSmall: isH5 ? '10px' : '16px',
    // fontSizeMedium: isH5 ? '12px' : '18px',
  },
  DataTable: {
    fontSizeMedium: isH5.value ? '10px' : '14px',
  }
}
user.token && user.init()

watch(() => route.hash, hash => {
  if (hash === '#login') {
    user.token = null
    user.showLogin = true
    window.location.hash = ''
  }
})

</script>

<template>
  <n-config-provider :theme="lightTheme" :theme-overrides="themeOverrides" h-full>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition mode="out-in">
          <KeepAlive>
            <Suspense>
              <!-- 主要内容 -->
              <div flex-col h-full>
                <div lt-md:hidden flex items-center class="mx10%">
                  <n-menu mode="horizontal" :options="menuOptions.filter(item => item.key !== 'user')"
                    @update-value="$router.push({ name: $event })" />
                  <n-dropdown v-if="user.userinfo" trigger="hover" :options="my"
                    @select="$event ? $router.push({ name: $event }) : user.token = null">
                    <img w40px h40px :src="user.userinfo.headImg || avatar" alt="">
                  </n-dropdown>
                  <n-button v-else type="primary" @click="user.showLogin = true">免费试用</n-button>
                </div>
                <div md:hidden fixed z1 top-32px right-32px @click="showDrawer = true">
                  <i w100px h100px transition :class="[showDrawer ? 'i-custom-close' : 'i-custom-menu']"></i>
                  <n-drawer v-model:show="showDrawer" width="150px" placement="left">
                    <div flex-col>
                      <div v-if="user.userinfo" text-center>
                        <img w-200px :src="user.userinfo.headImg" alt="" @click="$router.push('/user')">
                      </div>
                      <n-button v-else m16px type="primary" @click="user.showLogin = true">免费试用</n-button>
                      <n-menu :indent="16" :options="menuOptions" @update-value="$router.push({ name: $event })" />
                    </div>
                  </n-drawer>
                </div>

                <Login />
                <component flex-1 :is="Component"></component>
              </div>
              <!-- 加载中状态 -->
              <template #fallback>
                <n-spin absolute-center size="large" description="加载中..." />
              </template>
            </Suspense>
          </KeepAlive>
        </Transition>
      </template>
    </RouterView>
  </n-config-provider>
</template>

<style lang="scss">
@import './styles/global.scss';
@import './styles/reset.scss';


#app {
  height: 100%;
}
</style>
