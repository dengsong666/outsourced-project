<script lang="ts" setup>
import { getUserInfo } from '@/apis'
import { useCommon } from '@/store'
import icon1 from '@/static/wdddy.png'
import icon2 from '@/static/bdzdy.png'
import icon3 from '@/static/wfydy.png'
import icon4 from '@/static/wdbg.png'
import { copy, navTo, px2vw } from '@/utils'

const common = useCommon()
const { topbarH, defaultAvatar, bottomH } = common
const info = reactive({
  operate: [
    { label: '我的订单', url: '', icon: 'icon-my-order' },
    { label: '消费记录', url: '/pages/my/consumeRecord/index', icon: 'icon-yugou' },
    { label: '联系客服', url: '/pages/my/customerService/index', icon: 'icon-my-service' },
    { label: '实名认证', url: '/pages/my/realnameAuth/index', icon: 'icon-realname-auth' },
    { label: '我的授权', url: '', icon: 'icon-my-auth' },
    { label: '设置', url: '/pages/my/set/index', icon: 'icon-set' },
  ],
  fish: [
    { title: '我钓到的鱼', icon: icon1 },
    { title: '被钓走的鱼', icon: icon2 },
    { title: '我放养的鱼', icon: icon3 },
    { title: '我的比稿', icon: icon4 },
  ]
})
onShow(async () => {
  common.onGetUserInfo()
  common.currentTabbar = 4
})
</script>

<template>
  <Topbar back-text="我的" place msg bg="transparent" />
  <div class="info-box">
    <div class="info">
      <div class="flex-row items-center">
        <img class="w60px h60px rd-50%" :src="common.userinfo.avatarUrl || defaultAvatar" alt=""
          @click="navTo('/pages/my/personalData/index')">
        <div class="flex-col ml6px">
          <text class="text-18px font-500 mb4px">
            {{ common.userinfo.nickName }}
          </text>
          <text class="c-default bg-#F5F7FE px10px py2px rd-10px">
            uid: {{ common.userinfo.userId }} <text class="iconfont icon-copy text-16px"
              @click="copy(common.userinfo.userId, 'uid')" />
          </text>
        </div>
        <text class="c-#fff font-500 absolute right-16px top-4px" @click="navTo('/pages/my/personalData/index')">
          编辑资料
        </text>
      </div>
      <div class="flex-row mt4px">
        <div class="flex-1 flex-col items-center">
          <text class="text-19px font-500">
            {{ common.userinfo.cumulativeHookCount ?? 0 }}
          </text>
          <text class="c-#676D84">
            累计抛钩次数
          </text>
        </div>
        <div class="flex-1 flex-col items-center">
          <text class="text-19px font-500">
            {{ common.userinfo.cumulativeHookedCount ?? 0 }}
          </text>
          <text class="c-#676D84">
            累计中钩次数
          </text>
        </div>
      </div>
      <div class="grid-1-2-0 mt24px">
        <div class="flex-col pr12px">
          <div class="flex-row items-center mb10px">
            <text class="font-500 ">
              鱼缸空间
            </text>
            <tn-line-progress class="ml10px flex-1" :percent="100 - (common.userinfo.fishTankSurplusPercent ?? 0)"
              inactive-color="#fff" />
          </div>
          <div class="flex-row items-center">
            <text class="c-#262B2F">
              {{ common.userinfo.fishTankSurplusPercent }}%可用
            </text>
            <text class="c-default mlauto"
              @click="navTo('/pages/my/dilatation/index', { percent: common.userinfo.fishTankSurplusPercent, total: common.userinfo.fishTankGross })">
              扩容
            </text>
          </div>
        </div>
        <div class="flex-col pl12px" border="l-1 l-solid l-#fff">
          <text class="font-500 mb10px">
            鱼钩余额
          </text>
          <div class="flex-row items-center">
            <text class="c-#262B2F">
              {{ common.userinfo.fishhookSurplus?.toFixed(2) }}
            </text>
            <text class="c-default mlauto"
              @click="navTo('/pages/my/getFishhook/index')">
              获取鱼钩
            </text>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex-row justify-between mt222px p16px rd-16px bg-#F5F7FE">
    <div v-for="(item, idx) in info.fish" :key="idx" class="flex-col items-center"
      @click="navTo('/pages/yugang/fish/index', { type: idx + 1, title: item.title })">
      <img class="w48px h48px" :src="item.icon" alt="">
      <text class="text-12px mt10px"> {{ item.title }}</text>
    </div>
  </div>
  <div class="mt24px" :style="`padding-bottom:calc(${common.bottomH} + ${px2vw(50)})`">
    <div v-for="item in info.operate" :key="item.label" class="flex-row items-center py12px text-16px c-#777"
      border="b-1 b-solid b-#eee" @click="navTo(item.url)">
      <text class="iconfont text-18px w30px " :class="item.icon" /><text>{{ item.label }}</text>
      <text class="iconfont icon-arrow-more mlauto " />
    </div>
  </div>
  <Tabbar />
</template>

<style lang="scss" scoped>
.info-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  height: 200px;
  background-image: url('https://file.fishyoumusic.top/source/bd273d78-e3d3-4e7e-a516-0e66705a812a.png');
  background-size: contain;
  padding: v-bind(px2vw(topbarH)) 16px 0;

  .info {
    position: relative;
    padding: 12px;
    margin-top: 12px;
    border-radius: 16px;
    height: 200px;
    background-image: url('https://file.fishyoumusic.top/source/6e8cc73c-f285-4401-900a-043d9f8eda92.png'), url('https://file.fishyoumusic.top/source/df1d768c-2fa9-485e-92d8-ad19d8bac716.png');
    background-size: contain, contain;
    background-position: 0 0, 0 124px;
    background-repeat: no-repeat, no-repeat;
  }
}

.icon-arrow-more {
  font-size: 16px;
}
</style>
