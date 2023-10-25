<script lang="ts" setup>
import { setUserInfo } from '@/apis';
import { useCommon } from '@/store';
import { uploadFile } from '@/utils';

const { userinfo, defaultAvatar } = useCommon()
const info = reactive({
  avatarSaveUrl: userinfo.avatarUrl,
  contractWeChat: userinfo.contractWeChat,
  contractPhone: userinfo.contractPhone,
  nickname: userinfo.nickName
})
/**
 * 上传图片
 */
async function uploadImage() {
  uni.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sourceType: ['album', 'camera'],
    success: async res => {
      const path = res.tempFiles[0].tempFilePath
      const { avatarSaveUrl } = await uploadFile('/v1/user/upload/avatar', path, 'avatarFile')
      userinfo.avatarUrl = path
      info.avatarSaveUrl = avatarSaveUrl
    }
  })
}
/**
 * 确认提交
 */
async function onConfirmSubmit() {
  const { success } = await setUserInfo(info)
}

</script>
<template>
  <Topbar back-text="个人资料" place back-color msg />
  <img class="w80px h80px my40px mxauto" :src="userinfo.avatarUrl || defaultAvatar" alt="" @click="uploadImage">
  <tn-form ref="formRef" :model="info" label-width="64px" label-position="left">
    <tn-form-item label="昵称" prop="nickname">
      <tn-input v-model="info.nickname" placeholder="请输入昵称" />
    </tn-form-item>
    <tn-form-item label="微信号" prop="contact">
      <tn-input v-model="info.contractWeChat" placeholder="请输入微信号" />
    </tn-form-item>
    <tn-form-item label="手机号">
      <tn-input type="idcard" v-model="info.contractPhone" placeholder="请输入手机号" />
    </tn-form-item>
  </tn-form>
  <tn-button custom-class="disabled" :disabled="!info.nickname || !info.contractPhone || !info.contractWeChat" @click="onConfirmSubmit">
    确认提交
  </tn-button>
</template>


<style lang="scss" scoped></style>