<script setup lang="ts">
const agentForm = reactive({
  name: '',
  for_short: '',
  province: '',
  city: '',
  area: '',
  address: '',
  linkman: '',
  phone: '',
  date_range: ['', ''] as [string, string],
  description: '',
  state: false
})

function handleSubmit() {
  console.log(agentForm)
}
</script>

<template>
  <a-form :model="agentForm" name="basic" class="m16px">
    <a-form-item name="avatar">
      <Avatar />
    </a-form-item>
    <a-form-item name="name">
      <a-input v-model:value="agentForm.name" placeholder="公司名称" />
    </a-form-item>
    <a-form-item name="for_short">
      <a-input v-model:value="agentForm.for_short" placeholder="公司简称" />
    </a-form-item>
    <a-form-item>
      <Province v-model:province="agentForm.province" v-model:city="agentForm.city" v-model:area="agentForm.area" />
    </a-form-item>
    <a-form-item name="address">
      <a-input v-model:value="agentForm.address" placeholder="详细地址" />
    </a-form-item>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-form-item name="linkman">
          <a-input v-model:value="agentForm.linkman" placeholder="联系人" />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item name="phone">
          <a-input v-model:value="agentForm.phone" placeholder="联系电话" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item name="date_range">
      <a-range-picker v-model:value="agentForm.date_range" :placeholder="['开始日期', '结束日期']" value-format="YYYY-MM-DD" />
    </a-form-item>
    <a-form-item name="description">
      <a-textarea v-model:value="agentForm.description" placeholder="描述" />
    </a-form-item>
    <a-form-item name="state" label="状态" class="state">
      <a-switch v-model:checked="agentForm.state" />
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
