<script lang='ts' setup>
const formRef = ref()
const init = () => ({
  avatar: '',
  username: '',
  wechat: '',
  phone: '',
  intro: '',
})
const form = reactive(init())
const rules = {
  phone: {
    required: true,
    message: '请输入电话号码',
    trigger: ['input']
  }
}
function onSave() {

}
</script>

<template>
  <n-form ref="formRef" label-placement="left" :label-width="80" :model="form" :rules="rules" class="md:w50%">
    <n-form-item label="头像" path="user.name">
      <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" list-type="image-card">
        <span md:text-24px text-128px>+</span>
      </n-upload>
    </n-form-item>
    <n-form-item label="用户名" path="user.name">
      <n-input v-model:value="form.username" placeholder="请输入用户名" />
    </n-form-item>
    <n-form-item label="微信号" path="user.age">
      <n-input v-model:value="form.username" placeholder="请输入微信号" />
    </n-form-item>
    <n-form-item label="手机号" path="phone">
      <n-input v-model:value="form.username" placeholder="请输入手机号" />
    </n-form-item>
    <n-form-item label="简介" path="phone">
      <n-input v-model:value="form.username" placeholder="请输入简介" />
    </n-form-item>
    <n-form-item>
      <n-button mlauto attr-type="reset" @click="Object.assign(form, init())">
        重置
      </n-button>
      <n-button ml16px type="primary" attr-type="submit" @click="onSave">
        保存
      </n-button>
    </n-form-item>
  </n-form>
</template>

<style scoped lang='scss'></style>