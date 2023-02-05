<script setup lang="ts">
import Info from './Info.vue'
const infoForm = reactive({
  name: '张三',
  company: '正泰电力服务有限公司',
  phone: '13612341234',
  email: 'zhangsan@163.com'
})
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  _newPassword: ''
})
</script>

<template>
  <div class="flex-row h100%">
    <Info />
    <div class="flex-1 mx24px box">
      <p>
        <span class="border mr24px"></span>
        <span>编辑资料</span>
      </p>
      <a-form :model="infoForm" name="info" :label-col="{ span: 4, push: 1 }" label-align="left" :colon="false">
        <a-form-item label="用户名" name="name">
          <a-input v-model:value="infoForm.name" disabled />
        </a-form-item>
        <a-form-item label="所属公司" name="company">
          <a-input v-model:value="infoForm.company" disabled />
        </a-form-item>
        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="infoForm.phone" />
        </a-form-item>
        <a-form-item label="邮箱" name="email">
          <a-input v-model:value="infoForm.email" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 4, span: 20 }" class="flex-row justify-evenly">
          <a-button type="primary" class="btn-cancel">取消</a-button>
          <a-button type="primary" html-type="submit" class="btn-save">保存</a-button>
        </a-form-item>
      </a-form>
      <p>
        <span class="border mr24px"></span>
        <span>重置密码</span>
      </p>
      <a-form :model="passwordForm" name="password" :label-col="{ span: 4, push: 1 }" label-align="left" :colon="false">
        <a-form-item label="旧密码" name="oldPassword">
          <a-input v-model:value="passwordForm.oldPassword" placeholder="请输入旧密码" />
        </a-form-item>
        <a-form-item label="新密码" name="newPassword">
          <a-input v-model:value="passwordForm.newPassword" placeholder="请输入新密码" />
        </a-form-item>
        <a-form-item label="确认密码" name="_newPassword">
          <a-input v-model:value="passwordForm._newPassword" placeholder="请再次输入新密码" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 4, span: 20 }" class="flex-row justify-evenly">
          <a-button type="primary" class="btn-cancel">取消</a-button>
          <a-button type="primary" html-type="submit" class="btn-save">保存</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.border {
  border: 4px solid;
  border-color: transparent #363b64 transparent transparent;
  border-radius: 4px;
}
p {
  font-size: 24px;
  font-weight: 600;
  padding: 8px 48px;
  border-bottom: 2px solid #a098ae;
  color: #363b64;
}
.ant-form {
  width: 600px;
  :deep(.ant-form-item-control-input-content) {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
