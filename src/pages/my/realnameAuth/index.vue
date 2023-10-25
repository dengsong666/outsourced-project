<script lang="ts" setup>
import { getUserPrivacy, realNameAuth } from '@/apis';

const form = reactive({
  realName: '',
  cardNo: ''
})
onLoad(async () => {
  const { idCard, realName } = await getUserPrivacy()
  form.realName = realName
  form.cardNo = idCard
})
async function onRealNameAuth() {
  console.log(form)
  const { success } = await realNameAuth(form)
  success && uni.navigateBack()
}
</script>
<template>
  <Topbar back-text="实名认证" place bg="#3A69F5" />
  <h3 class="font-500 my12px">填写信息</h3>
  <tn-form ref="formRef" :model="form">
    <tn-form-item label="真实姓名" prop="realName">
      <tn-input v-model="form.realName" placeholder="请输入真实姓名" />
    </tn-form-item>
    <tn-form-item label="身份证号" prop="cardNo">
      <tn-input type="idcard" v-model="form.cardNo" placeholder="请输入身份证号" />
    </tn-form-item>
  </tn-form>
  <tn-button custom-class="disabled" :disabled="!form.realName || !form.cardNo" @click="onRealNameAuth">
    确认提交
  </tn-button>
</template>


<style lang="scss" scoped></style>