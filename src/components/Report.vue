<script lang='ts' setup>
import { getReportList, setReport } from '@/apis'
const props = withDefaults(defineProps<{
  modelValue: boolean
  worksId: number
  type: 1 | 2 | 3 //1-举报作品，2-举报比稿，3-举报被调走的鱼
  showType?: 0 | 1 | 2 // 0-作品处，1-比稿处，2-人；默认0	
  color?: string
  reason?: boolean
}>(), {
  color: '#3A69F5',
  showType: 0
})

const emit = defineEmits(['update:modelValue'])
const report = reactive({
  list: [] as any[],
  reason: '',
  other: '',
})
/**
 * 举报
 */
async function onReport() {
  const reason = report.reason == '其他' ? report.other : report.reason
  const { type, worksId } = props
  console.log(type, worksId)
  const { success } = await setReport({ worksId, type, reason })
}
watch(() => props.modelValue, async val => {
  if (val) {
    const { dataList } = await getReportList({ showType: props.showType, pageNum: 1, pageSize: 100 })
    report.list = dataList
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
  <!-- 受ui库swiper组件的transform影响，本应用举报弹窗不适合modal -->
  <tn-popup :model-value="modelValue" @close="emit('update:modelValue', false)">
    <div class="py16px">
      <p class="iconfont icon-warning c-#faad14 text-24px text-center mb10px"></p>
      <h3 class="text-16px font-500 text-center c-#000">举报原因</h3>
      <div class="my20px c-#333 w100%">
        <tn-radio-group v-model="report.reason">
          <tn-radio v-for="item in report.list" :key="item.id" :label="item.description">
            {{ item.description }}
          </tn-radio>
          <tn-radio label="其他">其他</tn-radio>
        </tn-radio-group>
        <tn-input class="reason" v-show="report.reason == '其他'" type="textarea" v-model="report.other" height="200"
          placeholder="请输入举报原因" />
      </div>
      <div class="flex-row justify-center items-center gap-16px">
        <text class="w50% c-#000 bg-#F4F4F4 rd-8px p8px text-center nowrap-e inline-block"
          @click="emit('update:modelValue', false)">取消</text>
        <text class="w50% c-#fff rd-8px p8px text-center nowrap-e inline-block"
          :style="`background-color:${color || '#3A69F5'}`" @click="emit('update:modelValue', false), onReport">确定
        </text>
      </div>
    </div>
  </tn-popup>
</template>

<style scoped lang='scss'>
:deep(.tn-radio-group) {
  display: flex;
  flex-direction: column;
}

:deep(.tn-radio__dot--selected) {
  background-color: v-bind(color) !important;
}

:deep(.tn-radio__content--right) {
  color: #000 !important;
}

:deep(.tn-popup__content) {
  width: 70% !important;
}
</style>