<script setup lang="ts">
import { createMap } from './map'
import { provincialCapital } from './city'
const dashboard = [
  { name: '代理商', number: 932, compare: 15, icon: 'usergroup-add-outlined' },
  { name: '租户', number: 2344, compare: 43, icon: 'user-outlined' },
  { name: '待加盟商', number: 123, compare: 12, icon: 'info-circle-outlined' },
  { name: '用户总数', number: 435, compare: -35, icon: 'like-outlined' }
]
const tenement_top = [
  { company: '苏州钢铁股份有限公司', number: 324, compare: 51 },
  { company: '上海钢铁股份有限公司', number: 23, compare: -40 },
  { company: '山东钢铁股份有限公司', number: 56, compare: 23 },
  { company: '山东钢铁股份有限公司', number: 56, compare: 23 }
]
const agentMap = provincialCapital.map(({ value }) => ({ name: `${parseInt(`${Math.random() * 200}`)}`, value }))
const compareTo = (c: number) => `<span class="${c > 0 ? 'c-#4CBC9A' : 'c-#FE8289'}">${c > 0 ? `+${c}` : c}%</span>`
onMounted(() => nextTick(() => createMap('#map', agentMap)))
</script>

<template>
  <div class="grid-layout">
    <div class="grid-item1 box">
      <Search />
      <div class="flex-row items-center" v-for="{ name, number, compare, icon } in dashboard">
        <span class="icon"><i :class="`i-ant-design-${icon}`"></i></span>
        <div class="flex-col">
          <span class="text-18px c-#a098ae">{{ name }}</span>
          <span class="text-36px font-700 c-#363b64">{{ number }}</span>
          <span class="text-12px c-#a098ae"
            >较上年
            <span v-html="compareTo(compare)" />
          </span>
        </div>
      </div>
    </div>
    <div class="grid-item2 box h100%">
      <p class="text-24px font-700 lh-40px">代理商地域分布</p>
      <div id="map" class="w100% h-[calc(100%-40px)]"></div>
    </div>
    <div class="grid-item3">
      <p class="text-24px font-700 lh-40px">代理商租户Top榜</p>
      <a-list item-layout="horizontal" :data-source="tenement_top" class="h-[calc(100%-40px)] overflow-y-scroll">
        <template #renderItem="{ item, index }">
          <a-list-item>
            <a-skeleton avatar :title="true" :loading="false" active>
              <a-list-item-meta>
                <template #title>
                  <span>{{ item.company }}</span>
                </template>
                <template #avatar>
                  <span class="flex-center w50px h50px rd-20px bg-#FE9874 text-24px font-600 c-#fff">{{ index + 1 }}</span>
                </template>
              </a-list-item-meta>
              <div class="flex-col">
                <span class="text-18px font-600">{{ item.number }}</span>
                <span class="relative left--6px" v-html="compareTo(item.compare)" />
              </div>
            </a-skeleton>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 48px;
  height: 100%;
  .grid-item1 {
    grid-area: 1 / 1 / 2 / 4;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    .icon {
      display: table;
      place-items: center;
      padding: 16px;
      border: 1px solid #a098ae;
      border-radius: 20px;
      height: min-content;
      margin: 16px;
    }
  }
  .grid-item2 {
    grid-area: 2 / 1 / 5 / 4;
  }
  .grid-item3 {
    grid-area: 1 / 4 / 5 / 5;
  }
}
.ant-list-item-meta {
  align-items: stretch;
  :deep(.ant-list-item-meta-title) {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
.search-box {
  position: absolute;
  width: unset;
  right: 0;
  margin-right: 0;
  transform: translateY(-125%);
}
</style>
