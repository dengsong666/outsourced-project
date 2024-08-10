<script lang='ts' setup>
const groups = [
  { count: 70, price: 28, duration: 7 },
  { count: 100, price: 58, duration: 14 },
  { count: 150, price: 88, duration: 21 },
  { count: 200, price: 118, duration: 28 },
  { count: 300, price: 188, duration: 42 },
  { count: 500, price: 308, duration: 63 },
  { count: 1000, price: 588, duration: 126 },
  { count: 2000, price: 1188, duration: 252 },
  { count: 3000, price: 1888, duration: 378 },
  { count: 5000, price: 3088, duration: 630 },
  { count: 10000, price: 5888, duration: 1260 },
  { count: 20000, price: 11888, duration: 2520 },
]
const pay = ref('wechat')
const group = ref()
</script>

<template>
  <template v-if="group && $route.hash">
    <h3 my16px>支付订单</h3>
    <div grid-2-2-16 p16px text-white w-500px class="bg rd-16px">
      <span>支付金额</span>
      <span>购买：{{ group.count }}点</span>
      <span text-24px font-600>￥ {{ group.price }}</span>
      <span>会员时长：<span font-600>{{ group.duration }}天</span></span>
    </div>
    <p class="text-gray text-12px">说明:积分为虚拟币，充值后的积分有效期为1年，且无法提现或转赠他人，暂不支持退款</p>
    <div flex>
      支付方式：
      <div flex-col>
        <div flex gap16px>
          <div :class="['rd-8px px16px py8px', { 'border-#01c700!': pay == 'wechat' }]" border="1px solid #eee"
            @click="pay = 'wechat'">
            <i class="text-#01c700" i-custom-wechatpay></i>
            微信支付
          </div>
          <div :class="['rd-8px px16px py8px', { 'border-#01a2ed!': pay == 'alipay' }]" border="1px solid #eee"
            @click="pay = 'alipay'">
            <i class=" text-#01a2ed" i-custom-alipay></i>
            支付宝
          </div>
        </div>
        <div flex-col items-center>
          <img w200px h200px my16px src="./pay.png" alt="">
          <span text-12px text-gray>请使用{{ pay == 'wechat' ? '微信支付' : '支付宝' }}扫码支付</span>
        </div>
      </div>
    </div>


  </template>
  <template v-else>
    <div flex flex-wrap gap-24px class="bg-#f7f8fa p24px rd-16px">
      <div v-for="item in groups" bg-white p8px class="rd-8px" flex-col justify-evenly h100px w100px
        @click="group = item, $router.push({ hash: `#${item.count}` })">
        <span>{{ item.count }}点</span>
        <span>￥ {{ item.price }}</span>
        <span>有效期{{ item.duration }}天</span>
      </div>
    </div>
    <n-button my16px mxauto type="primary">立即购买</n-button>
    <pre mtauto mxauto>
    1. 用户使用智能剪辑、文字翻译、语音翻译等业务以30秒为计费单位，单个视频不足30秒按30秒计。
    2. 不同业务计费不相同，同时使用不同业务时计费会相加，例如:同时使用去重*语音翻译*基础配音角色，则每30秒计费1+2*1=4点
    3. 可获得的去水映次数=点数*2
    4. 购买后可自动找回30天内过期的点数
    5. 购买后非软件问题不支持退款，请试用满意后再购买
  </pre>
  </template>
</template>

<style scoped lang='scss'>
.bg {
  background: linear-gradient(-45deg, #9b4ff9, #21d3c7);
}
</style>