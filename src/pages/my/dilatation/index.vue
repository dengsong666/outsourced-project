<script lang="ts" setup>
import { getVolPackageList, setVolPackage } from '@/apis'


const volume = reactive({
  total: 0,
  surplusPercent: 0,
  options: [] as FishTankPackage[],
  selected: 0
})

const w = computed(() => volume.surplusPercent * 0.88 == 88 ? '70%' : `${Math.sqrt(0.25 - Math.pow(Math.abs(50 - volume.surplusPercent * 0.88) / 100, 2)) * 2 * 100}%`)
const h = computed(() => volume.surplusPercent >= 50 ? '50px' : `${50 - Math.abs(50 - volume.surplusPercent)}px`)
const t = computed(() => volume.surplusPercent * 0.88 == 88 ? '12%' : `${100 - volume.surplusPercent * 0.88}%`)
const onclick = () => { }
onLoad(async (options) => {
  volume.surplusPercent = +(options?.percent ?? 0)
  volume.total = +(options?.total ?? 0)
  const { dataList } = await getVolPackageList()
  volume.options = dataList
})

async function onDilatation() {
  await setVolPackage({ fishTankPackageId: volume.selected })
}
</script>
<template>
  <Topbar back-text="扩容" place back-color />
  <Tips title="提示：您在鱼缸的作品、已存证文件均占用存储空间" />
  <h3 class="mt56px mb16px font-500 text-16px mxauto">当前鱼缸容量：{{ volume.total }}M</h3>
  <text class="bg-#F5F7FE px7px py5px rd-4px mxauto">剩余：{{ volume.surplusPercent }}%</text>
  <div class="aquarium-holder">
    <div class="aquarium"></div>
  </div>
  <tn-radio-group class='c' v-model="volume.selected">
    <tn-radio v-for="item in volume.options" :key="item.id" :label="item.id">
      <div class="flex-col">
        <text class="text-14px font-500">{{ item.name }}</text>
        <text class="text-12px text-center">消耗{{ item.fishhookNumber }}鱼钩</text>
      </div>
    </tn-radio>
  </tn-radio-group>
  <Modal class="mx16px" title="确认扩容吗？" @confirm="onDilatation" warning>
    <button class="btn" :disabled="!volume.selected" @click="onclick">
      确认扩容
    </button>
    <template #content>
      <text class="lh-32px font-500">当前容量剩余{{ volume.surplusPercent }}%</text>
      <tn-line-progress :percent="volume.surplusPercent" />
    </template>
  </Modal>
</template>


<style lang="scss" scoped>
:deep(.tn-radio-group) {
  padding: 16px;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.aquarium-holder {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 20px auto 0;
}

.aquarium {
  position: relative;
  width: 300px;
  height: 300px;
  border-bottom: 5px solid rgba(41, 74, 117, .1);
  border-left: 1px solid rgba(41, 74, 117, .1);
  border-right: 1px solid rgba(41, 74, 117, .1);
  border-top: 1px solid white;
  border-radius: 50%;
  background: #b5d5fe;
  background: linear-gradient(white v-bind(t), rgba(163, 232, 255, .4) v-bind(h), rgba(0, 156, 255, .5));
}


.aquarium::before,
.aquarium::after {
  content: "";
  position: absolute;
}

.aquarium::before {
  z-index: 2;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 70%;
  height: 50px;
  border-radius: 50%;
  border: 2px solid rgba(41, 74, 117, .1);
  border-top: 6px solid rgba(41, 74, 117, .1);
  border-bottom: 4px solid rgba(41, 74, 117, .1);
}

.aquarium::after {
  z-index: 1;
  left: 50%;
  width: v-bind(w);
  height: v-bind(h);
  top: v-bind(t);
  border-radius: 50%;
  background: #e6f6ff;
  outline: 1px solid transparent;
  border: 1px solid rgba(24, 50, 83, .1);
  transform: translate(-50%, -50%) rotate(0.5deg);
  animation: moveWater 1.4s ease-in-out infinite;
}

@keyframes moveWater {

  0%,
  100% {
    transform: translate(-50%, -50%) rotate(.3deg);
  }

  50% {
    transform: translate(-50%, -50%) rotate(-.3deg);
  }
}
</style>
<style lang="scss">
page {
  padding: 0;
  background-color: #fff;
}
</style>