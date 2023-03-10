<script setup lang="ts">
import {
  delProductUser,
  getProductUserList,
  getTenantProductList,
  getTenantProductModuleList,
  openTenantProductModuleState,
  openTenantProductState,
  updateTenantProductState
} from '@/api'
import { Product, ProductModule } from '@/api/types/tenant'
import { useTable } from '@/store'
import { arrOneToN } from '@/utils'

import UserForm from './UserForm.vue'

const tenant_id = useRoute().params.id as string
const product = reactive<{
  list: Product[]
  modules: ProductModule[]
}>({
  list: [],
  modules: []
})
const table = useTable(getProductUserList, delProductUser)
const stateText = (state: number) => {
  switch (state) {
    case 0:
      return '开通'
    case 1:
      return '禁用'
    case 2:
      return '启用'
  }
}
const getProductList = async () => {
  const { data } = await getTenantProductList({ tenant_id })
  product.list = data.list
}
getProductList()
async function changeProduct(product_id: number, product_state: number) {
  switch (product_state) {
    case 0:
      await openTenantProductState({ product_id, tenant_id })
      break
    case 1:
      await updateTenantProductState({ product_id, tenant_id, product_state: 2 })
      break
    case 2:
      await updateTenantProductState({ product_id, tenant_id, product_state: 1 })
      break
  }
  getProductList()
}
async function changeProductModuleState(product_id: number, module_id: number, module_state: number) {
  if (!module_state) await openTenantProductModuleState({ product_id, tenant_id, module_id })
  getProductList()
}

async function getProductModule(product_id: number) {
  const { data } = await getTenantProductModuleList({ tenant_id, product_id })
  product.modules = data.list
}
</script>

<template>
  <div>
    <a-carousel arrows :dots="false" class="bg-#f2eff2 w-[calc(100vw-800px)]">
      <template #prevArrow>
        <i class="i-ant-design-caret-left-outlined" />
      </template>
      <template #nextArrow>
        <i class="i-ant-design-caret-right-outlined" />
      </template>
      <div class="card-box" v-for="productGroup in arrOneToN(product.list, 4)">
        <div v-for="p in productGroup" class="box">
          <img class="rd-t-20px w100% h215px" :src="p.product_icon" alt="" srcset="" />
          <div class="flex-row justify-between m16px">
            <span class="font-700 text-20px">{{ p.product_name }}</span>
            <a-button type="primary" @click="changeProduct(p.product_id, p.product_state)" :class="[p.product_state ? 'btn-cancel' : 'btn-save']">
              {{ stateText(p.product_state) }}
            </a-button>
          </div>
          <div class="mx16px">
            <Modal title="开通模块">
              <a-button type="text" class="p0 mr8px" :disabled="!p.product_state" @click="getProductModule(p.product_id)">
                <i class="i-ant-design-appstore-outlined" :style="`color:${p.product_state ? '#000' : '#888'}`" />
              </a-button>
              <template #content>
                <div class="overflow-y-scroll px24px py8px">
                  <div v-if="product.modules?.length" v-for="md in product.modules" class="flex-row justify-between my8px">
                    <span>{{ md.module_name }}</span>
                    <a-button type="primary" @click="changeProductModuleState(p.product_id, md.product_id, md.state)" :disabled="!!md.state" class="btn">
                      <template #icon>
                        <i class="i-ant-design-tag-outlined" />
                      </template>
                      开通
                    </a-button>
                  </div>
                  <div v-else>暂无模块</div>
                </div>
              </template>
            </Modal>
            <Modal title="创建用户" width="50%">
              <a-button type="text" class="p0 mr8px" :disabled="!p.product_state" @click="table.getList({ tenant_id, page_size: 999 })">
                <i class="i-ant-design-user-outlined" :style="`color:${p.product_state ? '#000' : '#888'}`" />
              </a-button>
              <template #content>
                <User :table="table" @delete="table.delRow($event, tenant_id), table.getList({ tenant_id, page_size: 999 })">
                  <template #add>
                    <UserForm :data="{ tenant_id, product_id: p.product_id }" @submit="table.getList({ tenant_id, page_size: 999 })" />
                  </template>
                  <template #edit="{ form }">
                    <UserForm :data="{ tenant_id, product_id: p.product_id, ...form }" @submit="table.getList({ tenant_id, page_size: 999 })" />
                  </template>
                </User>
              </template>
            </Modal>
          </div>
        </div>
      </div>
    </a-carousel>
  </div>
</template>

<style lang="scss" scoped>
.card-box {
  display: grid !important;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.ant-carousel {
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
