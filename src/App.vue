<script setup lang="ts">
import type { GlobalThemeOverrides, MenuOption } from 'naive-ui';
import { lightTheme } from 'naive-ui'
import { aitools, my } from './menus';
import { useCommon } from './store';
const common = useCommon();
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
    fontSize: isH5.value ? '10px' : '14px',
    // fontSizeLarge: isH5 ? '12px' : '18px',
    // fontSizeSmall: isH5 ? '10px' : '16px',
    // fontSizeMedium: isH5 ? '12px' : '18px',
  },
  DataTable: {
    fontSizeMedium: isH5.value ? '8px' : '14px',
  }
}

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
                <div lt-md:hidden flex class="mx10%">
                  <n-menu mode="horizontal" :options="menuOptions" @update-value="$router.push({ name: $event })" />
                  <n-button type="primary" @click="common.showLogin = true">免费试用</n-button>
                </div>
                <div md:hidden fixed z1 top-16px right-16px @click="showDrawer = true">
                  哈哈
                  <n-drawer v-model:show="showDrawer" width="150px" placement="left">
                    <div flex-col>
                      <n-button m16px type="primary" @click="$router.push('/user')">免费试用</n-button>
                      <n-menu :indent="16" :options="menuOptions" @update-value="$router.push({ name: $event })" />
                    </div>
                  </n-drawer>
                </div>

                <Login />
                <component flex-1 :is="Component"></component>
              </div>
              <!-- 加载中状态 -->
              <template #fallback>
                正在加载...
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
