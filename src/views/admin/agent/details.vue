<script setup lang="ts">
import UserForm from './UserForm.vue'
</script>

<template>
  <div class="grid-box">
    <div class="grid-item1">
      <div class="flex-row justify-between">
        <span class="flex-center wh-160px bg-#fff box p8px bd-1-#DBDBDB"><img class="w100%" src="@/assets/logo.png" alt="" srcset="" /></span>
        <i class="i-ant-design-ellipsis-outlined self-end"></i>
      </div>
      <div class="flex-row">
        <div class="flex-1">
          <p class="text-32px font-700 mb8px">正泰电力服务有限公司</p>
          <p class="font-600">2022.01.01~2023.12.31</p>
          <p class="c-#A098AEFF"><i class="i-ant-design-environment-outlined"></i> 上海市,松江区</p>
        </div>
        <div class="flex-1 grid-2-2-16 items-center">
          <span>租户</span>
          <span>张三</span>
          <span class="font-600">
            <span class="bg-#FE9874 inline-block rd-8px p4px"><i class="i-ant-design-user-outlined c-#fff" /></span>
            <span class="mx16px">150</span>
            <span class="c-#4CBC9A">+12.4%</span>
          </span>
          <span class="font-600">
            <span class="bg-#FE9874 inline-block rd-8px p4px"><i class="i-ant-design-phone-outlined c-#fff" /></span>
            <span class="mx16px">15345476780</span>
          </span>
        </div>
      </div>
    </div>
    <div class="grid-item2">
      <span class="flex-row justify-end"><i class="i-ant-design-ellipsis-outlined"></i></span>
      <p class="text-32px font-700 c-#FE9874FF">优秀</p>
      <ul class="pl20px font-600">
        <li>130天</li>
        <li>Top1</li>
      </ul>
      <a-tooltip class="desc" color="cyan" placement="left">
        <template #title>
          正泰电力服务有限公司是正泰集团旗下正泰电气股份有限公司全资控股设立的首家配售电一体化公司，依托正泰集团输配电产业资源和增量配电网，以配售电业务形态为基础，围绕客户的供用电服务，为客户提供完备的供配电设备、电力工程安装检修、节能和能效管理、多能互补
          正泰电力服务有限公司是正泰集团旗下正泰电气股份有限公司全资控股设立的首家配售电一体化公司，依托正泰集团输配电产业资源和增量配电网，以配售电业务形态为基础，围绕客户的供用电服务，为客户提供完备的供配电设备、电力工程安装检修、节能和能效管理、多能互补
        </template>
        正泰电力服务有限公司是正泰集团旗下正泰电气股份有限公司全资控股设立的首家配售电一体化公司，依托正泰集团输配电产业资源和增量配电网，以配售电业务形态为基础，围绕客户的供用电服务，为客户提供完备的供配电设备、电力工程安装检修、节能和能效管理、多能互补
        正泰电力服务有限公司是正泰集团旗下正泰电气股份有限公司全资控股设立的首家配售电一体化公司，依托正泰集团输配电产业资源和增量配电网，以配售电业务形态为基础，围绕客户的供用电服务，为客户提供完备的供配电设备、电力工程安装检修、节能和能效管理、多能互补
      </a-tooltip>
    </div>
    <div class="grid-item3">
      <User :scroll-y="350">
        <template #add>
          <UserForm />
        </template>
      </User>
    </div>
    <div class="grid-item4">
      <Timeline title="开通租户记录" :scroll-y="40" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-box {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 40% 60%;
  gap: 24px;
  height: calc(100% - 32px);
  > div {
    padding: 24px;
    @extend .box;
  }
  .grid-item1 {
    grid-area: 1 / 1 / 2 / 4;
    background: linear-gradient(0, #fff 65%, #363b64 65%);
  }
  .grid-item2 {
    grid-area: 1 / 4 / 2 / 5;
    background: linear-gradient(180deg, #363b64ff 0%, #4cbc9aff 100%);
    color: #fff;
    :deep(.desc) {
      @include mline-of(7);
    }
  }
  .grid-item3 {
    grid-area: 2 / 1 / 3 / 4;
  }
  .grid-item4 {
    grid-area: 2 / 4 / 3 / 5;
    background: transparent;
    padding-top: 0;
  }
}
</style>
