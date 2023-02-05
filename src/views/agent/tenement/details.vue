<script setup lang="ts">
import Carousel from './Carousel.vue'
const {
  params: { id }
} = useRoute() // id 用来调用接口获取公司数据填充下面
console.log(id)
</script>

<template>
  <div class="flex-row justify-between h100%">
    <div>
      <Search />
      <Carousel />
    </div>
    <div class="flex-basis-400px">
      <div class="company-card">
        <p text-right><i class="i-ant-design-ellipsis-outlined"></i></p>
        <p class="text-20px font-700">Nella Vita</p>
        <span class="text-20px font-700">稍等发给我去额撒地你</span>
        <div class="flex-row justify-between my24px">
          <div>
            <p>开通产品</p>
            <span>3</span>
          </div>
          <div>
            <p>到期日</p>
            <span>2022.11.12</span>
          </div>
        </div>
      </div>
      <div class="h100%">
        <Timeline title="操作记录" :scroll-y="360" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ant-input-affix-wrapper {
  width: 600px;
}

.company-card {
  height: 300px;
  padding: 16px 24px;
  color: #fff;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(54, 59, 100, 1) 0%, rgba(76, 188, 154, 1) 100%);
  box-shadow: 0px 20px 50px 0px rgba(191, 21, 108, 0.05);
}
</style>
