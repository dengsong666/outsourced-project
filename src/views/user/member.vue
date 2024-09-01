<script lang='ts' setup>
import { getMemberPackageList, payPackage } from '@/apis';
import { useList } from '@/hooks';
import { message, notification } from '@/utils';
const member = reactive({
  packageId: undefined as unknown as number,
  payType: 1
})
const pay = reactive({
  options: [
    { label: '微信', value: 1, color: '#01c700', icon: 'i-custom-wechatpay' },
    { label: '支付宝', value: 2, color: '#01a2ed', icon: 'i-custom-alipay' }
  ],
  qr: '',
})
const list = useList<MemberPackage>(getMemberPackageList)
const payType = computed(() => pay.options.find(item => item.value === member.payType))
const group = computed(() => list.value?.find(item => item.id === member.packageId))
const isPay = ref(false)

function onPay() {
  if (member.packageId) {
    payPackage(member).then(res => {
      pay.qr = res.payQrcode
      isPay.value = true
      if (useMediaQuery('(max-width: 768px)')) window.open(res.payUrl)
    })
  } else message.warning('请选择会员套餐')
}
</script>

<template>
  <n-radio-group v-model:value="member.packageId">
    <div md:grid-1-10-24 grid-1-3-48 class="bg-#f7f8fa p24px rd-16px">
      <n-radio v-for="item in list" :key="item.id" :value="item.id" class="pac">
        <div flex-col justify-evenly p16px gap16px w-full>
          <span>{{ item.integral }}点</span>
          <span>￥ {{ item.price }}</span>
          <span>有效期{{ item.validTime }}天</span>
        </div>
      </n-radio>
    </div>
  </n-radio-group>

  <n-button my16px mxauto type="primary" @click="onPay">立即购买</n-button>
  <pre mtauto mxauto>
  1. 用户使用智能剪辑、文字翻译、语音翻译等业务以30秒为计费单位，单个视频不足30秒按30秒计。
  2. 不同业务计费不相同，同时使用不同业务时计费会相加，例如:同时使用去重*语音翻译*基础配音角色，则每30秒计费1+2*1=4点
  3. 可获得的去水映次数=点数*2
  4. 购买后可自动找回30天内过期的点数
  5. 购买后非软件问题不支持退款，请试用满意后再购买
</pre>
  <n-modal v-model:show="isPay" preset="dialog" title="支付订单" w500px
    @before-hide="notification.info({ title: '支付结果', content: '稍后在我的账户中交易明细查阅', duration: 5000 })">
    <div grid-2-2-16 p16px items-center text-white my16px class="bg rd-16px">
      <span>支付金额</span>
      <span>购买：{{ group?.integral }}点</span>
      <span text-24px font-600>￥ {{ group?.price }}</span>
      <span>会员时长：<span font-600>{{ group?.validTime }}天</span></span>
    </div>
    <p class="text-gray text-12px">说明：积分为虚拟币，充值后的积分有效期为1年，且无法提现或转赠他人，暂不支持退款</p>
    <div flex>
      支付方式：
      <div flex-col>
        <n-radio-group v-model:value="member.payType">
          <div flex gap16px>
            <n-radio v-for="item in pay.options" :key="item.value" :value="item.value" class="pay-type">
              <div flex items-center gap4px rd-4px outline-1px outline-solid px4px py2px
                :style="{ outlineColor: member.payType == item.value ? item.color : 'transparent' }">
                <i :class="item.icon" :style="{ color: item.color }"></i>
                {{ item.label }}
              </div>
            </n-radio>
          </div>
        </n-radio-group>
        <div lt-md:hidden flex-col items-center>
          <img w200px h200px my16px :src="pay.qr" alt="">
          <span text-12px text-gray>请使用{{ payType?.label }}扫码支付</span>
        </div>
      </div>
    </div>
  </n-modal>
</template>

<style scoped lang='scss'>
:deep(.n-radio) {
  border-radius: 8px;
  background-color: white;

  .n-radio__dot-wrapper {
    display: none
  }

  &.pac.n-radio--checked {
    outline: 2px solid #01c700;
  }
}

.bg {
  background: linear-gradient(-45deg, #9b4ff9, #21d3c7);
}
</style>