<script lang="ts" setup>
import type { FormRules, TnFormInstance } from '@tuniao/tnui-vue3-uniapp'
import { getCode, loginByCode, loginByWechat } from '@/apis'
import { navTo, regexp, storage, showMsg } from '@/utils'
import { useCommon } from '@/store'
const common = useCommon()
const loginForm = reactive({
  phone: '',
  code: '',
  jsCode: '',
  jsCodeByPhone: '',
  agree: false,
})
const formRef = ref<TnFormInstance>()
const formRules: FormRules = {
  phone: [
    {
      message: '手机号格式不对',
      pattern: regexp.phone,
      trigger: 'blur',
    },
  ],
}
const code = reactive({
  isGet: true, // 是否获取过验证码
  isTimeEnd: false, // 验证码倒计时是否结束
})
/**
 * 登录
 * @param e 事件回调参数
 */
async function onLogin(e: any) {
  const { code } = await uni.login()
  loginForm.jsCodeByPhone = e?.detail?.code
  loginForm.jsCode = code
  new Promise(async (resolve, reject) => {
    // 一键登录
    if (loginForm.jsCodeByPhone) {
      const { token } = await loginByWechat(loginForm)
      token ? resolve(token) : reject()
    }
    // 验证码登录
    else {
      loginForm.agree || showMsg('请先勾选并同意协议')
      formRef.value?.validate(async (valid) => {
        if (valid) {
          const { token } = await loginByCode(loginForm)
          token ? resolve(token) : reject()
        }
      })
    }
  }).then(token => {
    storage.set('token', token)
    common.onGetUserInfo()
    uni.navigateBack({ delta: 2 })
  })
}
/**
 * 获取验证码
 */
async function onGetCode() {
  await getCode({ phone: loginForm.phone })
  code.isGet = false
}
</script>

<template>
  <img class="w100% h345px" src="https://file.fishyoumusic.top/source/af2feea1-c765-4e66-9afc-7ab3537ffe9a.png"
    alt="登录背景">
  <div class="flex-col rd-20px p16px relative top--48px bg-#fff">
    <span class="absolute right-16px top--32px c-#fff">功能介绍 ></span>
    <p class="text-24px font-500 my24px">
      你好，
    </p>
    <tn-form ref="formRef" :model="loginForm" :rules="formRules">
      <tn-form-item prop="phone" label="手机号">
        <tn-input v-model="loginForm.phone" placeholder="请输入手机号码">
          <template #prefix>
            <i class="iconfont icon-phone" />
          </template>
        </tn-input>
      </tn-form-item>
      <tn-form-item prop="code" label="验证码">
        <tn-input v-model="loginForm.code" placeholder="请输入验证码">
          <template #prefix>
            <i class="iconfont icon-code" />
          </template>
          <template #suffix>
            <span v-if="code.isGet" class="c-default nowrap" @click="onGetCode">
              {{ code.isTimeEnd ? '重新' : '' }}获取验证码</span>
            <span v-else class="c-default nowrap">
              <tn-count-down text-color="rgba(77, 107, 253, 1)" :time="59" :show-hour="false" :show-minute="false"
                @end="code.isTimeEnd = true, code.isGet = true" />s
            </span>
          </template>
        </tn-input>
      </tn-form-item>
    </tn-form>
    <tn-checkbox v-model="loginForm.agree" label-disabled>
      我已阅读并接受
      <span class="c-default" @click="navTo('/pages/my/set/protocol/index', { title: '用户协议' })">《用户协议》</span>
      和
      <span class="c-default" @click="navTo('/pages/my/set/protocol/index', { title: '隐私政策' })">《隐私协议》</span>
    </tn-checkbox>
    <!-- <tn-bubble-box :options="[{ text: '请先勾选并同意协议' }]" position="bottom">dddd</tn-bubble-box> -->
    <tn-button custom-class="disabled" :disabled="!loginForm.phone || !loginForm.code" @click="onLogin">
      登录
    </tn-button>
    <tn-button custom-class="mxauto" text-color="#666" text @getphonenumber="onLogin"
      @click="loginForm.agree || showMsg('请先勾选并同意协议')" :open-type="loginForm.agree && 'getPhoneNumber' as any">
      <i class="iconfont icon-weixin mr12px" />一键快捷登录
    </tn-button>
  </div>
</template>

<style lang="scss" scoped>
:deep(.tn-form-item__label) {
  display: none;
}

:deep(.tn-input) {
  border: none;
  background-color: #F4F4F4;
  border-radius: 16px !important;
  padding: 16px !important;

  &:focus-within {
    box-shadow: 0 0 0 1px var(--tn-color-primary);
    background-color: rgba($color: var(--tn-color-primary), $alpha: 0.05);
  }
}

:deep(.tn-checkbox) {
  padding: 5px 0 !important;
  color: unset !important;
}
</style>
<style>
page {
  padding: 0;
}
</style>
