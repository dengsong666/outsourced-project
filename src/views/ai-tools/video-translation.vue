<script lang='ts' setup>
const form = reactive({
  initlang: '',
  targetlang: '',
  dub: '',
  bgm: '',
  subtitle: ''
})
const showTips = ref(false)
const rules = {
  initlang: [
    { required: true, message: '请选择初始语言' }
  ],
  targetlang: [
    { required: true, message: '请选择目标语言' }
  ],
  dub: [
    { required: true, message: '请输入配音' }
  ],
  bgm: [
    { required: true, message: '请输入背景音' }
  ],
  subtitle: [
    { required: true, message: '请输入生成字幕' }
  ]
}
const yesOrNo = [
  { label: '是', value: '1' },
  { label: '否', value: '0' }
]
const langs = [
  { label: '中文', value: 'zh-CN' },
  { label: '英语', value: 'en-US' },
  { label: '日语', value: 'ja-JP' },
  { label: '韩语', value: 'ko-KR' },
  { label: '法语', value: 'fr-FR' },
  { label: '西班牙语', value: 'es-ES' },
  { label: '德语', value: 'de-DE' },
  { label: '俄语', value: 'ru-RU' },
  { label: '葡萄牙语', value: 'pt-PT' },
  { label: '越南语', value: 'vi-VN' },
  { label: '印尼语', value: 'id-ID' },
  { label: '马来语', value: 'ms-MY' },
  { label: '泰语', value: 'th-TH' },
  { label: '阿拉伯语', value: 'ar-EG' },
  { label: '希伯来语', value: 'he-IL' },
]
function onTranslate() { }
</script>

<template>
  <div flex justify-between items-center class="rd-16px bg-gray-200" p24px>
    <n-upload ref="upload" action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :default-upload="false">
      <div grid-center class="rd-8px" text-white bg-black w200px h160px><i w80px h80px i-custom-upload></i></div>
    </n-upload>
    <n-progress type="line" :percentage="30" rail-color="white" indicator-placement="inside" />
    <n-upload ref="upload" action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" :default-upload="false">
      <div grid-center class="rd-8px" text-white bg-black w200px h160px><i w80px h80px i-custom-download></i></div>
    </n-upload>
  </div>
  <n-form ref="formRef" :label-width="80" :model="form" :rules="rules" label-align="left" label-placement="left" mt24px>
    <n-form-item label="初始语言" path="initlang">
      <n-select v-model:value="form.initlang" :options="langs" />
    </n-form-item>
    <n-form-item label="目标语言" path="targetlang">
      <n-select v-model:value="form.targetlang" :options="langs" />
    </n-form-item>
    <n-form-item label="配音" path="dub">
      <n-radio-group v-model:value="form.dub">
        <n-radio v-for="item in yesOrNo" :key="item.value" :value="item.value">
          {{ item.label }}
        </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="背景音" path="bgm">
      <n-radio-group v-model:value="form.bgm">
        <n-radio v-for="item in yesOrNo" :key="item.value" :value="item.value">
          {{ item.label }}
        </n-radio>
      </n-radio-group>
    </n-form-item>
    <n-form-item label="生成字幕" path="subtitle">
      <n-radio-group v-model:value="form.subtitle">
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
      积分余额：1000
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
:deep(.n-upload) {
  text-align: center;
}

:deep(.n-form-item-label__text) {
  text-align-last: justify;
}
</style>