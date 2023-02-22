<script setup lang="ts">
import LoginForm from './LoginForm.vue'
const activeTab = ref('account')
</script>

<template>
  <div class="login-box">
    <div class="fixed right-200px top-50% translate-y--50% w400px h400px bg-#accef8 rd-10px">
      <div class="absolute bg-#fff top--20px bottom--20px mx20px w-[calc(100%-40px)] rd-10px py20px px40px c-#4591e9">
        <h2>泰无忧</h2>
        <h3>代理商系统</h3>
        <a-tabs v-model:activeKey="activeTab">
          <a-tab-pane key="account" tab="账号登陆">
            <LoginForm />
          </a-tab-pane>
          <a-tab-pane key="helpline" tab="咨询热线">
            <p>热线电话：021-67777768</p>
            <a href="">关于我们</a>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background-image: url('./login-bg.jpg');
  background-size: cover;
}
</style>
