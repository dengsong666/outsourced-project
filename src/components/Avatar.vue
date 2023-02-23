<script setup lang="ts">
import { message, UploadFile } from 'ant-design-vue'
// import logo from '@/assets/logo.png'
import type { UploadChangeParam } from 'ant-design-vue'
import { getLocalStorage } from '@/utils'
const uploadFile = ref<UploadFile>()
const loading = ref(false)
const imageUrl = ref()

const handleChange = (info: UploadChangeParam) => {
  console.log(info)
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }
  if (info.file.status === 'done') {
    getBase64(info.file.originFileObj as Blob, (base64Url: string) => {
      imageUrl.value = base64Url
      loading.value = false
    })
  }
  if (info.file.status === 'error') {
    loading.value = false
    message.error('upload error')
  }
}

const beforeUpload = (file: UploadFile) => {
  uploadFile.value = file
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size ? file.size / 1024 / 1024 < 2 : undefined
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}
</script>
<template>
  <div class="flex-col items-center">
    <a-upload
      name="file"
      :show-upload-list="false"
      :headers="{
        Authorization: `Bearer ${getLocalStorage('token').accessToken}`
      }"
      :action="`/upload/${uploadFile?.type}`"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <div class="flex-center h100px w100px bg-#DBDBDB rd-20px">
        <img class="w100%" v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else>
          <i v-if="loading" class="i-ant-design-loading-outlined"></i>
          <i v-else class="i-ant-design-plus-outlined"></i>
        </div>
      </div>
    </a-upload>
    <a-button class="bg-#363B64 c-#fff rd-8px mt16px"> 上传logo </a-button>
  </div>
</template>
<style></style>
