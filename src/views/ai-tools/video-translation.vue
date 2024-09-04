<script lang='ts' setup>
import { createVideoTask, getEstimatedPrice, getTaskOrderStatus, getVideoGenerateInfo } from '@/apis';
import { useUser } from '@/store';
import { message } from '@/utils';
import { FormInst, FormRules } from 'naive-ui';
import { Status } from 'naive-ui/es/progress/src/interface';

// 使用useUser钩子获取用户信息
const user = useUser()

// 定义一个引用，用于在表单实例化后进行操作
const refForm = ref<FormInst>()

// 定义并初始化表单数据
const form = reactive({
  sourceLanguageId: undefined, // 源语言ID
  sourceUrl: '', // 视频源URL
  targetLanguageId: undefined, // 目标语言ID
  timbreId: undefined, // 音色ID
  backgroundMusicEnable: 0, // 背景音乐启用状态
  subtitleEnable: 0 // 字幕启用状态
})

// 定义支持的视频类型字符串
const types = 'video/mp4, video/mpeg, video/quicktime, video/x-msvideo, video/x-ms-wmv, video/webm'

// 定义一个引用，用于显示或隐藏提示信息
const showTips = ref(false)

// 定义表单验证规则
const rules: FormRules = {
  sourceLanguageId: { required: true, message: '请选择初始语言' },
  targetLanguageId: { required: true, message: '请选择目标语言' },
  timbreId: { required: true, message: '请选择配音' },
  backgroundMusicEnable: { required: true, message: '请选择背景音' },
  subtitleEnable: { required: true, message: '请选择生成字幕' }
}

// 定义是否选项
const yesOrNo = [
  { label: '是', value: 1 },
  { label: '否', value: 0 }
]

// 引用VideoGenerate类型的变量，用于存储视频生成信息
const videoGenerateInfo = ref<VideoGenerate>()

// 计算属性，用于获取源语言列表
const sourceLangs = computed(() => videoGenerateInfo.value?.sourceLanguageInfos.map(({ zhLanguage: label, id: value }) => ({ label, value })))

// 计算属性，用于获取目标语言列表
const targetLangs = computed(() => videoGenerateInfo.value?.targetLanguageInfos.map(({ zhLanguage: label, id: value }) => ({ label, value })))

// 计算属性，用于获取目标语言信息
const targetLang = computed(() => videoGenerateInfo.value?.targetLanguageInfos.find(item => item.id === form.targetLanguageId))

// 计算属性，用于获取配音列表
const dubs = computed(() => {
  let target: Dub[] | undefined
  const id = targetLang.value?.language
  if (id) target = videoGenerateInfo.value?.timbreInfosGroupedByLanguage[id]
  return target
})

// 定义变量，用于存储视频URL
const videoUrl = ref('')

// 定义并初始化进度对象
const progress = reactive({
  uploading: false,
  percent: 0,
  status: 'default' as Status,
  desc: '就绪'
})

// 定义变量，用于存储预估价格
const estimatedPrice = ref(0)

// 计算属性，用于监控是否进行预估
const isEstimated = computed<[string, number, undefined | number]>(() => [form.sourceUrl, form.subtitleEnable, form.timbreId])

// 使用localStorage存储视频翻译进度
const progressPercent = useLocalStorage('video-translation-progress', 0)

// 异步获取视频生成信息
getVideoGenerateInfo().then((res) => videoGenerateInfo.value = res)

// 翻译功能主函数
function onTranslate() {
  // 如果视频源URL为空，提示上传视频文件
  if (!form.sourceUrl) message.error('请上传视频文件')
  // 验证表单数据
  refForm.value?.validate(errors => {
    if (!errors) {
      // 创建视频任务并处理任务状态
      createVideoTask(form as any).then(({ orderId }) => {
        const timer = setInterval(() => getTaskOrderStatus({ orderId }).then(res => {
          const status = +res.status
          progress.desc = res.statusDesc
          progress.status = (['info', 'success', 'error', 'warning', 'default'].at(status) ?? 'default') as Status
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

// 上传完成后的处理函数
function onUploadFinish(e: any) {
  const { relativePath, absolutePath } = JSON.parse(e.event.target?.response)
  videoUrl.value = absolutePath
  form.sourceUrl = relativePath
  progress.uploading = false
}

// 监听预估相关参数变化，更新预估价格
watch(isEstimated, ([sourceUrl, subtitleEnable, timbreId]) => {
  sourceUrl && timbreId &&
    getEstimatedPrice({ sourceUrl, subtitleEnable, timbreId }).then(res => estimatedPrice.value = res.price)
})
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
      <!-- <video v-if="videoUrl" h-full w-full
        src="http://60.205.115.52:8082/api/v1/video/mp4/7d9fa309-80ce-48e7-b534-db0337cd3e3d.mp4"></video> -->
      <div @click="$router.push({ name: 'download-center' })" grid-center class="rd-8px" text-white bg-black h-full
        w-full>
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
      预计消耗积分：{{ estimatedPrice }}
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