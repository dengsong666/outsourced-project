<script lang='ts' setup>
import { contractOther } from '@/apis'
import { useCommon } from '@/store'
import { copy, inform } from '@/utils'


const { defaultAvatar, config } = useCommon()
const emit = defineEmits(['update'])
withDefaults(defineProps<{
  id: number
  tips?: boolean
  type: 1 | 2 | 3 | 4 | 5 | 6, // 1-被钓走的鱼，2-钓到的鱼，3-我的投稿，4-联系比稿作者；5-联系投稿者，6-预留，业务还要处理预留逻辑；默认1
  color?: string
}>(), {
  color: '#3A69F5',
})
const author = reactive({
  show: false,
  value: {} as any
})
/**
 * 联系作者
 * @param worksId 
 */
async function onContact(worksId: number, contactType: 1 | 2 | 3 | 4 | 5 | 6) {
  author.value = await contractOther({ worksId, contactType })
  author.show = true
  // contactType == 6 && inform('预留作品')
  // emit('update')
}
</script>

<script lang='ts'>
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<template>
  <Modal v-if="tips" @confirm="onContact(id, type)" :confirm="{ color }" cancel>
    <slot></slot>
    <template #content>
      获取对方信息，需支付 <text :style="`color:${color} ;`">{{ config.reserveCostFishHookNum }}</text> 鱼钩给ta
    </template>
  </Modal>
  <div v-else @click="onContact(id, type)">
    <slot></slot>
  </div>
  <tn-popup v-model="author.show" @close="type == 6 && inform('预留作品'), emit('update')">
    <div class="relative flex-col mx--16px w340px h170px c-#262B2F">
      <img class="absolute left-0 right-0 z--1"
        src="https://file.fishyoumusic.top/source/c323e6fe-5e21-4728-bcb1-43d8cab73548.png" alt="">
      <h3 class="mt30px text-center mb14px text-16px">作者信息</h3>
      <div class="flex-row mx24px">
        <img class="w64px h64px rd-50%" :src="author.value?.avatar || defaultAvatar" alt="">
        <div class="flex-col justify-center gap-4px ml10px font-500 flex-1">
          <text>昵&emsp;{{ [3, 4].includes(type) ? '&emsp;' : '' }}称：{{ author.value?.nickName }}</text>
          <text v-if="![3, 4].includes(type)" class="my4px">手机号：{{ author.value?.phone }}
            <text :style="`background-color:${color} ;`" class="float-right c-#fff rd-6px px8px py1px" @click="copy(author.value?.phone, '手机号')">复制</text>
          </text>
          <text>{{ [3, 4].includes(type) ? '联系方式' : '微信号' }}：{{ author.value?.contact }}
            <text :style="`background-color:${color} ;`" class="float-right c-#fff rd-6px px8px py1px" @click="copy(author.value?.contact, '微信号')">复制</text>
          </text>
        </div>
      </div>
    </div>
  </tn-popup>
</template>

<style scoped lang='scss'></style>