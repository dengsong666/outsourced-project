<script lang='ts' setup>
import { getUserOrderList } from '@/apis';
import { usePaging } from '@/hooks';
import { useUser } from '@/store';
import { formatDate } from '@vueuse/core';
import { TableColumn } from 'naive-ui/es/data-table/src/interface';
import avatar from "@/static/avatar.jpeg"
const user = useUser()
const columns: TableColumn[] = [
  { title: '编号', key: 'orderId' },
  { title: '订单', key: 'orderType' },
  { title: '花费', key: 'orderPrice' },
  {
    title: '时间', key: 'orderTime', render: (row) => formatDate(new Date(row.orderTime as string), 'YYYY-MM-DD HH:mm')
  },
]
const { pageing, list } = usePaging<Order>(getUserOrderList)
</script>

<template>
  <div flex items-center>
    <n-image class="rd-50%" width="40" :src="user.userinfo?.headImg || avatar" />
    <span ml16px>{{ user.userinfo?.nickname }}</span>
  </div>
  <div flex justify-between items-center class="rd-16px bg-#e5e5e5" p16px my16px>
    <div>赠送积分：<span text-blue>{{ user.account?.integral }}</span> </div>
    <div>余额：<span text-blue>{{ user.account?.balance }}</span> </div>
    <n-button type="primary">充值</n-button>
  </div>
  <h3 my16px>交易明细：</h3>
  <n-data-table :columns="columns" :data="list" :pagination="pageing" />
</template>

<style scoped lang='scss'></style>