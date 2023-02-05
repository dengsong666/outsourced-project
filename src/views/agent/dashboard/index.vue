<script setup lang="ts">
import { MyChart } from '@/utils'
import { histogramOption, smoothLineOption, lineTrendOption } from './chart'
import avatar from '@/assets/avatar.png'
const expire_tenement = [
  { avatar, company: '苏州钢铁股份有限公司', tenancy_term: '2022-12-14 2023-5-14', surplus_term: 30 },
  { avatar, company: '上海钢铁股份有限公司', tenancy_term: '2022-12-17 2023-5-17', surplus_term: 60 },
  { avatar, company: '山东钢铁股份有限公司', tenancy_term: '2022-12-14 2023-5-14', surplus_term: 90 }
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
      <p>余额</p>
      <span class="text-36px font-600">$234.34</span>
    </div>
    <div class="div2">
      <div class="flex-row">
        <div>
          <p>活跃</p>
          <p class="flex-row">
            <span class="text-36px font-600 mr16px">$234.34</span>
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
            <span class="text-36px font-600 mr16px">$54.34</span>
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
      <p mb0>租户活跃趋势</p>
      <div id="trend-line" class="h-[calc(100%-40px)] w100%"></div>
    </div>
    <div class="div5">
      <p>最近租户到期</p>
      <a-list item-layout="horizontal" :data-source="expire_tenement" class="h-[calc(100%-40px)] overflow-y-scroll">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-skeleton avatar :title="false" :loading="false" active>
              <a-list-item-meta :description="item.tenancy_term">
                <template #title>
                  <span>{{ item.company }}</span>
                </template>
                <template #avatar>
                  <a-avatar :src="item.avatar" />
                </template>
              </a-list-item-meta>
              <div>{{ item.surplus_term }}天</div>
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
  grid-area: 1 / 1 / 2 / 2;
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
