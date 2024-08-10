<script lang='ts' setup>
import { useCommon } from '@/store';

const common = useCommon();
const form = reactive({
  phone: '',
  code: '',
})
const rules = {
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '验证码为4位数字', trigger: 'blur' }
  ]
}
const isGetCode = ref(false)
function onGetCode() {
  console.log(form.phone)
  // common.getLoginCode(form.phone)
  isGetCode.value = true
}
</script>

<template>
  <n-modal v-model:show="common.showLogin" preset="card" w600px>
    <n-tabs default-value="code" size="large" justify-content="space-evenly">
      <n-tab-pane name="code" tab="验证码登录">
        <n-form :model="form" :rules="rules" label-placement="left">
          <n-form-item path="phone">
            <n-input placeholder="请输入手机号" v-model:value="form.phone" />
          </n-form-item>
          <n-form-item path="code">
            <n-input placeholder="请输入验证码" v-model:value="form.code" />
            <div w5em ml16px>
              <n-countdown v-if="isGetCode" :render="({ seconds }) => `${String(seconds).padStart(2, '0')}秒`"
                :duration="59 * 1000" :active="isGetCode" />
              <n-button v-else type="primary" @click="onGetCode">验证码</n-button>
            </div>
          </n-form-item>
          <n-form-item>
            <n-checkbox v-model:checked="common.autoLogin">下次自动登录</n-checkbox>
            <span text-gray mlauto>没有注册自动注册</span>
          </n-form-item>
        </n-form>
        <n-button type="primary" block strong> 登录 </n-button>
      </n-tab-pane>
      <n-tab-pane name="wechat" tab="微信登录">
        <div text-center>
          <img w200px h200px src="./pay.png" alt="">
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