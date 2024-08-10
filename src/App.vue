<script setup lang="ts">
import { MenuOption } from 'naive-ui';
import { aitools } from './menus';
import { useCommon } from './store';
const common = useCommon();
const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: 'home',
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
</script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <!-- 主要内容 -->
            <div flex-col h-full>
              <div flex class="mx10%">
                <n-menu mode="horizontal" :options="menuOptions" @update-value="$router.push({ name: $event })" />
                <n-button type="primary" @click="common.showLogin = true">免费试用</n-button>
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
</template>

<style lang="scss">
@import './styles/global.scss';
@import './styles/reset.scss';


#app {
  height: 100%;
}
</style>
