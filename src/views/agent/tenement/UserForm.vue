<script setup lang="ts">
import { addProductUser, getProductRoleList, updateProductUser } from '@/api'
import { mergeObj } from '@/utils'
const props = defineProps<{
  data: any
}>()
console.log(props.data)

const userForm = reactive({
  id: '',
  account: '',
  nick_name: '',
  major: '',
  position: '',
  avatar: '',
  password: '',
  email: '',
  telephone: '',
  role_id: 0,
  tenant_id: '',
  product_id: 0
})
mergeObj(userForm, props.data)
const { data } = await getProductRoleList({ tenant_id: userForm.tenant_id, product_id: userForm.product_id })
const emit = defineEmits(['submit'])
async function handleSubmit() {
  console.log(userForm)
  await (userForm.id ? updateProductUser(userForm) : addProductUser(userForm))
  emit('submit')
}
</script>

<template>
  <a-form :model="userForm" name="basic" class="m16px">
    <a-form-item name="avatar">
      <Avatar />
    </a-form-item>
    <a-form-item name="username">
      <a-input v-model:value="userForm.account" placeholder="用户名" />
    </a-form-item>
    <a-form-item name="name">
      <a-input v-model:value="userForm.nick_name" placeholder="姓名" />
    </a-form-item>
    <a-form-item name="password">
      <a-input v-model:value="userForm.password" type="password" placeholder="密码" />
    </a-form-item>
    <a-form-item name="phone">
      <a-input v-model:value="userForm.telephone" placeholder="电话" />
    </a-form-item>
    <a-form-item name="email">
      <a-input v-model:value="userForm.email" placeholder="邮箱" />
    </a-form-item>
    <a-form-item name="role">
      <a-select v-model:value="userForm.role_id" placeholder="角色">
        <a-select-option v-for="role in data.list" :value="role.id">{{ role.name }}</a-select-option>
      </a-select>
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
