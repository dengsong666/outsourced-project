<script lang="ts" setup>
interface Select {
  title: string;
  options: { label: string; value: any }[];
  value?: any;
}
const props = defineProps<{
  top: string;
  select?: Select;
  radio?: Select;
  checkbox?: Select;
}>();
const emit = defineEmits(["confirm"]);
const show = ref(false);
function initForm() {
  return {
    select: props.select?.value,
    radio: props.radio?.value,
    checkbox: props.checkbox?.value,
  };
}

const form = reactive(initForm());
function onSubmit(reset = false) {
  if (reset) {
    Object.assign(form, initForm());
    emit("confirm", form);
    return;
  }
  emit("confirm", form);
  show.value = false;
}
</script>

<script lang="ts">
export default {
  options: {
    styleIsolation: "shared",
  },
};
</script>

<template>
  <div @click="show = true">
    <slot />
  </div>
  <tn-popup v-model="show" radius="16" open-direction="top" @close="show = false">
    <div class="px16px c">
      <!-- 选择 -->
      <template v-if="select?.options?.length">
        <h3 class="text-16px font-500 my14px">
          <slot name="selectTitle">
            {{ select.title }}
          </slot>
        </h3>
        <div v-for="item in select?.options" :key="item.value" class="flex-row items-center justify-between py14px"
          border="b-1 b-#eee b-solid" @click="form.select = item.value as any">
          <text>{{ item.label }}</text>
          <text v-show="form.select === item.value" class="iconfont icon-radio-selected c-default" />
        </div>
      </template>
      <!-- 单选框 -->
      <template v-if="radio?.options?.length">
        <h3 class="text-16px font-500 my14px">
          <slot name="radioTitle">
            {{ radio.title }}
          </slot>
        </h3>
        <tn-radio-group v-model="form.radio">
          <tn-radio v-for="item in radio?.options" :key="item.value" :label="item.value" border>
            {{ item.label }}
          </tn-radio>
        </tn-radio-group>
      </template>
      <!-- 复选框 -->
      <template v-if="checkbox?.options?.length">
        <h3 class="flex-row text-16px font-500 my14px">
          <slot name="checkboxTitle">
            {{ checkbox.title }}
          </slot>
        </h3>
        <tn-checkbox-group v-model="form.checkbox" class="select-checkbox-group">
          <tn-checkbox v-for="item in checkbox?.options" :key="item.value" :label="item.value">
            {{ item.label }}
          </tn-checkbox>
        </tn-checkbox-group>
      </template>
    </div>
    <div class="flex-row">
      <span class="bg-#fff p16px flex-1 text-center" @click="onSubmit(true)">重置</span>
      <span class="bg-#2765F1 p16px flex-1 text-center c-#fff" @click="onSubmit()">
        确定
      </span>
    </div>
  </tn-popup>
</template>

<style scoped lang="scss">
:deep(.tn-popup) {
  top: v-bind(top) !important;

  .tn-popup__content {
    padding: 0;

    .tn-checkbox-group {
      overflow-y: auto;
      max-height: 200px;
    }
  }

  .tn-overlay {
    top: 220px !important;
  }
}
</style>
