<script setup lang="ts">
import logo from '@/assets/logo.png'
import Form from './Form.vue'
import { TableColumnsType } from 'ant-design-vue'

const data = Array(20)
  .fill(0)
  .map((item, id) => ({
    id,
    logo,
    name: 'John Brown' + id,
    tenement_number: id,
    address: 'New York No. 1 Lake Park'
  }))

const columns: TableColumnsType = [
  { title: 'Logo', dataIndex: 'logo' },
  { title: '公司名称', dataIndex: 'name' },
  { title: '租户数', dataIndex: 'tenement_number' },
  { title: '地址', dataIndex: 'address' },
  {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right'
  }
]
</script>

<template>
  <router-view v-if="$route.params.id" />
  <GridTable v-else :data="data" :columns="columns" @row-click="$router.push(`/agent/${$event.id}`)">
    <template #add>
      <Form />
    </template>
    <template #edit>
      <Form />
    </template>
  </GridTable>
</template>

<style lang="scss" scoped></style>
