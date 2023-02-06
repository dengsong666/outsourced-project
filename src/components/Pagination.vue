<script setup lang="ts">
const { total } = defineProps<{
  total: number
}>()
const pagination = reactive({
  pageSize: 8,
  current: 1,
  total
})
const currentRange: number[] = [] // 不要用响应式，否则递归页面崩溃
</script>

<template>
  <slot :page="pagination" :current-range="currentRange"></slot>
  <a-pagination
    v-model:current="pagination.current"
    :total="pagination.total"
    :page-size="pagination.pageSize"
    :showTotal="(total:number, range:number[]) => (currentRange=range) && `显示${total}条数据中${range[0]}-${range[1]} 条`"
  />
</template>

<style lang="scss" scoped>
.ant-pagination {
  display: flex;
  margin-top: auto;
  :deep(.ant-pagination-total-text) {
    flex: 1;
  }
  :deep(.ant-pagination-item) {
    &.ant-pagination-item-active {
      background: #363b64ff;
      box-shadow: 0px 7px 16px 0px #00000023;
      a {
        color: #fff;
      }
    }
    margin: 0 8px !important;
    border: 1px solid #a098ae !important;
    border-radius: 12px;
  }
  :deep(.ant-pagination-prev) {
    margin-right: 0;
  }
  :deep(.ant-pagination-item-link) {
    border: none;
    svg {
      width: 0;
      height: 0;
      border: 8px solid;
    }
    .anticon-left svg {
      border-color: transparent #a098aeff transparent transparent;
    }
    .anticon-right svg {
      border-color: transparent transparent transparent #a098aeff;
    }
  }
}
</style>
