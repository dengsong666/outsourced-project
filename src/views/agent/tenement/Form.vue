<script setup lang="ts">
import { addTenant, alterTenant } from '@/api'
import { useCommon } from '@/store'
import { mergeObj } from '@/utils'
import dayjs from 'dayjs'
const { data } = defineProps<{
  data: any
}>()

const [province = '', city = '', area = '', details = ''] = data?.form?.address?.split('-') ?? []
const address = reactive({ province, city, area, details })
const dateRange = ref<[dayjs.Dayjs, dayjs.Dayjs]>([dayjs(data?.form?.start_time), dayjs(data?.form?.end_time)])
const agentForm = reactive({
  id: '',
  name: '',
  nick_name: '',
  address: computed(() => {
    const { province, city, area, details } = address
    return [province, city, area, details].join('-')
  }),
  contacts: '',
  telephone: '',
  describe: '',
  photo: '',
  longitude_latitude: '',
  start_time: computed(() => +dayjs(dateRange.value[0])),
  end_time: computed(() => +dayjs(dateRange.value[1])),
  state: 1
})
const { bus } = useCommon()
const emit = defineEmits(['submit'])
console.log(agentForm, data?.form)

mergeObj(agentForm, data?.form, ['address', 'start_time', 'end_time'])

async function handleSubmit() {
  await (data ? alterTenant(agentForm) : addTenant(agentForm))
  // visible.value = false
  emit('submit')
  bus.emit('close')
}
</script>

<template>
  <a-form :model="agentForm" name="basic" class="m16px">
    <a-form-item name="avatar">
      <Avatar @file="" />
    </a-form-item>
    <a-form-item name="name">
      <a-input v-model:value="agentForm.name" placeholder="租户名称" />
    </a-form-item>
    <a-form-item name="for_short">
      <a-input v-model:value="agentForm.nick_name" placeholder="简称" />
    </a-form-item>
    <a-form-item>
      <Province v-model:province="address.province" v-model:city="address.city" v-model:area="address.area" />
    </a-form-item>
    <a-form-item name="address">
      <a-input v-model:value="address.details" placeholder="详细地址" />
    </a-form-item>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-form-item name="linkman">
          <a-input v-model:value="agentForm.contacts" placeholder="联系人" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item name="phone">
          <a-input v-model:value="agentForm.telephone" placeholder="联系电话" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item name="date_range">
      <a-range-picker v-model:value="dateRange" :placeholder="['开始时间', '结束时间']" />
    </a-form-item>
    <a-form-item name="description">
      <a-textarea v-model:value="agentForm.describe" placeholder="描述" :rows="4" />
    </a-form-item>
    <a-form-item name="state" label="状态" class="state">
      <a-switch v-model:checked="agentForm.state" :checked-value="1" :un-checked-value="2" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 20, span: 16 }" class="mb0!">
      <a-button @click="handleSubmit" type="primary" html-type="submit" class="btn-submit" size="large">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<style lang="scss" scoped>
.ant-form {
  padding: 32px;
  .state {
    background-color: #f4f9fd;
    padding: 16px;
    border-radius: 14px;
    :deep(.ant-form-item-control-input) {
      margin-left: auto;
    }
  }
}
</style>
