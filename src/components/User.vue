<script setup lang="ts">
import { notification, TableColumnsType } from 'ant-design-vue'
import avatar from '@/assets/avatar.png'
defineProps<{
  scrollY?: number
}>()
const columns: TableColumnsType = [
  { title: '姓名', dataIndex: 'name' },
  { title: '手机号', dataIndex: 'phone' },
  { title: '状态', dataIndex: 'state' },
  { title: '最近访问时间', dataIndex: 'lately_visit_time' },
  { title: '操作', dataIndex: 'operation', fixed: 'right' }
]
const emit = defineEmits(['row-click'])
const data = Array(20)
  .fill(0)
  .map((item, id) => ({
    id,
    avatar,
    name: 'John Brown' + id,
    email: 'asfsf@qq.com',
    phone: 124366756,
    state: !!(id % 2),
    lately_visit_time: '2022-12-11 05:33:12'
  }))

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
    :data-source="data"
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
            <span class="nowrap font-600">{{ record.name }}</span>
            <span class="text-12px c-#A098AE">{{ record.email }}</span>
          </div>
        </div>
      </template>
      <template v-if="column.dataIndex === 'phone'">
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
              <span class="bg-#4cbc9a inline-block rd-8px p8px"><i class="i-ant-design-phone-outlined c-#fff"></i></span>
              <span class="font-600 ml24px">新密码已经发送至手机！</span>
            </div>
          </template>
        </Modal>
        <Operation :target="record">
          <template #edit>
            <div class="p24px">暂无</div>
          </template>
        </Operation>
      </template>
    </template>
  </a-table>
</template>

<style lang="scss" scoped>
:deep(.ant-pagination) {
  display: none;
}
</style>
