<script setup lang="ts">
import { moneyFormat, MyChart } from '@/utils'
import { histogramOption, smoothLineOption, lineTrendOption } from './chart'
import avatar from '@/assets/avatar.png'
const expire_tenement = [
  { avatar, company: '苏州钢铁股份有限公司', tenancy_term: '2022-12-14 2023-5-14', surplus_term: 30, color: '#fe8289' },
  { avatar, company: '上海钢铁股份有限公司', tenancy_term: '2022-12-17 2023-5-17', surplus_term: 60, color: '#fe9874' },
  { avatar, company: '山东钢铁股份有限公司', tenancy_term: '2022-12-14 2023-5-14', surplus_term: 90, colr: '#70504b' }
]
const up_down = reactive({
  up: '#4CBC9A',
  down: '#FE8289'
})
onMounted(() => {
  nextTick(() => {
    MyChart.create('#active-line', smoothLineOption([23, 56, 123, 80, 100, 150, 128], up_down.up))
    MyChart.create('#active-histogram', histogramOption([23, 56, 123, 80, 100, 150, 128], '#FE9874'))
    MyChart.create('#pv-line', smoothLineOption([160, 80, 100, 123, 30, 50, 45], up_down.down))
    MyChart.create('#pv-histogram', histogramOption([160, 80, 100, 123, 30, 50, 45], '#70504B'))
    MyChart.create(
      '#trend-line',
      lineTrendOption(
        [
          [12, 19, 6, 25, 36, 50, 12, 44, 23, 12, 68, 50],
          [2, 14, 22, 21, 13, 63, 34, 20, 25, 30, 40, 30]
        ],
        ['9月份', '10月份', '11月份', '12月份', '1月份', '2月份', '3月份', '4月份', '5月份', '6月份', '7月份', '8月份']
      )
    )
  })
})
</script>

<template>
  <div class="grid-box">
    <div class="div1 bg-#535478! c-#fff">
      <p>租户</p>
      <p class="text-18px">余额</p>
      <span class="text-36px font-600">${{ moneyFormat(354657) }}</span>
      <div class="border-box left--12px bottom-20px"></div>
      <div class="border-box left--44px bottom--4px"></div>
      <div class="flex-row items-center mt-auto">
        <span class="text-64px">. . . . . . . . . . . </span>
        <div class="relative flex-col text-24px top-28px left-16px">
          <span class="text-16px">有效日期</span>
          <span class="font-700 lh-16px">2022</span>
          <span class="font-700 relative left-24px top--12px">03/21</span>
        </div>
      </div>
    </div>
    <div class="div2">
      <div class="flex-row">
        <div>
          <p>活跃</p>
          <p class="flex-row">
            <span class="text-36px font-600 mr16px">${{ moneyFormat(2348) }}</span>
            <span class="flex-col justify-center" :style="`color:${up_down.up}`">
              <i class="i-ant-design-caret-up-outlined"></i>
              <span nowrap>+ 15%</span>
            </span>
          </p>
        </div>
        <div id="active-line" class="w100% h150px"></div>
      </div>
      <div id="active-histogram" class="w100% h-[calc(100%-150px)]"></div>
    </div>
    <div class="div3">
      <div class="flex-row">
        <div>
          <p>访问量</p>
          <p class="flex-row">
            <span class="text-36px font-600 mr16px">${{ moneyFormat(5434) }}</span>
            <span class="flex-col justify-center" :style="`color:${up_down.down}`">
              <i class="i-ant-design-caret-down-outlined"></i>
              <span nowrap>- 20%</span>
            </span>
          </p>
        </div>
        <div id="pv-line" class="w100% h150px"></div>
      </div>
      <div id="pv-histogram" class="w100% h-[calc(100%-150px)]"></div>
    </div>
    <div class="div4">
      <div id="trend-line" class="wh-100%"></div>
    </div>
    <div class="div5">
      <p>最近租户到期</p>
      <a-list item-layout="horizontal" :data-source="expire_tenement" class="h-[calc(100%-40px)] overflow-y-scroll">
        <template #renderItem="{ item: { tenancy_term, company, avatar, surplus_term, color } }">
          <a-list-item>
            <a-skeleton avatar :title="false" :loading="false" active>
              <a-list-item-meta :description="tenancy_term">
                <template #title>
                  <span>{{ company }}</span>
                </template>
                <template #avatar>
                  <a-avatar :src="avatar" />
                </template>
              </a-list-item-meta>
              <div :style="{ color }" font-700>{{ surplus_term }}天</div>
            </a-skeleton>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: calc(50% - 32px) calc(50% - 32px);
  gap: 40px;
  height: 100%;
  & > div {
    position: relative;
    padding: 24px;
    border-radius: 20px;
    background-color: #fff;
    z-index: 1;
    & p:first-child {
      line-height: 40px;
      font-size: 24px;
      font-weight: 700;
    }
  }
}

.div1 {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  grid-area: 1 / 1 / 2 / 2;
  .border-box {
    position: absolute;
    width: 160px;
    height: 160px;
    border-radius: 20px;
    border: 2px solid #acacbd;
    // z-index: -1;
  }
}
.div2 {
  grid-area: 1 / 2 / 2 / 3;
}
.div3 {
  grid-area: 1 / 3 / 2 / 4;
}
.div4 {
  grid-area: 2 / 1 / 3 / 3;
}
.div5 {
  grid-area: 2 / 3 / 3 / 4;
}
</style>
