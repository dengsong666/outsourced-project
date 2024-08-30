<script lang='ts' setup>
import { updateUserInfo } from '@/apis';
import { useUser } from '@/store';
import { message } from '@/utils';
import { FormInst, FormRules, UploadFileInfo } from 'naive-ui';

const formRef = ref<FormInst>()
const user = useUser()
const init = () => ({
  avatarSaveUrl: '',
  nickname: '',
  contractWeChat: '',
  contractPhone: '',
  introduce: '',
})
const form = reactive(init())
const rules: FormRules = {
  contractPhone: {
    required: true,
    pattern: /^1[3456789]\d{9}$/,
    message: '请输入电话号码',
    trigger: ['input']
  }
}
function onSave() {
  formRef.value?.validate().then(() => {
    updateUserInfo(form).then(() => user.getUserInfo())
  })
}
watchEffect(() => {
  const info = user.userinfo
  if (info) {
    const { headImg, nickname, phone, wechat, introduce } = info
    form.avatarSaveUrl = headImg
    form.nickname = nickname
    form.contractWeChat = wechat
    form.contractPhone = phone
    form.introduce = introduce
  }
})
function onUploadFinish(e: any) {
  const { absolutePath = '' } = JSON.parse(e.event.target?.response)
  form.avatarSaveUrl = absolutePath
}
</script>

<template>
  <n-form ref="formRef" label-placement="left" :label-width="80" :model="form" :rules="rules" class="md:w50%">
    <n-form-item label="头像">
      <n-upload action="/api/v1/file/upload" :max="1" :headers="user.headers" list-type="image-card"
        @finish="onUploadFinish" @error="message.error('上传失败')">
        <img w-full h-full v-if="form.avatarSaveUrl" :src="form.avatarSaveUrl"></img>
        <span v-else md:text-24px text-128px>+</span>
      </n-upload>
    </n-form-item>
    <n-form-item label="用户名" path="nickname">
      <n-input v-model:value="form.nickname" placeholder="请输入用户名" />
    </n-form-item>
    <n-form-item label="微信号" path="contractWeChat">
      <n-input v-model:value="form.contractWeChat" placeholder="请输入微信号" />
    </n-form-item>
    <n-form-item label="手机号" path="contractPhone">
      <n-input v-model:value="form.contractPhone" placeholder="请输入手机号" />
    </n-form-item>
    <n-form-item label="简介" path="introduce">
      <n-input v-model:value="form.introduce" placeholder="请输入简介" />
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