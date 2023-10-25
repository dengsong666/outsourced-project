  
<script lang="ts" setup>
import { navTo, storage } from '@/utils'

</script>
<template>
  <Topbar back-text="设置" place back-color />
  <div class="flex-row items-center py12px" border="b-1 b-solid b-#CFD8DE"
    @click="navTo('/pages/my/set/protocol/index', { title: '用户协议' })">用户协议
    <text class="iconfont icon-arrow-more mlauto" />
  </div>
  <div class="flex-row items-center py12px" border="b-1 b-solid b-#CFD8DE"
    @click="navTo('/pages/my/set/protocol/index', { title: '隐私政策' })">隐私政策
    <text class="iconfont icon-arrow-more mlauto" />
  </div>
  <!-- 注销账户 -->
  <Modal title="确认注销账户吗？" :cancel="{ text: '确定注销' }" :confirm="{ text: '再考虑一下' }" @cancel="storage.del('token'), navTo('/pages/common/login/index')" warning>
    <div class="flex-row items-center py12px" border="b-1 b-solid b-#CFD8DE">注销账户
      <text class="iconfont icon-arrow-more mlauto" />
    </div>
    <template #content>
      <pre>
        您在注销本账号以后:
        1.您将无法继续以本账号享受【词曲鱼塘】提供的服务。您的使用记录数据将会被彻底删除，包含但不限于:已上传的作品、订单服务、头像、昵称等数据。即使您使用相同的手机号码再次注册【词曲鱼塘】，您也无法找回本账号相关的个人信息。
        2.您使用真实身份在【词曲鱼塘】的作品存证记录、作品代理登记服务无法注销。
        3.我司将删除本账号相关的个人信息或进行匿名化处理，但法律法规对信息留存期间另有规定的情况除外(例如，根据《网络安全法》，与本账号相关的网络操作日志将至少保留6个月。)
        4.不代表本账号注销前的账号行为和相关责任得到豁免或减轻。
      </pre>
    </template>
  </Modal>
  <!-- 退出登录 -->
  <Modal content="确定退出登录吗？" cancel @confirm="storage.del('token'), navTo('/pages/common/login/index')">
    <div class="flex-row items-center py12px" border="b-1 b-solid b-#CFD8DE">退出登录
      <text class="iconfont icon-arrow-more mlauto" />
    </div>
  </Modal>
  <!-- 版本信息 -->
  <div class="flex-row items-center py12px" border="b-1 b-solid b-#CFD8DE">版本信息
    <text class="c-#989EB3 ml28px">V2.0</text>
  </div>
</template>

<style lang="scss" scoped></style>