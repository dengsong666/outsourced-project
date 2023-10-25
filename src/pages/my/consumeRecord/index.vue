<script lang="ts" setup>
import { getConsumeList } from '@/apis';
import { usePage, date } from '@/utils';

const { load, result } = usePage(getConsumeList, { pageSize: 20 })
onShow(() => load(true))
</script>
<template>
  <Topbar back-text="消费记录" bg="#fff" back-color place />
  <div v-for="item in result.list" :key="item.id" class="flex-row py12px mx16px c-#3F4254 bdb-2-#F4F4F4">
    {{ item.description }}
    <text :class="[+item.changeFishhookNumber > 0 ? 'c-default' : 'c-#FF539F']">
      {{ item.changeFishhookNumber }}
    </text>
    <text class="mlauto">{{ date(item.createTime) }}</text>
  </div>
  <NoFound :more="result.more" :nodata="result.nodata" desc="暂无内容" />
</template>


<style lang="scss" scoped></style>

<style>
page {
  padding: 0;
}
</style>