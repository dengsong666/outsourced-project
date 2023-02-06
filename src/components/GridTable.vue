<script setup lang="ts">
import { TableColumnsType } from 'ant-design-vue'
const layout = ref<'table' | 'grid'>('table')
defineProps<{
  data: any[]
  columns: TableColumnsType
}>()
const emit = defineEmits(['row-click'])
</script>
<template>
  <div class="flex-row items-center mb24px">
    <Search />
    <Modal title="新建">
      <span class="add-btn ml-auto w-min"><i class="i-ant-design-plus-outlined c-#fff"></i></span>
      <template #content>
        <slot name="add"></slot>
      </template>
    </Modal>
    <i :class="`${layout == 'grid' ? 'i-ant-design-bars-outlined' : 'i-ant-design-appstore-outlined'} wh-48px mx8px`" @click="layout = layout == 'grid' ? 'table' : 'grid'"></i>
  </div>
  <Pagination :total="data.length">
    <template #default="{ page, currentRange }">
      <!-- table布局 -->
      <a-table v-show="layout == 'table'" :columns="columns" :data-source="data" :pagination="page" :custom-row="(row) => ({ onClick: () => emit('row-click', row) })">
        <template #bodyCell="{ text, column, record }">
          <template v-if="column.dataIndex === 'logo'">
            <img class="w40px h40px" :src="text" alt="" srcset="" />
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <Operation :target="record" />
          </template>
        </template>
      </a-table>
      <!-- grid布局 -->
      <div v-show="layout == 'grid'" class="grid-box bg-#363B640D p24px">
        <div v-for="item in data.slice(currentRange[0], currentRange[1] + 1)" @click="emit('row-click')" class="p16px bg-#fff z10 box" :key="item.id">
          <p text-right>
            <Operation :target="item" />
          </p>
          <div>
            <h3>{{ item.name }}</h3>
            <span class="c-#A098AE text-14px">{{ item.address }}</span>
          </div>
          <div class="flex-row justify-between my48px">
            <img :src="item.logo" alt="logo" srcset="" w120px />
            <div class="mr24px">
              <h4>用户数</h4>
              <p>{{ item.user_number }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Pagination>
</template>
<style scoped lang="scss">
.grid-box {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
</style>
