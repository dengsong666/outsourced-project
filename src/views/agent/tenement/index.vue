<script setup lang="ts">
import logo from '@/assets/logo.png'
import { TableColumnsType } from 'ant-design-vue'

const data = Array(20)
  .fill(0)
  .map((item, id) => ({
    id,
    logo,
    name: 'John Brown' + id,
    user_number: id,
    address: 'New York No. 1 Lake Park'
  }))

const columns: TableColumnsType = [
  { title: 'Logo', dataIndex: 'logo' },
  { title: '公司名称', dataIndex: 'name' },
  { title: '用户数', dataIndex: 'user_number' },
  { title: '地址', dataIndex: 'address' },
  { title: '操作', dataIndex: 'operation', fixed: 'right' }
]
</script>

<template>
  <router-view v-if="$route.params.id" />
  <GridTable v-else :data="data" :columns="columns" @row-click="$router.push(`/tenement/${$event.id}`)">
    <template #add> sss </template>
    <template #edit> ss </template>
    <template #details> sss </template>
  </GridTable>
</template>

<style lang="scss" scoped></style>
