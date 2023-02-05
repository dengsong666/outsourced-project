<script setup lang="ts">
import Avatar from '../../../components/Avatar.vue'

const settings = reactive({
  company_name: '正泰电力服务有限公司',
  for_short: '',
  province: '',
  city: '',
  area: '',
  street: '',
  longitude_and_latitude: '',
  description: ''
})
</script>

<template>
  <a-form :model="settings" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" layout="vertical">
    <a-row :gutter="[16, 16]">
      <a-col :span="10">
        <a-form-item label="公司名称" name="company_name">
          <a-input v-model:value="settings.company_name" disabled />
        </a-form-item>
        <a-form-item label="简称" name="for_short">
          <a-input v-model:value="settings.for_short" />
        </a-form-item>
      </a-col>
      <a-col :span="2">
        <Avatar />
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :span="10">
        <a-form-item label="所在省市">
          <Province v-model:province="settings.province" v-model:city="settings.city" v-model:area="settings.area" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :span="10">
        <a-form-item label="街道地址" name="街道地址">
          <a-input v-model:value="settings.street" />
        </a-form-item>
      </a-col>
      <a-col :span="6" :pull="2">
        <a-form-item label="经纬度" name="经纬度">
          <a-input v-model:value="settings.longitude_and_latitude" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col :span="18">
        <a-form-item label="描述" name="描述">
          <a-textarea v-model:value="settings.description" />
        </a-form-item>
      </a-col>
    </a-row>

    <a-form-item :wrapper-col="{ offset: 22 }">
      <a-button type="primary" html-type="submit" class="btn">
        <template #icon>
          <i class="i-ant-design-tag-outlined" />
        </template>
        保存
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style lang="scss" scoped>
.ant-form {
  z-index: 1;
  border-radius: 20px;
  padding: 48px;
  background: #fcfcfc;
  height: 100%;
  // box-shadow: 0px 20px 50px 0px #bf156c;
}
</style>
