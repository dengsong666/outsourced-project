<script lang="ts" setup>
import { useCommon } from "@/store";
import { px2vw, navTo } from "@/utils";

withDefaults(
  defineProps<{
    backText: string;
    backColor?: boolean;
    place?: boolean;
    msg?: boolean;
    bg?: string;
    center?: boolean;
  }>(),
  {
    bg: "#fff",
    center: false,
  }
);
const common = useCommon();
const back = getCurrentPages().length > 1;
const home = getCurrentPages().at(-1)?.route?.split('/').length !== 3;
const onBack = () => uni.navigateBack()
const onHome = () => uni.switchTab({ url: '/pages/yutang/index' })
console.log(common.menuButtonPos)
</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: "shared",
  },
};
</script>

<template>
  <tn-navbar
    :center="center"
    :text-color="backColor ? '#000' : '#fff'"
    fixed
    right-operation-width="80"
    class="z100"
    :bottom-shadow="false"
  >
    <slot></slot>
    <template #back>
      <div class="flex-row items-center h100%">
        <text v-if="back" class="iconfont icon-back" @click="onBack" />
        <text v-else-if="home" class="iconfont icon-home" @click="onHome"/>
        <div class="font-600 ml8px nowrap-e" @click="onBack">{{ backText }}</div>
      </div>
    </template>
    <tn-badge v-show="msg" type="primary" bg-color="#D81010" :dot="!!common.unread">
      <text class="iconfont icon-msg m0!" :class="`${backColor ? '#000' : '#fff'}`" @click="navTo('/pages/common/message/index')" />
    </tn-badge>
  </tn-navbar>
  <div v-show="place" :style="`height:${px2vw(common.topbarH)}`"></div>
</template>

<style scoped lang="scss">
:deep(.tn-navbar) {
  .tn-navbar-back {
    width: calc(100% - 140px) !important;
  }

  .tn-navbar__bg {
    background-color: v-bind(bg) !important;
  }

  .tn-navbar__content {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

:deep(.tn-badge) {
  margin-left: auto;
  margin-right: 16px;

  .tn-badge-content {
    width: 8px;
    height: 8px;
  }
}
</style>
