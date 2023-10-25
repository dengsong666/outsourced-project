<script lang="ts" setup>
import { getCustomerService } from '@/apis';
const kefu = reactive({
  qrcode: '',
  link: ''
})
onLoad(async () => {
  const { customerServiceLink, customerServiceQrCode } = await getCustomerService()
  kefu.qrcode = customerServiceQrCode
  kefu.link = customerServiceLink
})
async function onCustomerService() {
  // #ifdef  MP-WEIXIN  
  wx.openCustomerServiceChat({
    extInfo: {
      url: kefu.link, // 客服链接 https://work.weixin.qq.com/xxxxxxxx
    },
    corpId: 'ww0b4d8d6f18d7ce7e', // 企业ID wwed1ca4d3597eXXXX
    success: (res: any) => {
      console.log("success", JSON.stringify(res));
    },
    fail: (err: any) => console.log(err)
  })
  // #endif
}
</script>
<template>
  <Topbar back-text="联系客服" place back-color />
  <div class="mx32px">
    <div class="flex-col center h514px bg"
      style="background-image: url('https://file.fishyoumusic.top/source/1b95f5d1-e320-464d-a6b2-160d57e3ac9d.png');">
      <h3 class="mt215px text-16px font-500 c-#262B2F">请添加企业微信</h3>
      <img class="w180px h180px my12px" :src="kefu.qrcode" alt="">
      <button class="btn w-fit rd-8px m0" @click="onCustomerService"><text
          class="iconfont icon-my-service text-20px mr4px"></text> 联系客服</button>
    </div>
    <div class="py10px px24px rd-16px bg-#E5EAFD font-500 mx8px mt4px">
      您的咨询留言，<br />
      客服工作人员将在24小时内答复
    </div>
  </div>
</template>


<style lang="scss" scoped></style>