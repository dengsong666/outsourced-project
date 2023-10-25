<script lang="ts" setup>
import { delSearchHistory, getSearchHistoryList, getSearchList } from '@/apis';
import { usePage } from '@/utils';
const search = reactive({
  input: '',
  focus: false,
  history: [],
  tabs: [
    { text: '全部' },
    { text: 'Demo' },
    { text: '歌词' },
    { text: '曲子' },
    { text: '比稿' },
  ],
  currentTab: 0,
})
const regExp = computed(() => new RegExp(search.input, 'g'))
const { result,params } = usePage(getSearchList, { pageSize: 20 })
const list = computed(() => result.list.map((item: any) => ({ ...item, name: item.name.replace(regExp.value, `<span style="color: var(--tn-color-primary);">${search.input}</span>`) })))
/**
 * 搜索高亮关键字
 * @param v 关键字
 */
async function onInputConfirm(searchContent: string) {
  if (!searchContent) return
  const musicTypeId: any = search.currentTab ? search.currentTab : undefined
  params.value = { searchContent, musicTypeId }
}
/**
 * 删除历史记录
 */
async function onDeleteHistory() {
  const { success } = await delSearchHistory()
}
onShow(async () => {
  const { dataList } = await getSearchHistoryList()
  search.history = dataList.map((item: any) => item.key)
})
watch(() => search.currentTab, () => onInputConfirm(search.input))
</script>

<template>
  <Topbar back-text="搜索" bg="#fff" back-color place msg />
  <tn-input class="mt16px" v-model="search.input" height="32px" placeholder="搜索" @confirm="onInputConfirm"
    @focus="search.focus = true" @blur="search.focus = false">
    <template #prefix>
      <div class="center ml8px">
        <img src="@/static/icons/search.svg" class="w16px h16px" alt="">
      </div>
    </template>
  </tn-input>
  <tn-tabs v-model="search.currentTab" :scroll="false" active-color="#000" :bottom-shadow="false" height="100rpx">
    <tn-tabs-item v-for="(item, index) in search.tabs" :key="index" :title="item.text" />
    <template #bar>
      <text class="iconfont icon-tab-selected text-10px" />
    </template>
  </tn-tabs>
  <List v-if="list.length" :list="list" more />
  <div v-show="!search.input && search.focus && search.history.length" class="mt24px">
    <div class="flex-row justify-between">
      <text>最近搜过</text>
      <text class="iconfont icon-delete c-#989EB3" @click="onDeleteHistory" />
    </div>
    <div class="flex-row mt12px flex-wrap gap-16-12 text-14px">
      <text v-for="v in search.history" :key="v" class="px8px py4px bg-#F5F7FE rd-4px" @click="search.input = v">
        {{ v }}
      </text>
    </div>
  </div>
  <NoFound v-show="search.input && !search.focus" :more="result.more" :nodata="result.nodata" desc="暂无搜索内容" />
</template>

<style lang="scss" scoped>
:deep(.tn-input) {
  background-color: #F4F4F4;
  border-radius: 16px !important;
}
</style>
<style>
page {
  background-color: #fff;
}
</style>
