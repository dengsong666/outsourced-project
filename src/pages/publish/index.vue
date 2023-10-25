<script lang="ts" setup>
import type { FormRules, TnFormInstance } from '@tuniao/tnui-vue3-uniapp';
import { isRequiredValid, showMsg, uploadFile, navTo, storage, inform, px2vw } from '@/utils'
import dayjs from 'dayjs'
import Cunzheng from './Cunzheng.vue'
import Know from './Know.vue'
import { closeBiGao, editDetails, getEditDetails, getSelectSetList, getStyleList, openCunZheng, openYuTang, publishWorks } from '@/apis';
import { useCommon } from '@/store';

const formRef = ref<TnFormInstance>()
const common = useCommon()
const initForm = () => ({
  worksId: undefined,
  musicTypeId: 2 as any,
  isCompetition: 0,
  competitionRewardAmount: 0,
  competitionAutoEndTime: '',
  competitionContact: common.userinfo.contractWeChat,
  musicId: undefined,
  musicStyleIdList: [],
  rightHolderParamList: [],
  name: "",
  aduioName: '',
  content: "",
  isBlockChain: 0,
  isPond: 0,
  collectionId: undefined,
})
const releaseForm = reactive(initForm())
const popup = reactive({
  timePicker: false,
  showTips: false,
  showAuth: false,
  tips: '',
});
const options = reactive({
  // 1-demo-选歌；2-歌词-选词；3-曲-填词；4-收歌需求-比稿；
  type: [
    { label: "歌词", value: 2 },
    { label: "曲子", value: 3 },
    { label: "demo", value: 1 },
    { label: "收歌需求", value: 4 },
  ],
  fengge: [],
  shoulu: [],
});
const input = reactive({
  geciLabel: computed(() => releaseForm.musicTypeId == 3 ? '词格' : (releaseForm.musicTypeId == 4 ? '需求描述' : '歌词')),
  geciPlacehoder: computed(() => releaseForm.musicTypeId == 4 ? `请填写您的收歌详细需求，例：\n收歌风格：\n对标歌曲：\n对标歌手：` : (releaseForm.musicTypeId == 3 ? '非必填，提供词格会吸引更多人填词哦~' : `鱼塘审核要求：不可带有作者信息`)),
  submitButtonText: computed(() => releaseForm.musicTypeId == 4 ? '发布需求' : '存入鱼缸'),
  isEditBiGao: true
})
// 规则
const formRules: FormRules = reactive({
  musicTypeId: [{ required: true, message: '请选择类型', trigger: ['change', 'blur'] }],
  competitionRewardAmount: [{ message: `比稿最小金额为${common.config.draftMinAmount}`, min: common.config.draftMinAmount, trigger: ['change', 'blur'] }],
  musicId: [{ required: true, message: '请选择音乐', trigger: ['change', 'blur'] }],
  name: [{ required: true, message: '请输入名字', trigger: ['change', 'blur'] }],
  content: [{ required: computed(() => releaseForm.musicTypeId != 3), message: computed(() => `请输入${input.geciLabel}`), trigger: ['change', 'blur'] }],
})
onLoad(async () => {
  common.currentTabbar = 2
  const { dataList } = await getStyleList()
  options.fengge = dataList
  const worksId = storage.get('edit-id')
  if (worksId) {
    const result = await getEditDetails({ worksId })
    const { error, success } = await closeBiGao({ worksId });
    error && showMsg(error);
    input.isEditBiGao = success
    Object.assign(releaseForm, result)
    releaseForm.worksId = result.id
    releaseForm.isBlockChain = 0
    releaseForm.rightHolderParamList = []
    releaseForm.competitionAutoEndTime = dayjs(result.competitionAutoEndTime).format('YYYY/MM/DD HH:mm:ss')
    storage.del('edit-id')
  }
})
watch(() => common.currentTabbar, () => (formRef.value?.resetFields(), releaseForm.aduioName = ''))
watch(() => releaseForm.musicTypeId, () => (!releaseForm.worksId && formRef.value?.resetFields(Object.keys(initForm()).filter(prop => prop != 'musicTypeId')), releaseForm.aduioName = ''))
/**
 * 上传音频和歌词
 * @param api
 * @param extension
 */
function onUploadFile(api: string, extension: string[]) {
  uni.chooseMessageFile({
    count: 1,
    type: "file",
    extension,
    success: async (res) => {
      const { name, path } = res.tempFiles[0]
      const { musicId, lyric } = await uploadFile(api, path);
      if (musicId) {
        releaseForm.musicId = musicId;
        releaseForm.aduioName = name
      } else {
        releaseForm.content = lyric;
      }
      releaseForm.name = name.replace(/\.(.+)/, '');
    },
  });
}
/**
 * 获取收录词集列表
 */
async function onGetShoulu() {
  if (!releaseForm.musicTypeId)
    return uni.showToast({ icon: "error", title: "请选择发布类型" });
  const { dataList } = await getSelectSetList({
    musicTypeId: releaseForm.musicTypeId,
    pageNum: 1,
    pageSize: 100,
  });
  options.shoulu = dataList;
}
/**
 * 发布
 */
async function onPublish() {
  if (releaseForm.musicTypeId == 4) releaseForm.isCompetition = 1
  const { id, success } = releaseForm.worksId ? await editDetails(releaseForm) : await publishWorks(releaseForm)
  // id && showMsg('发布成功')
  // success && showMsg('编辑成功')
  releaseForm.worksId || (releaseForm.isCompetition ? inform('发布比稿') : inform('发布作品'))
  uni.switchTab({ url: '/pages/yugang/index' })
}
/**
 * 打开存证
 */
async function onOpenCunZheng() {
  const { error, needPay, needRealName, success } = await openCunZheng();
  error && showMsg(error);
  popup.showAuth = needRealName;
  return success || (!needPay && !needRealName && !success);
}
/**
 * 打开鱼塘
 */
async function onOpenYuTang() {
  if (releaseForm.isCompetition) return true
  const { error, needPay, success } = await openYuTang();
  error && showMsg(error);
  return success || (!needPay && !success);
}
</script>

<template>
  <Topbar back-text="发布" back-color place />
  <tn-form ref="formRef" :validate-on-rule-change="false" :model="releaseForm" :rules="formRules" require-asterisk-position="right">
    <tn-form-item label="类型" prop="musicTypeId" class="type-radio">
      <tn-radio-group class="c" v-model="releaseForm.musicTypeId">
        <tn-radio v-for="item in options.type" :key="item.label" :label="item.value" border>
          {{ item.label }}
        </tn-radio>
      </tn-radio-group>
    </tn-form-item>
    <tn-form-item v-if="[2, 3].includes(releaseForm.musicTypeId)" prop="isCompetition">
      <template #label>
        <div class="flex-row">
          <text class="mr8px">比稿模式</text>
          <Know type="比稿模式" />
        </div>
      </template>
      <tn-switch v-model="releaseForm.isCompetition" :active-value="1" :inactive-value="0" :before-change="() => input.isEditBiGao" />
    </tn-form-item>
    <div v-show="releaseForm.isCompetition || releaseForm.musicTypeId == 4" class="bigao">
      <tn-form-item prop="competitionRewardAmount">
        <template #label>
          <div class="flex-row">
            <text class="mr8px">悬赏金额</text>
            <Know v-show="releaseForm.musicTypeId == 4" type="比稿模式" />
          </div>
        </template>
        <tn-input type="number" class="flex-1" v-model="releaseForm.competitionRewardAmount" placeholder="请输入"
          :border="false" :disabled="!input.isEditBiGao" />
      </tn-form-item>
      <tn-form-item label="比稿自动结束时间" prop="competitionAutoEndTime">
        <tn-input class="flex-1" type="select" v-model="releaseForm.competitionAutoEndTime" placeholder="请选择"
          :border="false" @click="popup.timePicker = true" :disabled="!input.isEditBiGao" />
        <tn-date-time-picker v-model="releaseForm.competitionAutoEndTime" v-model:open="popup.timePicker" mode="datetime"
          :min-time="dayjs().add(1, 'day').format('YYYY/MM/DD HH')" :max-time="dayjs().add(common.config.draftEndDayLimit, 'day').format('YYYY/MM/DD HH')" cancel-color="#999999" for />
      </tn-form-item>
      <tn-form-item label="比稿联系方式" prop="competitionContact">
        <tn-input class="flex-1" v-model="releaseForm.competitionContact" placeholder="请输入" :border="false" :disabled="!input.isEditBiGao"/>
      </tn-form-item>
    </div>
    <tn-form-item :label="releaseForm.musicTypeId == 4 ? '标题' : '歌名'" prop="name">
      <tn-input class="flex-1" v-model="releaseForm.name" :placeholder="`请输入${releaseForm.musicTypeId == 4 ? '标题' : '歌名'}`" :border="false" />
    </tn-form-item>
    <tn-form-item v-show="[1, 3].includes(releaseForm.musicTypeId)" class="upload-audio" label="音频" prop="musicId">
      <tn-input class="display-none" v-model="releaseForm.musicId" />
      <span class="text-14px">{{ releaseForm.aduioName }}</span>
      <div class="flex-shrink-0 nowrap px8px py6px bg-default rd-8px c-#fff text-14px mlauto"
        @click="onUploadFile('/v1/file/upload/music', ['mp3', 'm4a', 'wav'])">
        <text class="iconfont icon-upload" />
        <text class="ml4px">上传音频</text>
      </div>
    </tn-form-item>
    <tn-form-item class="upload" :label="input.geciLabel" prop="content"
      label-position="top">
      <div v-if="releaseForm.musicTypeId != 4" class="flex-shrink-0 nowrap absolute top-8px right-16px px8px py6px bg-default rd-8px c-#fff text-14px"
        @click="onUploadFile('/v1/file/upload/lyric', ['txt', 'doc', 'docx'])">
        <text class="iconfont icon-upload" />
        <text class="ml4px">上传歌词</text>
      </div>
      <tn-input class="flex-1" type="textarea" v-model="releaseForm.content" :placeholder="input.geciPlacehoder" />
    </tn-form-item>
    <tn-form-item v-if="releaseForm.musicTypeId != 4" label="风格" prop="musicStyleIdList">
      <Tag v-model="releaseForm.musicStyleIdList" class="flex-1" name="标签" title="歌曲风格标签" :limit="common.config.styleTagNumLimit"
        :options="options.fengge" />
    </tn-form-item>
    <!-- <tn-form-item label="收录" prop="collectionId">
      <Tag :model-value="releaseForm.collectionId ? [releaseForm.collectionId] : []"
        @update:modelValue="releaseForm.collectionId = $event[0]" class="flex-1" name="词集" type="select" title="选择分类"
        :limit="1" :options="options.shoulu" @show="onGetShoulu" />
    </tn-form-item> -->
    <div border="t-8px t-#F4F4F4 t-solid">
      <tn-form-item v-if="releaseForm.musicTypeId != 4" class="cunzheng" prop="isBlockChain">
        <template #label>
          <div class="flex-row">
            <text class="mr8px">作品区块链存证</text>
            <Know type="存证" />
          </div>
        </template>
        <tn-switch v-model="releaseForm.isBlockChain" :active-value="1" :inactive-value="0"
          :before-change="onOpenCunZheng" />
        <Cunzheng :cunzheng-show="!!releaseForm.isBlockChain" :type="releaseForm.musicTypeId" @submit="releaseForm.rightHolderParamList = $event" />
      </tn-form-item>
      <tn-form-item prop="isPond">
        <template #label>
          <div class="flex-row">
            <text class="mr8px">同时放养到鱼塘</text>
            <Know type="鱼塘" />
          </div>
        </template>
        <tn-switch v-model="releaseForm.isPond" :active-value="1" :inactive-value="0" :before-change="onOpenYuTang" />
      </tn-form-item>
    </div>
  </tn-form>
  <div class="px16px" :style="`padding-bottom:calc(${common.bottomH} + ${px2vw(50)})`">
    <tn-button custom-class="disabled" :disabled="!isRequiredValid(
      releaseForm,
      formRules,
      [1, 3].includes(releaseForm.musicTypeId) ? [] : ['musicId']
    )
      " @click="onPublish">{{ input.submitButtonText }}</tn-button>
  </div>
  <tn-popup v-model="popup.showAuth" width="80%">
    <div class="my16px">
      您尚未填写实名认证信息，请到【我的】-【实名认证】中进行实名认证。
    </div>
    <text class="center bg-default w116px p8px c-#fff rd-8px mxauto my16px"
      @click="navTo('/pages/my/realnameAuth/index')">
      去认证
    </text>
  </tn-popup>
  <Tabbar />
</template>

<style lang="scss" scoped>
:deep(.tn-form-item) {
  padding: 10px 16px !important;
  margin: 0px !important;
  border-bottom: 1px solid #eee;
  font-size: 16px;

  .tn-popup__content {
    padding: 0;
  }

  .tn-form-item__content {
    display: flex;

    tn-switch {
      margin-left: auto;
      display: flex;
      justify-items: center;
    }
  }
}

.bigao :deep(.tn-form-item) {
  font-size: 14px;

  .tn-picker__picker-view .tn-picker__picker-view-column {

    &:nth-last-child(1),
    &:nth-last-child(2) {
      display: none !important;
      background-color: red;
    }
  }
}

.upload-audio :deep(.tn-form-item__wrapper) {
  .tn-form-item__content {
    align-items: center;
    margin-top: 0px;
  }
}

.upload :deep(.tn-form-item--label-top .tn-form-item__label) {
  padding-bottom: 0px;
  padding: 9rpx 0px !important;
}

.upload :deep(.tn-form-item__wrapper) {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .tn-form-item__label {
    display: flex;
    width: 100%;

    ._wn_label {
      flex: 1;
      display: flex;
      justify-content: space-between;
    }
  }

  .tn-form-item__content {
    margin-top: 13px;
    width: 100%;

    .tn-input {
      background-color: #f4f4f4;

      // min-height: 96px;
      .tn-input__textarea {
        white-space: pre-line;
        min-height: 96px;
      }
    }
  }
}

:deep(.type-radio) {

  & .tn-radio-group,
  & .tn-checkbox-group {
    margin: 10rpx 0px !important;

  }
}
</style>
<style>
page {
  padding: 0;
  background-color: #fff;
}
</style>
