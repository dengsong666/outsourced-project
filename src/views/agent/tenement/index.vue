<script setup lang="ts">
import { delTenant, getTenantList } from '@/api'
import logo from '@/assets/logo.png'
import { useTable } from '@/store'
import { TableColumnsType } from 'ant-design-vue'
import Form from './Form.vue'

const router = useRouter()
const viewTenant = (id: string) => router.push(`/tenement/${id}`)
const table = useTable(getTenantList)
console.log(table)

const columns: TableColumnsType = [
  { title: 'Logo', dataIndex: 'logo' },
  { title: '公司名称', dataIndex: 'name' },
  { title: '用户数', dataIndex: 'user_number' },
  { title: '地址', dataIndex: 'address' },
  { title: '操作', dataIndex: 'operation', fixed: 'right' }
]
table.getList()
</script>

<template>
  <router-view v-if="$route.params.id" />
  <GridTable v-else :table="table" :columns="columns" @row-click="viewTenant" @delete="delTenant($event)">
    <template #add>
      <Form @submit="table.getList()" :data="null" />
    </template>
    <template #edit="form">
      <Form @submit="table.getList()" :data="form" />
    </template>
  </GridTable>
</template>

<style lang="scss" scoped></style>
