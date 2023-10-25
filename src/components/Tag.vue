<script lang='ts' setup>
withDefaults(defineProps<{
  modelValue: number[]
  title: string
  options: { id: number, name: string }[]
  name?: string
  type?: 'checkbox' | 'select'
  limit?: number
}>(), {
  type: 'checkbox',
  limit: 1
})
const popup_show = ref(false)
</script>

<script lang='ts'>
export default {
  options: {
    styleIsolation: 'shared'
  }
}
</script>

<template>
  <div class="flex-row items-center p8px">
    <div class="flex-row flex-wrap flex-1" @click="popup_show = true, $emit('show')">
      <template v-if="modelValue.length">
        <text v-for="item in options.filter(item => modelValue.includes(item.id))" :key="item.id"
          class="relative text-center inline-block px12px py6px c-default bg-default/5 rd-8px min-w-3em mr12px my6px"
          border="b-1">{{ item.name }}
          <text class="iconfont icon-close absolute right--12px top-0 translate--50% c-#989eb3"
            @click.stop="$emit('update:modelValue', modelValue.filter(v => v != item.id))" />
        </text>
      </template>
      <text v-else class="c-#989EB3 ml-16rpx">请选择{{ name }}</text>
    </div>
    <text class="iconfont icon-add bg-default c-#fff p4px rd-4px" @click="popup_show = true" />
  </div>
  <tn-popup v-model="popup_show" open-direction="bottom">
    <div class="flex-row justify-between my 16px">
      <text class="c-#989EB3" @click="popup_show = false, $emit('update:modelValue', [])">取消</text>
      <text class="text-17px font-500">{{ title }}</text>
      <text class="c-default font-500" @click="popup_show = false">确定</text>
    </div>
    <tn-checkbox-group v-if="type == 'checkbox'" class="c py20px" :model-value="modelValue" :max="limit"
      @change="$emit('update:modelValue', $event)">
      <tn-checkbox v-for="item in options" :key="item.id" :label="item.id">
        {{ item.name }}
      </tn-checkbox>
    </tn-checkbox-group>
    <template v-else>
      <button v-for="item in options" :key="item.id" class="flex-row justify-between px16px py14px"
        border="b-1 b-#eee b-solid"
        @click="$emit('update:modelValue', modelValue.includes(item.id) ? modelValue.filter(i => i != item.id) : modelValue.concat(item.id))"
        :disabled="modelValue.length === limit && !modelValue.includes(item.id)">
        <text class="text-14px">{{ item.name }}</text>
        <text v-show="modelValue.includes(item.id)" class="iconfont icon-radio-selected c-default" />
      </button>
    </template>
  </tn-popup>
</template>

<style scoped lang='scss'>
button {
  line-height: 1em;
  background-color: #fff;
}
</style>