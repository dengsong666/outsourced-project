<script lang='ts' setup>
import { getDownloadList } from '@/apis';
import { useList } from '@/hooks/paging';
const list = useList<Video>(getDownloadList)
</script>

<template>
  <n-alert title="温馨提示" type="warning" closable>
    数据保留30天，请及时下载保存
  </n-alert>
  <div md:grid-1-4-24 grid-1-2-48 my16px>
    <template v-for="item in list" :key="item.videoUrl">
      <video :src="item.videoUrl" :poster="item.coverUrl" rd-16px md:h200px w100% h400px>
      </video>
    </template>
  </div>
</template>

<style scoped lang='scss'></style>