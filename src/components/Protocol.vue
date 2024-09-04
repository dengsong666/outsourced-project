<script lang='ts' setup>
import { useUser } from '@/store';
// 定义组件所需属性
defineProps<{
  title: string,
}>()
// 使用useUser钩子来管理用户相关状态
const user = useUser()
// 定义内容对象，包含用户协议和隐私政策
const content = {
  用户协议: `这是用户协议`,
  隐私政策: `这是隐私政策`,
}
</script>

<template>
  <!-- 定义点击事件，当用户点击时，显示用户协议 -->
  <span text-blue @click="user.showProtocol = true">{{ title }}</span>
  <!-- 弹窗组件，用于展示用户协议或隐私政策 -->
  <n-modal v-model:show="user.showProtocol" preset="card" :title="title" class="md:w50% w80%">
    <!-- 动态绑定html内容，根据title来选择展示用户协议或隐私政策 -->
    <div v-html="content[title]"></div>
  </n-modal>
</template>

<style scoped lang='scss'></style>