<script lang='ts' setup>
import { TableColumn } from 'naive-ui/es/data-table/src/interface';

const columns: TableColumn[] = [
  {
    title: '编号',
    key: 'id',
  },
  {
    title: '订单',
    key: 'order',
  },
  {
    title: '花费',
    key: 'cost',
  },
  {
    title: '时间',
    key: 'time',
  },
]
const data = [
  {
    id: '1',
    order: '订单号123456789',
    cost: '1000',
    time: '2022-01-01 12:00:00',
  },
  {
    id: '2',
    order: '订单号987654321',
    cost: '2000',
    time: '2022-01-02 12:00:00',
  },
  {
    id: '3',
    order: '订单号456789123',
    cost: '3000',
    time: '2022-01-03 12:00:00',
  },
  {
    id: '4',
    order: '订单号789456123',
    cost: '4000',
    time: '2022-01-04 12:00:00',
  },
  {
    id: '5',
    order: '订单号246813579',
    cost: '5000',
    time: '2022-01-05 12:00:00',
  },
  {
    id: '6',
    order: '订单号879456123',
    cost: '6000',
    time: '2022-01-06 12:00:00',
  },
  {
    id: '7',
    order: '订单号567891234',
    cost: '7000',
    time: '2022-01-07 12:00:00',
  },
  {
    id: '8',
    order: '订单号135792468',
    cost: '8000',
    time: '2022-01-08 12:00:00',
  },
  {
    id: '9',
    order: '订单号924681357',
    cost: '9000',
    time: '2022-01-09 12:00:00',
  },

  {
    id: '10',
    order: '订单号654321789',
    cost: '10000',
    time: '2022-01-10 12:00:00',
  },
  {
    id: '11',
    order: '订单号321789456',
    cost: '11000',
    time: '2022-01-11 12:00:00',
  },
]
const pageing = reactive({
  page: 2,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [3, 5, 7],
  onChange: (page: number) => {
    pageing.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pageing.pageSize = pageSize
    pageing.page = 1
  }
})
</script>

<template>
  <div flex items-center>
    <n-image class="rd-50%" width="40" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
    <span ml16px>火火AI-148</span>
  </div>
  <div flex justify-between items-center class="rd-16px bg-#e5e5e5" p16px my16px>
    <div>赠送积分：<span text-blue>1599</span> </div>
    <div>余额：<span text-blue>1528205</span> </div>
    <n-button type="primary">充值</n-button>
  </div>
  <h3 my16px>交易明细：</h3>
  <n-data-table :columns="columns" :data="data" :pagination="pageing" />
</template>

<style scoped lang='scss'></style>