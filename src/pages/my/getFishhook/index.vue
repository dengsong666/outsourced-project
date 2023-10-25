  
<script lang="ts" setup>
import { addYuGou, exchangeYugou, getExchangeYugou, getYugouPackage, isShowAd, rechargeYugou } from '@/apis'
import { useCommon } from '@/store'
import { showMsg } from '@/utils'
const currentTab = ref(0)
const common = useCommon()
const recharge = reactive({
  packageList: [] as any[],
  packageId: undefined,
  otherFishHookNum: undefined,
  redeemFishhookNumber: undefined,
  redeemCode: '',
  adLoaded: false
})
let ad: UniApp.RewardedVideoAdContext
onLoad(async (options) => {
  const { dataList } = await getYugouPackage()
  recharge.packageList = dataList
})
onReady(() => {
  ad = uni.createRewardedVideoAd({ adUnitId: 'adunit-29bbefe3d2f0584d' })
  ad.onLoad(() => recharge.adLoaded = true)
  ad.onError(console.error)
  ad.onClose(async (res) => {
    if (res && res.isEnded) {
      const { success, content } = await addYuGou()
      success && showMsg(content) && common.onGetUserInfo()
    }
  })
})
async function onShowAd() {
  console.log(recharge.adLoaded)
  const { flag, content } = await isShowAd()
  if (flag) {
    recharge.adLoaded ? ad.show().catch(() => {
      ad.load()
        .then(() => ad.show())
        .catch(err => showMsg('视频显示失败'))
    }) : showMsg('正在准备中...')
  } else showMsg(content)
}
/**
 * 充值鱼钩
 */
async function onConfirmRecharge() {
  const { packageId, otherFishHookNum } = recharge
  const yugouNum = otherFishHookNum || recharge.packageList.find(item => item.id == packageId)?.fishhookNumber
  if (yugouNum) {
    const { nonceStr, packageVal, paySign, signType, timeStamp } = await rechargeYugou({ packageId, otherFishHookNum })
    uni.requestPayment({
      provider: 'wxpay',
      orderInfo: '',
      package: packageVal,
      nonceStr, paySign, signType, timeStamp,
      success: () => showMsg(`成功充值${yugouNum}鱼钩`),
      fail: console.error
    })
  } else showMsg('请选择输入或选择充值鱼钩')
}
/**
 * 获取兑换鱼钩
 */
async function onGetExchangeYugou(redeemCode: string) {
  const { redeemFishhookNumber } = await getExchangeYugou({ redeemCode })
  recharge.redeemFishhookNumber = redeemFishhookNumber
}
/**
 * 兑换鱼钩
 */
async function onExchange() {
  const { success } = await exchangeYugou({ redeemCode: recharge.redeemCode })
  success && showMsg(`成功兑换${recharge.redeemFishhookNumber}鱼钩`)
}
</script>
<template>
  <Topbar back-text="获取鱼钩" place back-color />
  <tn-tabs v-model="currentTab">
    <tn-tabs-item v-for="v in ['充值', '兑换鱼钩']" :key="v" :title="v" />
    <template #bar>
      <text class="iconfont icon-tab-packageId text-10px" />
    </template>
  </tn-tabs>
  <div v-show="currentTab == 0">
    <div class="flex-col p16px bg mt16px"
      :style="`background-image: url('https://file.fishyoumusic.top/source/f3bde772-ccc2-4d42-840d-d3053610f367.png');`">
      <text>当前余额</text>
      <text class="mt8px text-22px font-500">{{ common.userinfo.fishhookSurplus }} 鱼钩</text>
    </div>
    <h3 class="c-#333 my16px">选择充值金额</h3>
    <tn-radio-group class='c' v-model="recharge.packageId" @change="recharge.otherFishHookNum = undefined">
      <tn-radio class="h100%" v-for="item in recharge.packageList" :key="item.id" :label="item.id">
        <div class="flex-col items-center">
          <text class="text-14px">{{ item.name }}</text>
          <text class="text-12px c-#E71D25">{{ item.discount }}</text>
        </div>
      </tn-radio>
      <tn-input type="number" style="grid-column-start: 2;grid-column-end: 4;" class="c bg-#F5F7FE"
        @change="recharge.packageId = undefined" :placeholder-style="{ 'text-align': 'center' }"
        v-model="recharge.otherFishHookNum" placeholder="请输入鱼钩数" />
    </tn-radio-group>
    <div class="grid-1-2-16">
      <tn-button custom-class="disabled" bg-color="#FF539F" text-color="#fff" @click="onShowAd">
        看视频挣鱼钩
      </tn-button>
      <tn-button custom-class="disabled" @click="onConfirmRecharge">
        确认充值 ￥{{ recharge.otherFishHookNum || recharge.packageList.find(item => item.id == recharge.packageId)?.price }}
      </tn-button>
    </div>
  </div>
  <div v-show="currentTab == 1" class="myauto">
    <div class="flex-col items-center bg bgs-90% h240px"
      :style="`background-image: url('https://file.fishyoumusic.top/source/34486839-fb03-46f0-b8e6-aae2d2391e22.png');`">
      <tn-input class="bg-#F5F7FE mtauto rd-16px c" :placeholder-style="{ 'text-align': 'center' }"
        v-model="recharge.redeemCode" placeholder="请输入兑换码" @confirm="onGetExchangeYugou" />
      <p v-show="recharge.redeemFishhookNumber" class="mt12px mb--24px text-16px c-#676D84">可兑换
        <text class="c-default">{{ recharge.redeemFishhookNumber }}</text> 鱼钩
      </p>
    </div>
    <div class="grid-1-2-16 mt24px">
      <tn-button custom-class="disabled" bg-color="#FF539F" text-color="#fff" @click="onShowAd">
        看视频挣鱼钩
      </tn-button>
      <tn-button class="mt0!" custom-class="disabled" :disabled="!recharge.redeemCode" @click="onExchange">
        立即兑换
      </tn-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.tn-input) {
  padding: 12px !important;
}
</style>