<script setup lang="ts">
defineProps<{
  placeholder?: string
}>()
const searchText = ref('')
</script>

<template>
  <div class="w100% search-box">
    <a-input v-model="searchText" :placeholder="placeholder || '关键字'">
      <template #prefix>
        <i class="i-ant-design-search-outlined"></i>
      </template>
    </a-input>
  </div>
</template>

<style lang="scss" scoped>
.ant-input-affix-wrapper {
  width: 500px;
  min-width: 300px;
  border-radius: 20px;
  padding: 8px 16px;
}
</style>
