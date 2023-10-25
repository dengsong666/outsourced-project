<script lang="ts" setup>
import { getMessageList, getUnreadCount } from '@/apis';
import { navTo, usePage } from '@/utils';
import yutang from "@/static/icons/msg-yutang.png";
import order from "@/static/icons/msg-order.png";
import system from "@/static/icons/msg-system.png";
import dayjs from 'dayjs';
import { useCommon } from '@/store';
const icons = [yutang, order, system]
const common = useCommon()
const { load, result } = usePage(getMessageList, { pageSize: 15 })
onShow(() => load(true))
onUnload(async () => {
  const { unreadMessageCount } = await getUnreadCount()
  common.unread = unreadMessageCount
})
</script>
<template>
  <Topbar back-text="消息" place back-color />
  <!-- <NoFound class="flex-1" desc="暂无消息" /> -->
  <div v-for="item in result.list" :key="item.id" class="flex-row items-center mt16px" @click="navTo('/pages/common/message/details/index', { id: item.id })">
    <tn-badge type="danger" :absolute-position="{ top: 8, right: 8 }" :dot="!item.readStatus">
      <img class="w40px h40px" :src="icons[item.messageTypeId]" alt="">
    </tn-badge>
    <div class="flex-col ml6px overflow-hidden w100%">
      <div class="flex-row justify-between">
        <h3 class="font-500 mb2px">{{ item.messageTypeName }}</h3>
        <text class="text-12px c-#989EB3FF">
          {{ dayjs(item.createTime).format('YYYY-MM-DD') == dayjs().format('YYYY-MM-DD') ? dayjs(item.createTime).format('HH:mm') : dayjs(item.createTime).format('YYYY-MM-DD HH:mm') }}
        </text>
      </div>
      <div class="text-12px c-#676D84FF nowrap-e">
        <text v-for="v in item.contentList" :key="v" :class="{ 'c-default': /(《.+》)/.test(v) }">{{ v }}</text>
      </div>
    </div>
  </div>
  <NoFound :more="result.more" :nodata="result.nodata" desc="暂无消息" />
</template>


<style lang="scss" scoped></style>

<style>
page {
  background-color: #fff !important;
}
</style>