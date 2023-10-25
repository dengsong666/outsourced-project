<script lang="ts" setup>
import { alterWorksName, collectWorks, deleteWorks, getSetWorksList, getYugangAll } from '@/apis';
import { useCommon } from '@/store';
import { usePage, px2vw, useShare } from '@/utils';

const common = useCommon()
const { topbarH, userinfo, tabs } = common
const { share, onShareAppMessage, onShareTimeline } = useShare('/pages/yugang/wordSet/index')
const set = reactive({
  id: undefined,
  type: undefined,
  name: '',
  isAll: false,
  isAdd: false,
  from: '',
  manageShow: false,
  collect: [] as any[],
  includeShow: false,
  isEdit: false,
  limit: undefined,
  author: '',
  isAuthor: false,
  options: [
    { label: '已存证', value: { isEvidence: 1 } },
    { label: '未存证', value: { isEvidence: 0 } },
    { label: '自荐中', value: { isRecommend: 1 } },
    { label: '限时', value: { isTimeLimit: 1 } },
  ]
})
const { load, result, params } = usePage(getSetWorksList, {
  gatherId: undefined,
  isEvidence: undefined,
  isRecommend: undefined,
  isTimeLimit: undefined,
  pageSize: 20
})
onLoad(async (options) => {
  const { id, type, name, all, from, limit, author } = options as any
  set.id = id
  set.type = type
  set.name = name
  set.isAll = Boolean(+all)  // 集合是否是所有
  set.limit = limit
  set.from = from
  set.author = author
  set.from == 'details' || (params.value.gatherId = id)
  share.title = `${userinfo.nickName}分享给你ta${+all ? '所有' : '鱼缸里'}的${tabs.find(item => item.value == type)?.label}集《${name}》，快来预留吧！`
  share.params = { id, type, name, all, author: userinfo.nickName }
  set.collect = [id]
  load()
})
async function onInputConfirm(gatherName: string) {
  set.isEdit = false
  const { success } = await alterWorksName({ gatherName, gatherId: set.id as any })
}
/**
 * 作品收录和删除操作
 * @param type 
 */
async function onManageWorks(type: 'delete' | 'collect') {
  console.log(set.from)
  if (set.from == 'details') {
    common.checkConfirm = true
    return uni.navigateBack()
  }
  if (type == 'collect' && set.collect.length && common.checked.length) {
    const { success } = await collectWorks({ collectionIdList: set.collect, worksIdList: common.checked, })
  } else if (type == 'delete') {
    const { success } = await deleteWorks({ worksIdList: common.checked, gatherId: set.id as any })
    success && load(true)
  }
  set.includeShow = false
}
/**
 * 添加
 */
async function onAdd() {
  set.isAll = true
  set.manageShow = true
  const { dataList } = await getYugangAll({ musicTypeId: set.type as any, pageNum: 1, pageSize: 100 })
  params.value.gatherId = dataList[0].id
}
watch(() => result.other?.showOperateButton, val => {
  console.log(val)
  if (val !== undefined) {
    set.isAuthor = val
    set.name = set.name.replace('我', (set.isAll && !set.isAuthor) ? set.author : '我')
  }
}, { deep: true })
watchEffect(() => (set.isAdd || set.from == 'details') && onAdd())
</script>
<template>
  <Topbar :back-text="set.name" bg="#fff" place back-color msg />
  <div v-if="!set.isAll" class="set flex-col items-center pt24px pb40px">
    <h2 class="flex-row items-center text-18px c-#fff mb12px">
      <tn-input v-if="set.isEdit && set.isAuthor" v-model="set.name" @confirm="onInputConfirm" focus>
      </tn-input>
      <text v-else>{{ set.name }}</text>
      <text v-if="set.isAuthor" class="iconfont icon-edit-line ml10px" @click="set.isEdit = true"></text>
    </h2>
    <div v-if="set.isAuthor" class="px20px py6px rd-16px bg-#fff/60">
      <text @click="set.isAdd = true"><text class="iconfont icon-add-song mr-8px"></text>添加</text>
      <text class="c-#fff/35 mx16px">|</text>
      <tn-button text text-color="#262B2F" open-type="share"><text class="iconfont icon-share mr-8px"></text>分享</tn-button>
    </div>
    <div v-else class="c-#fff text-16px">作者:{{ set.author }}</div>
  </div>
  <div class="relative px16px bg-#fff rd-t-16px mt8px" :class="{ 'top--16px': !set.isAll }">
    <div class="flex-row items-center py12px">
      <img class="w24px h24px mr6px" src="@/static/icons/all-word.png" alt="">
      {{ set.name }} 共{{ result.total }}首
      <div v-if="set.isAuthor" class="flex-row mlauto">
        <Select v-if="set.isAll" :select="{ title: '选择类型', options: set.options }" :top="px2vw(topbarH + 36)"
        @confirm=" params.value = $event.select">
        <text class="c-default mr16px">筛选</text>
        </Select>
        <text class="c-default mr16px" @click="set.manageShow = !set.manageShow, common.checked = []">{{ set.manageShow ? '取消' : '管理' }}</text>
      </div>
    </div>
    <List :list="result.list" :check="set.manageShow" :limit="set.limit" from="鱼缸" :enabled="set.isAuthor" border />
  </div>
  <NoFound :more="result.more" :nodata="result.nodata" desc="暂无内容" />
  <div v-show="set.manageShow"
    class="fixed w100% bottom-0 flex-row justify-end px24px pt10px py30px shadow-0--1-4-0-#eee bg-#fff">
    <text v-if="set.isAdd || set.from == 'details'" class="bg-default px12px py5px c-#fff rd-8px mr8px" @click="onManageWorks('collect')">
      确定
    </text>
    <template v-else>
      <text border="1px solid #E6E6E6" class="px12px py5px rd-8px mr8px" @click="onManageWorks('delete')">{{ set.isAll ? '彻底删除' : '删除' }}</text>
      <text class="bg-default px12px py5px c-#fff rd-8px mr8px" @click="set.includeShow = true">
        收录至<text class="inline-block iconfont icon-arrow-more rotate--90"></text>
      </text>
    </template>
  </div>
  <!-- 收录至 -->
  <tn-popup v-model="set.includeShow" radius="16" open-direction="bottom">
    <tn-checkbox-group v-model="set.collect">
      <tn-checkbox class="w100% bdb-1-#eee" v-for="item in common.sets" :key="item.id" :label="item.id">
        {{ item.name }}
      </tn-checkbox>
    </tn-checkbox-group>
    <div class="grid-1-2-0 mt8px">
      <text class="py13px text-center" @click="set.includeShow = false">取消</text>
      <text class="bg-default c-#fff py13px text-center" @click="onManageWorks('collect')">确定</text>
    </div>
  </tn-popup>
</template>


<style lang="scss" scoped>
.set {
  background: linear-gradient(30deg, #d999e1 0%, #98aefb 50%, #c8e0fd 100%);
}
</style>
<style lang="scss">
page {
  padding: 0;
}
</style>