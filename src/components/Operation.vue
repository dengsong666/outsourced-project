<script setup lang="ts">
defineProps<{
  target: any
}>()
const emit = defineEmits(['details'])
function handleDelete() {}
</script>

<template>
  <a-popover :title="null">
    <template #content>
      <div class="grid-1-3-16">
        <Modal title="编辑">
          <a-button type="primary">编辑</a-button>
          <template #content>
            <slot name="edit"></slot>
          </template>
        </Modal>
        <a-button type="primary" @click="emit('details', target)">详情</a-button>
        <a-popconfirm title="你想删除该行吗？" @confirm="handleDelete">
          <a-button type="primary">删除</a-button>
        </a-popconfirm>
      </div>
    </template>
    <i class="i-ant-design-ellipsis-outlined"></i>
  </a-popover>
</template>

<style lang="scss" scoped></style>
