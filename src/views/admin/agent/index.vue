<script setup lang="ts">
import logo from '@/assets/logo.png'
import Form from './Form.vue'
import { TableColumnsType } from 'ant-design-vue'
import { getAgentList, delAgent } from '@/api'
import { useTable } from '@/store'
const router = useRouter()
const viewAgent = (id: string) => router.push(`/agent/${id}`)
const table = useTable(getAgentList, delAgent)
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
table.getList()
</script>

<template>
  <router-view v-if="$route.params.id" />
  <GridTable v-else :table="table" :columns="columns" @row-click="viewAgent" @delete="table.delRow($event)">
    <template #add>
      <Form @submit="table.getList()" :data="null" />
    </template>
    <template #edit="form">
      <Form @submit="table.getList()" :data="form" />
    </template>
  </GridTable>
</template>

<style lang="scss" scoped></style>
