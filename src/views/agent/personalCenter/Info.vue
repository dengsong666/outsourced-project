<script setup lang="ts">
import avatar from '@/assets/avatar.png'
</script>

<template>
  <div class="flex-col items-center mx16px box">
    <img :src="avatar" alt="" srcset="" />
    <p class="text-32px font-700">张三</p>
    <div class="info">
      <p><span>用户名</span><span>张三</span></p>
      <p><span>手机号</span><span>13888886666</span></p>
      <p><span>邮箱</span><span>zhangsan@chint.com</span></p>
      <p><span>所属公司</span><span>正泰电力服务有限公司</span></p>
      <p><span>创建时间</span><span>2020.12.11 14:13:13</span></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  margin-top: auto;
  p {
    border-bottom: 2px solid #a098ae;
    padding: 0 8px 16px;
    span {
      &:first-child {
        display: inline-block;
        width: 6em;
        font-size: 18px;
        color: #363b64;
      }
      &:last-child {
        font-size: 14px;
        color: #a098ae;
      }
    }
  }
}
</style>
