<script setup lang="ts">
const userForm = reactive({
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

function handleSubmit() {
  console.log(userForm)
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
        <a-select-option value="agent">代理商</a-select-option>
        <a-select-option value="role2">系统租户</a-select-option>
        <a-select-option value="role3">系统管理员</a-select-option>
        <a-select-option value="role4">角色4</a-select-option>
        <a-select-option value="role5">角色5</a-select-option>
        <a-select-option value="role6">角色6</a-select-option>
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
