<script lang="ts" setup>
import { getMessageDetails } from '@/apis';
import { copy, navTo } from '@/utils';
import yutang from "@/static/icons/msg-yutang.png";
import order from "@/static/icons/msg-order.png";
import system from "@/static/icons/msg-system.png";
import dayjs from 'dayjs';
const details = ref()
const icons = [yutang, order, system]
onLoad(async (options) => {
  const messageId = options?.id
  details.value = await getMessageDetails({ messageId })
})
/**
 * 跳转详情
 * @param details 
 */
 function onDetails(details:any) {
  const { musicTypeId: type, worksId } = details
  navTo(`/pages/common/details/${type == 4 ? 'bigao' : 'other'}/index`, { type, worksId })
}
</script>
<template>
  <Topbar back-text="消息详情" place back-color />
  <text class="c-#989EB3FF text-12px mxauto my16px">
    {{ dayjs(details?.createTime).format('YYYY-MM-DD') == dayjs().format('YYYY-MM-DD') ? dayjs(details?.createTime).format('HH:mm') : dayjs(details?.createTime).format('YYYY-MM-DD HH:mm') }}
  </text>
  <div class="flex-row">
    <img class="w40px h40px mr12px flex-shrink-0" :src="icons?.[details?.messageTypeId]" alt="">
    <div class="rd-8px bg-#fff p10px text-12px" @longpress="copy(details.contentList.join(''), '消息')">
      <text v-for="v in details?.contentList" :key="v" :class="{ 'c-default': /(《.+》)/.test(v) }" @click="/(《.+》)/.test(v) && onDetails(details)">{{ v }}</text>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
<style>
page {
  background-color: #F4F4F4;
}
</style>