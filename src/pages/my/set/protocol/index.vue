<script lang="ts" setup>
import { getUserProtocol } from '@/apis';


let protocol = ref()

onLoad(async (options: any) => {
  const { dataList } = await getUserProtocol()
  protocol.value = dataList.filter((item: any) => item.name == options.title)[0]
  console.log(protocol.value)
})
</script>
<template>
  <Topbar :back-text="protocol?.name" place back-color />
  <h2 class="text-center text-20px font-500 my16px">{{ protocol?.name }}</h2>
  <rich-text :nodes="protocol?.content"></rich-text>
</template>


<style lang="scss" scoped></style>