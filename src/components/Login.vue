<script lang='ts' setup>
import { useUser } from '@/store';
import { byCodeLogin, getWeChatQR, sendCode } from '@/apis';
import { FormInst, FormRules } from 'naive-ui';
import { delStorage } from '@/utils';
const user = useUser();
const form = reactive({
  phone: '18161246504',
  code: '',
})
const wechatQR = ref()
const refForm = ref<FormInst>()
const autoLogin = useLocalStorage('autoLogin', false)
const rules: FormRules = {
  phone: { key: 'phone', required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
  code: { required: true, len: 6, message: '请输入正确的验证码', trigger: 'blur' },
}
const isGetCode = ref(false)
function onGetCode() {
  refForm.value?.validate((errors) => {
    errors || sendCode({ phone: form.phone }).then(res => isGetCode.value = true)
  }, rule => rule.key === 'phone')
}
function onLogin() {
  refForm.value?.validate((errors) => {
    errors || byCodeLogin(form).then(res => {
      user.token = res.token
      user.showLogin = false
      user.init()
    })
  })
}
function onGetQR(tab: string, accessPage) {
  tab === 'wechat' && getWeChatQR({ accessPage }).then(res => {
    wechatQR.value = res.weQrUrl
  })
}
watchEffect(() => {
  if (user.token) {
    sessionStorage.setItem('token', user.token)
    autoLogin.value && localStorage.setItem('token', user.token)
  } else {
    user.userinfo = null
    delStorage('token')
  }
})
// https://cloud.tencent.com/developer/article/1677630
</script>

<template>
  <n-modal v-modelshow="user.showLogin" preset="card" md:w600px w90vw>
    <n-tabs default-value="code" size="large" justify-content="space-evenly"
      @update:value="onGetQR($event, $route.path)">
      <n-tab-pane name="code" tab="验证码登录">
        <n-form ref="refForm" :model="form" :rules="rules" label-placement="left">
          <n-form-item path="phone">
            <n-input placeholder="请输入手机号" v-model:value="form.phone" />
          </n-form-item>
          <n-form-item path="code">
            <n-input placeholder="请输入验证码" v-model:value="form.code" />
            <div flex-basis-8em flex-shrink-0 text-center>
              <n-countdown v-if="isGetCode" :render="v => `${String(v.seconds).padStart(2, '0')}秒`"
                :duration="59 * 1000" :active="isGetCode" @finish="isGetCode = false" />
              <n-button v-else float-right type="primary" @click="onGetCode">验证码</n-button>
            </div>
          </n-form-item>
          <n-form-item>
            <n-checkbox v-model:checked="autoLogin">
              <n-popover trigger="hover">
                <template #trigger>下次自动登录</template>
                <span>关闭标签页/浏览器后，24h内无需再次手动登录</span>
              </n-popover>
            </n-checkbox>
            <span text-gray mlauto>没有注册自动注册</span>
          </n-form-item>
        </n-form>
        <n-button type="primary" block strong @click="onLogin"> 登录 </n-button>
      </n-tab-pane>
      <n-tab-pane name="wechat" tab="微信登录">
        <div text-center>
          <img md:w200px md:h200px :src="wechatQR" alt="">
        </div>
      </n-tab-pane>
    </n-tabs>
    <p text-center text-12px text-gray my16px>注册登录即代表已同意
      <router-link to="/user/content#protocol">《用户协议》</router-link> 和
      <router-link to="/user/content#privacy">《隐私政策》</router-link>
    </p>
  </n-modal>
</template>

<style scoped lang='scss'></style>