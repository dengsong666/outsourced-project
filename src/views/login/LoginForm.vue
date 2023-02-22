<script setup lang="ts">
import { login } from '@/api'
import { setLocalStorage } from '@/utils'

const router = useRouter()
const loginForm = reactive({
  account: 'admin',
  password: '1qaz2wsx'
})
const onFinish = async () => {
  const { data } = await login(loginForm)
  setLocalStorage('token', data)
  router.push('/tenement')
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <a-form :model="loginForm" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
    <a-form-item name="account">
      <a-input v-model:value="loginForm.account" placeholder="账户名称">
        <template #prefix>
          <i class="i-ant-design-user-outlined wh-16px" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item name="password">
      <a-input-password v-model:value="loginForm.password" placeholder="账户密码"
        ><template #prefix>
          <i class="i-ant-design-lock-outlined wh-16px" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 0, span: 24 }">
      <a-button type="primary" html-type="submit" class="w100% rd-16px bg-#4591e9">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<style lang="scss" scoped>
.ant-input-affix-wrapper {
  padding: 10px;
}
:deep(.ant-form-item-control) {
  max-width: 100%;
}
</style>
