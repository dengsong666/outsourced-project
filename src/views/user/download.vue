<script lang='ts' setup>
</script>

<template>
  <n-alert title="温馨提示" type="warning" closable>
    数据保留30天，请及时下载保存
  </n-alert>
  <div flex flex-wrap gap-24px my16px>
    <div v-for="item in 12" :key="item" class="bg-gray-100 rd-16px" w350px h200px></div>
  </div>
</template>

<style scoped lang='scss'></style>