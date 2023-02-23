<script setup lang="ts">
import { CustomTable } from '@/store'

defineProps<{
  table: CustomTable
  target: any
}>()
const emit = defineEmits(['details'])
</script>

<template>
  <a-popover :title="null" trigger="click">
    <template #content>
      <div class="grid-1-3-16">
        <Modal title="编辑">
          <a-button type="primary">编辑</a-button>
          <template #content>
            <slot name="edit"></slot>
          </template>
        </Modal>
        <a-button type="primary" @click="table.viewRow(target.id)">详情</a-button>
        <a-popconfirm title="你想删除该行吗？" @confirm="table.deleteRow(target.id)">
          <a-button type="primary">删除</a-button>
        </a-popconfirm>
      </div>
    </template>
    <i class="i-ant-design-ellipsis-outlined" @click.stop></i>
  </a-popover>
</template>

<style lang="scss" scoped></style>
