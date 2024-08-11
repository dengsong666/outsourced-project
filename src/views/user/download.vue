<script lang='ts' setup>
</script>

<template>
  <n-alert title="温馨提示" type="warning" closable>
    数据保留30天，请及时下载保存
  </n-alert>
  <div md:grid-1-4-24 grid-1-2-48 my16px>
    <div v-for="item in 12" :key="item" class="bg-gray-100 rd-16px md:h200px w100% h400px"></div>
  </div>
</template>

<style scoped lang='scss'></style>