<script setup lang="ts"></script>

<template>
  <a-carousel arrows :dots="false" class="bg-#f2eff2 w-[calc(100vw-800px)]">
    <template #prevArrow>
      <i class="i-ant-design-caret-left-outlined" />
    </template>
    <template #nextArrow>
      <i class="i-ant-design-caret-right-outlined" />
    </template>
    <div class="card-box" v-for="v in 2">
      <div v-for="v in 4" class="box">
        <img class="rd-t-20px w100% h200px" src="https://img.js.design/assets/img/63a9032652bcbaabe80f12ae.png#6dd5bb8d9dd20a7363c8d2d92b06542f" alt="" srcset="" />
        <div class="flex-row justify-between m16px">
          <span class="font-700 text-20px">受到广泛和</span>
          <a-button type="primary" :disabled="false">开通</a-button>
        </div>
        <div class="mx16px">
          <Modal title="开通模块">
            <i class="i-ant-design-appstore-outlined" />
            <template #content>
              <div class="overflow-y-scroll px24px py8px">
                <div v-for="v in 20" class="flex-row justify-between my8px">
                  <span>资产管理</span>
                  <a-button type="primary" :disabled="false" class="btn">
                    <template #icon>
                      <i class="i-ant-design-tag-outlined" />
                    </template>
                    开通
                  </a-button>
                </div>
              </div>
            </template>
          </Modal>
          <Modal title="创建用户" width="50%">
            <i class="i-ant-design-user-outlined" />
            <template #content>
              <User />
            </template>
          </Modal>
        </div>
      </div>
    </div>
  </a-carousel>
</template>

<style lang="scss" scoped>
.card-box {
  display: grid !important;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.ant-carousel {
  margin: 24px 0;
  padding: 24px;
}
.slick-arrow {
  color: #a098ae !important;
  background: #a098ae !important;
}
:deep(.slick-slider) {
  z-index: 1;
  border-radius: 20px;
}
:deep(.slick-track) {
  width: min-content;
}
</style>
