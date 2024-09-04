<script lang='ts' setup>
// 导入用户状态管理
import { useUser } from '@/store';
// 导入登录相关API
import { byCodeLogin, getWeChatQR, sendCode } from '@/apis';
// 导入表单组件类型定义
import { FormInst, FormRules } from 'naive-ui';
// 导入本地存储工具
import { delStorage } from '@/utils';
import Protocol from './Protocol.vue';
// 初始化用户状态
const user = useUser();
// 定义表单数据模型
const form = reactive({
  phone: '18161246504',
  code: '',
});
// 微信二维码URL引用
const wechatQR = ref();
// 表单实例引用
const refForm = ref<FormInst>();
// 自动登录设置，使用本地存储保持状态
const autoLogin = useLocalStorage('autoLogin', false);
// 定义表单验证规则
const rules: FormRules = {
  phone: {
    key: 'phone',
    required: true,
    pattern: /^1[3-9]\d{9}$/,
    message: '请输入正确的手机号',
    trigger: 'blur',
  },
  code: {
    required: true,
    len: 6,
    message: '请输入正确的验证码',
    trigger: 'blur',
  },
};
// 获取验证码按钮状态控制
const isGetCode = ref(false);

/**
 * 发送验证码
 * 验证表单中手机号的合法性后发送验证码
 */
function onGetCode() {
  refForm.value?.validate((errors) => {
    if (!errors) {
      sendCode({ phone: form.phone }).then(() => {
        isGetCode.value = true;
      });
    }
  }, rule => rule.key === 'phone');
}

/**
 * 验证码登录
 * 验证表单数据的合法性后执行验证码登录
 */
function onLogin() {
  refForm.value?.validate((errors) => {
    if (!errors) {
      byCodeLogin(form).then(res => {
        user.token = res.token;
        user.showLogin = false;
        user.init();
      });
    }
  });
}

/**
 * 获取微信二维码
 * 根据登录方式选择获取微信二维码
 * @param tab 登录方式标签
 * @param accessPage 访问页面路径
 */
function onGetQR(tab: string, accessPage) {
  if (tab === 'wechat') {
    getWeChatQR({ accessPage }).then(res => {
      wechatQR.value = res.weQrUrl;
    });
  }
}

// 监视用户状态变化，自动登录或清除登录状态
watchEffect(() => {
  if (user.token) {
    sessionStorage.setItem('token', user.token);
    if (autoLogin.value) {
      localStorage.setItem('token', user.token);
    }
  } else {
    user.userinfo = null;
    delStorage('token');
  }
});
</script>

<template>
  <!-- 登录模态框 -->
  <n-modal v-model:show="user.showLogin" preset="card" md:w600px w90vw>
    <!-- 登录选项卡 -->
    <n-tabs default-value="code" size="large" justify-content="space-evenly"
      @update:value="onGetQR($event, $route.path)">
      <!-- 验证码登录面板 -->
      <n-tab-pane name="code" tab="验证码登录">
        <!-- 验证码登录表单 -->
        <n-form ref="refForm" :model="form" :rules="rules" label-placement="left">
          <n-form-item path="phone">
            <n-input placeholder="请输入手机号" v-model:value="form.phone" />
          </n-form-item>
          <n-form-item path="code">
            <n-input placeholder="请输入验证码" v-model:value="form.code" />
            <div flex-basis-8em flex-shrink-0 text-center>
              <!-- 验证码发送倒计时 -->
              <n-countdown v-if="isGetCode" :render="v => `${String(v.seconds).padStart(2, '0')}秒`"
                :duration="59 * 1000" :active="isGetCode" @finish="isGetCode = false" />
              <!-- 发送验证码按钮 -->
              <n-button v-else float-right type="primary" @click="onGetCode">验证码</n-button>
            </div>
          </n-form-item>
          <n-form-item>
            <!-- 自动登录复选框 -->
            <n-checkbox v-model:checked="autoLogin">
              <n-popover trigger="hover">
                <template #trigger>下次自动登录</template>
                <span>关闭标签页/浏览器后，24h内无需再次手动登录</span>
              </n-popover>
            </n-checkbox>
            <span text-gray mlauto>没有注册自动注册</span>
          </n-form-item>
        </n-form>
        <!-- 登录按钮 -->
        <n-button type="primary" block strong @click="onLogin"> 登录 </n-button>
      </n-tab-pane>
      <!-- 微信登录面板 -->
      <n-tab-pane name="wechat" tab="微信登录">
        <div text-center>
          <img md:w200px md:h200px :src="wechatQR" alt="">
        </div>
      </n-tab-pane>
    </n-tabs>
    <!-- 用户协议和隐私政策 -->
    <p text-center text-12px text-gray my16px>注册登录即代表已同意
      <Protocol title="用户协议" /> 和
      <Protocol title="隐私政策" />
    </p>
  </n-modal>
</template>

<style scoped lang='scss'></style>