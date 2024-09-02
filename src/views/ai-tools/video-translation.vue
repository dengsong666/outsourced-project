<script lang='ts' setup>
import { createVideoTask, getTaskOrderStatus, getVideoGenerateInfo } from '@/apis';
import { useUser } from '@/store';
import { message } from '@/utils';
import { FormInst, FormRules } from 'naive-ui';

const user = useUser()
const refForm = ref<FormInst>()
const form = reactive({
  sourceLanguageId: undefined,
  sourceUrl: '',
  targetLanguageId: undefined,
  timbreId: undefined,
  backgroundMusicEnable: 0,
  subtitleEnable: 0
})
const types = 'video/mp4, video/mpeg, video/quicktime, video/x-msvideo, video/x-ms-wmv, video/webm'
const showTips = ref(false)
const rules: FormRules = {
  sourceLanguageId: { required: true, message: '请选择初始语言' },
  targetLanguageId: { required: true, message: '请选择目标语言' },
  timbreId: { required: true, message: '请选择配音' },
  backgroundMusicEnable: { required: true, message: '请选择背景音' },
  subtitleEnable: { required: true, message: '请选择生成字幕' }
}
const yesOrNo = [
  { label: '是', value: 1 },
  { label: '否', value: 0 }
]
const videoGenerateInfo = ref<VideoGenerate>()
const sourceLangs = computed(() => videoGenerateInfo.value?.sourceLanguageInfos.map(({ zhLanguage: label, id: value }) => ({ label, value })))
const targetLangs = computed(() => videoGenerateInfo.value?.targetLanguageInfos.map(({ zhLanguage: label, id: value }) => ({ label, value })))
// const sourceLang = computed(() => sourceLangs.value.find((item: any) => item.id === form.sourceLanguageId))
const targetLang = computed(() => videoGenerateInfo.value?.targetLanguageInfos.find(item => item.id === form.targetLanguageId))
const dubs = computed(() => {
  let target: Dub[] | undefined
  const id = targetLang.value?.language
  if (id) target = videoGenerateInfo.value?.timbreInfosGroupedByLanguage[id]
  if (target) return target
})
const videoUrl = ref('')
const progress = reactive({
  uploading: false,
  percent: 0,
  status: 'default' as any,
  desc: '就绪'
})
const progressPercent = useLocalStorage('video-translation-progress', 0)
getVideoGenerateInfo().then((res) => videoGenerateInfo.value = res)
function onTranslate() {
  if (!form.sourceUrl) message.error('请上传视频文件')
  refForm.value?.validate(errors => {
    if (!errors) {
      createVideoTask(form as any).then(({ orderId }) => {
        // 订单状态订单状态;-1-未知，0-转换中，1-已完成，2-失败,3-排队中
        const timer = setInterval(() => getTaskOrderStatus({ orderId }).then(res => {
          console.log(res);
          const status = +res.status
          progress.desc = res.statusDesc
          progress.status = ['info', 'success', 'error', 'warning', 'default'].at(status) ?? 'default'
          if ([0, 3].includes(status) && progressPercent.value <= 99) progressPercent.value += (Math.random() / 10)
          else if (status == 1) {
            if (progressPercent.value <= 90) progressPercent.value += (Math.random() * 10)
            else progressPercent.value = 100
            clearInterval(timer)
          }
        }), 5000)
      })
    }
  })
}
function onUploadFinish(e: any) {
  const { relativePath, absolutePath } = JSON.parse(e.event.target?.response)
  videoUrl.value = absolutePath
  form.sourceUrl = relativePath
  progress.uploading = false
}
</script>

<template>
  <div flex-col md:flex-row gap24px justify-between items-center class="rd-16px bg-gray-200" p24px>
    <div md:w200px md:h200px w40vw h40vw>
      <n-spin :show="progress.uploading">
        <video v-if="videoUrl" h-full w-full :src="videoUrl"></video>
        <n-upload v-else ref="upload" action="/api/v1/file/upload" :headers="user.headers" :show-file-list="false"
          :accept="types" @before-upload="progress.uploading = true" @finish="onUploadFinish">
          <div grid-center class="rd-8px" text-white bg-black h-full w-full>
            <i md:w80px md:h80px class="w50% h50%" i-custom-upload></i>
          </div>
        </n-upload>
      </n-spin>
    </div>
    <n-progress flex-1 my64px type="line" :percentage="progressPercent" :status="progress.status"
      :processing="progress.status == 'info'" indicator-text-color="blue" rail-color="white">
      {{ progressPercent.toFixed(2) + '% ' + progress.desc }}
    </n-progress>
    <div md:w200px md:h200px w40vw h40vw>
      <!-- <video v-if="true" h-full w-full
        src="http://60.205.115.52:8082/api/v1/video/mp4/7d9fa309-80ce-48e7-b534-db0337cd3e3d.mp4"></video> -->
      <div grid-center class="rd-8px" text-white bg-black h-full w-full>
        <i md:w80px md:h80px class="w50% h50%" i-custom-download></i>
      </div>
    </div>
  </div>
  <n-form ref="refForm" :label-width="100" :model="form" :rules="rules" label-align="left" label-placement="left"
    mt24px>
    <n-form-item label="初始语言" path="sourceLanguageId">
      <n-select v-model:value="form.sourceLanguageId" :options="sourceLangs" placeholder="请选择初始语言" />
    </n-form-item>
    <n-form-item label="目标语言" path="targetLanguageId">
      <n-select v-model:value="form.targetLanguageId" :options="targetLangs" placeholder="请选择目标语言" />
    </n-form-item>
    <n-form-item v-if="dubs" label="配音" path="timbreId">
      <n-radio-group v-model:value="form.timbreId">
        <n-radio v-for="item in dubs" :key="item.id" :value="item.id">
          {{ item.name }}
        </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="背景音" path="backgroundMusicEnable">
      <n-radio-group v-model:value="form.backgroundMusicEnable">
        <n-radio v-for="item in yesOrNo" :key="item.value" :value="item.value">
          {{ item.label }}
        </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="生成字幕" path="subtitleEnable">
      <n-radio-group v-model:value="form.subtitleEnable">
        <n-radio v-for="item in yesOrNo" :key="item.value" :value="item.value">
          {{ item.label }}
        </n-radio>
      </n-radio-group>
    </n-form-item>
  </n-form>
  <div flex-col items-center text-12px text-gray>
    <div flex gap-24px items-center>
      预计消耗积分：24
      <n-button ml16px type="primary" attr-type="submit" @click="onTranslate">
        翻译
      </n-button>
      积分余额：{{ user.account?.integral }}
    </div>
    <p>仅可对本人视频翻译，您承诺提供的素材内容为您本人所有或以获得合法授权，并遵守
      <n-modal v-model:show="showTips" transform-origin="center">
        <n-card style="width: 600px" title="提示AI音频翻译功能使用规范" role="dialog">
          干红辣椒咖啡馆回来就好了反馈给肌肤光滑
        </n-card>
      </n-modal>
      <span cursor-pointer @click="showTips = true" class="text-green">《提示AI音频翻译功能使用规范》</span>
    </p>
  </div>
</template>

<style scoped lang='scss'>
:deep(.n-spin-container) {
  height: 100%;

  .n-spin-content {
    height: 100%
  }
}

:deep(.n-upload) {
  text-align: center;
  width: unset;
  height: 100%;

  .n-upload-trigger {
    width: 100%;
    height: 100%;
  }
}

@media screen and (max-width: 768px) {
  :deep(.n-progress-content) {
    flex-direction: column;

    .n-progress-graph {
      width: 100%;
    }
  }
}
</style>