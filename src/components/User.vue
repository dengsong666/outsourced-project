<script setup lang="ts">
import { notification, TableColumnsType } from 'ant-design-vue'
import avatar from '@/assets/avatar.png'
import { CustomTable } from '@/store'
defineProps<{
  table: CustomTable
  scrollY?: number
}>()
const columns: TableColumnsType = [
  { title: '姓名', dataIndex: 'name' },
  { title: '手机号', dataIndex: 'telephone' },
  { title: '状态', dataIndex: 'state' },
  { title: '最近访问时间', dataIndex: 'lately_visit_time' },
  { title: '操作', dataIndex: 'operation', fixed: 'right' }
]
const emit = defineEmits(['row-click', 'delete'])
function handleSend() {
  notification.open({
    duration: 0,
    message: '重置密码',
    description: '新密码已经发送至手机！',
    class: 'my-notify',
    onClick: () => {
      console.log('Notification Clicked!')
    }
  })
}
</script>

<template>
  <div class="flex-row items-center sticky top-0 box">
    <Search />
    <Modal title="新建">
      <span class="add-btn ml-auto w-min"><i class="i-ant-design-plus-outlined c-#fff"></i></span>
      <template #content>
        <slot name="add"></slot>
      </template>
    </Modal>
  </div>
  <a-table
    :columns="columns"
    :data-source="table.list"
    :custom-row="(row) => ({ onClick: () => emit('row-click', row) })"
    :pagination="{ pageSize: Infinity }"
    :sticky="true"
    :scroll="{ y: scrollY || 650 }"
  >
    <template #bodyCell="{ text, column, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="flex-row">
          <img class="w40px h40px" :src="record.avatar" alt="" srcset="" />
          <div class="flex-col mx8px">
            <span class="nowrap font-600">{{ record.nick_name }}</span>
            <span class="text-12px c-#A098AE">{{ record.email }}</span>
          </div>
        </div>
      </template>
      <template v-if="column.dataIndex === 'telephone'">
        <span class="font-600">{{ text }}</span>
      </template>
      <template v-if="column.dataIndex === 'state'">
        <a-switch :checked="text" />
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <Modal title="重置密码" width="350px" :duration="2">
          <i class="i-custom-send"></i>
          <template #content>
            <div p="x48px y24px">
              <span class="bg-#4cbc9a inline-block rd-8px p8px">
                <i class="i-ant-design-phone-outlined c-#fff"></i>
              </span>
              <span class="font-600 ml26px">新密码已经发送至手机！！！</span>
            </div>
          </template>
        </Modal>
        <Operation @delete="emit('delete', record.id)" @details="emit('row-click', record.id)">
          <template #edit>
            <slot name="edit" :form="record"></slot>
          </template>
        </Operation>
      </template>
    </template>
  </a-table>
</template>

<style lang="scss" scoped>
.i-custom-send {
  margin-right: 30px;
}
:deep(.ant-pagination) {
  display: none;
}
</style>
