<script lang='ts' setup>
import { storage, navTo, uploadFile, copy, shareFile } from '@/utils'
import { finishBiGao, quitBiGao } from '@/apis'
import { useCommon } from '@/store'

defineProps<{
  details: Item
  extraDetails?: ExtraDetails
  extraMyDetails?: ExtraMyDetails
  type?: number // 1-收歌；2-作曲；3-填词；
  isEdit?: boolean // 是否编辑过
}>()
const common = useCommon()
const emit = defineEmits(['edit', 'submit', 'update'])
const opt = reactive({
  music: {} as any
})
async function onEdit(id: number) {
  storage.set('edit-id', id)
  uni.switchTab({ url: '/pages/publish/index' })
}
async function onJoin(id: number, type?: number) {
  switch (type) {
    case 1:
      return navTo('/pages/yugang/wordSet/index', { id, name: '我所有的demo', type: 1, limit: 1, all: true, from: 'details' })
    case 2:
      const { musicId } = await uploadFile('/v1/file/upload/music', opt.music?.path);
      return musicId && emit('submit', { contributeMusicId: musicId })
  }
}
/**
 * 上传音乐
 */
function onUploadAudio() {
  uni.chooseMessageFile({
    count: 1,
    type: "file",
    extension: ['mp3', 'm4a', 'wav'],
    success: async (res) => {
      console.log(res)
      opt.music = res.tempFiles[0]
    },
  });
}
/**
 * 
 * @param worksId 退出比稿
 */
async function onQuitBiGao(worksId: number) {
  const { success } = await quitBiGao({ worksId })
  success && emit('update')
}

async function onFinishBiGao(worksId: number) {
  const { success } = await finishBiGao({ worksId })
  success && emit('update')
}
/**
 * 收歌需求
 */
watch(() => common.checkConfirm, val => {
  console.log(common.checkConfirm, common.checked)
  if (val && common.checked.length) {
    emit('submit', { contributeDemoId: common.checked[0] })
    common.checkConfirm = false
    common.checked = []
  }
})
</script>

<script lang='ts'>
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<template>
  <div class="m16px">
    <!-- 本人浏览 -->
    <div class="flex-row gap-16px" v-if="details?.isAuthor">
      <Modal v-show="!details.isDraftEnd" class="w45%" @confirm="onFinishBiGao(details.id)" title="确认结束比稿吗？"
        :content="`您将结束此次比稿，参加比稿的每位用户将获得奖励${details.rewardFishHookCount}/${details.contributeCount}鱼钩。`" warning cancel :confirm="{ color: '#E71D25' }">
        <button class="btn btn-#390901 m0">结束比稿</button>
      </Modal>
      <Author v-if="extraMyDetails?.id" class="w55%" :id="extraMyDetails?.id" :type="5" color="#E71D25">
        <button class="btn btn-#E71D25 m0">联系ta</button>
      </Author>
      <button v-else class="btn btn-#E71D25 m0 w55%" @click="onEdit(details.id)">编辑修改</button>
      <button v-show="details.isDraftEnd" class="btn btn-#D56161 c-#390901 m0 w55%">已结束</button>
    </div>
    <!-- 他人浏览 -->
    <template v-else>
      <button v-if="details.isDraftEnd" class="btn btn-#D56161 m0 w100% c-#390901">已结束</button>
      <div v-else class="flex-row gap-16px"
        :class="{ 'bg-#390901 rd-16px p4px': type != 1 && !isEdit && !extraDetails?.isSubmit }">
        <template v-if="extraDetails?.isSubmit">
          <button class="btn btn-#390901 m0 w45%" @click="onQuitBiGao(details.id)">退出比稿</button>
          <Author class="w55%" :id="details.id" :type="4" color="#E71D25">
            <button class="btn btn-#E71D25 m0">联系ta</button>
          </Author>
        </template>
        <template v-else>
          <template v-if="type == 3">
            <Modal v-if="isEdit" class="w100%" @confirm="emit('submit')" title="确认提交投稿吗？" cancel
              content="投稿一经提交，不可更改，请确认后提交投稿" warning :confirm="{ color: '#E71D25' }">
              <button class="btn btn-#E71D25 m0 w100%">参加比稿</button>
            </Modal>
            <button v-else class="btn btn-#E71D25 m0 w55%" @click="emit('edit')">参加比稿</button>
            <!-- <Modal  class="w60%" @confirm="emit('edit')" :confirm="{ text: '知道了', color: '#E71D25' }">
              <button class="btn btn-#E71D25 m0 w100%" @click="emit('edit')">参加比稿</button>
              <template #content>
                比稿发起者也可提前结束比稿
                <p class="my8px">已有 <text class="c-#FF539F">0人</text> 投稿，预期奖励≤ <text class="c-default">10</text> /
                  <text class="c-#FF539F">0+1</text>鱼
                </p>
              </template>
            </Modal> -->
          </template>
          <Modal class="w55%" v-if="type == 2"  title="请上传您投稿的音频文件" @confirm="onJoin(details.id, type)"
            :confirm="{ color: '#E71D25' }" cancel warning>
            <button class="btn btn-#E71D25 m0 w100%">参加比稿</button>
            <template #content class="w100%">
              <div v-if="opt.music?.name" class="text-center">{{ opt.music?.name }}</div>
              <div v-else class="center p24px bd-1-#E71D25 b-dashed! bg-#E71D25/6 mb16px mxauto" @click="onUploadAudio">
                <text class="iconfont icon-add c-#E71D25 text-24px"></text>
              </div>
            </template>
          </Modal>
          <button v-if="type == 1" class="btn btn-#E71D25 m0 w100%" @click="onJoin(details.id, type)">参加比稿</button>
          <template v-if="type != 1 && !isEdit">
            <div v-if="type == 3" class="w45% flex-col c-#fff items-center justify-center" @click="shareFile(details.musicUrl, details.name)">
              <text class="iconfont icon-download mb4px"></text>
              <text>下载音频</text>
            </div>
            <div v-if="type == 2" class="w45% flex-col c-#fff items-center justify-center" @click="copy(details.content, '歌词')">
              <text class="iconfont icon-copy mb4px"></text>
              <text>复制歌词</text>
            </div>
          </template>
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped lang='scss'></style>