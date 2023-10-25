<script lang="ts" setup>
import { getCunZhengDetail } from "@/apis";
import { copy, saveToAlbum } from "@/utils";
const evidenceId = ref("");
// 图片
const imgUrl = ref("");
// 证书编号
const certNo = ref("");
// 存证时间
const eviTime = ref("");
// 显示溯源
const showDetail = ref(false);
// 溯源内容
// const eviQuery = ref("");
onLoad(async (options) => {
  //  console.log(options)
  evidenceId.value = options?.id;
  try {
    const { certificateNo, certificateUrl, evidenceTime, id } = await getCunZhengDetail({
      evidenceId: evidenceId.value,
    });
    imgUrl.value = certificateUrl;
    certNo.value = certificateNo;
    eviTime.value = evidenceTime;
    // eviQuery.value = evidenceQuery;
  } catch (error) {}
});
// 复制到剪贴板
const copyNo = (text: string) => {
  copy(text, "证书编号");
};
// 保存证书
const handleSave = () => {
  if (imgUrl.value) {
    saveToAlbum(imgUrl.value)
      .then(() => {
        uni.showToast({ title: "保存成功！" });
      })
      .catch((err) => {
        console.error(err);
        uni.showToast({ title: "保存失败！" });
      });
  } else {
    uni.showToast({ title: "获取图片失败！" });
  }
};
</script>
<template>
  <Topbar back-text="" center place back-color class="cd-tab">
    <text class="m-a relative top-4px text-16px">版权详情</text>
  </Topbar>

  <div
    class="mt0px mb-16px w-max mx-a color-#8C9FE7 text-12px border-b-2px border-b-solid border-b-#8C9FE7"
  >
    区块链存证证书
  </div>
  <div
    class="w-full h-max py-16px px-8px rd-4px border-2px border-solid border-#CAD3E8 bg-#CAD3E8"
  >
    <div class="font-bold">证书编号：</div>
    <div>
      <text class="break-all text-12px"> {{ certNo }}</text>
      <text class="color-#8C9FE7 ml12px" @click="() => copyNo(certNo)">复制</text>
    </div>
    <div class="mt-8px">
      <text class="font-bold text-12px">存证时间：</text>
      <text>{{ eviTime }}</text>
    </div>
  </div>

  <tn-popup v-model="showDetail">
    <text class="text-16px font-500 my-16px block"> 有鱼音乐存证平台： </text>
    <text
      class="color-#8C9FE7 underline underline-solid font-bold"
      @click="copy('https://chain.fishyoumusic.top', '链接')"
      >https://chain.fishyoumusic.top</text
    >
    <button class="btn px-24px py-12px" @click="showDetail = false">知道了</button>
  </tn-popup>

  <image :src="imgUrl" class="block w-full h-625px mt12px" />
  <div class="p-8px relative w-100vw nav-bottom mt16px left--16px h-128px bg-white">
    <div class="mx-a color-#999 text-12px">
      请确认权益人信息真实完整，如有错漏请<text
        class="underline underline-solid decoration-solid color-#8C9FE7"
        >修改信息</text
      >并等待审核
    </div>
    <div class="mt-16px flex justify-center">
      <div
        style="box-shadow: 0px 7px 10px 0px rgba(128, 149, 255, 0.5)"
        class="w-120px h48px bg-default rd-12px mr-16px center text-16px color-white"
        @click="showDetail = true"
      >
        信息溯源
      </div>
      <div
        style="box-shadow: 0px 7px 10px 0px rgba(255, 83, 159, 0.28)"
        class="w-120px h48px bg-#FF539F rd-12px center text-16px color-white"
        @click="handleSave"
      >
        保存证书
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cd-tab {
  &:deep(.tn-navbar-back__multi) {
    color: #333;
    background-color: rgb(247, 247, 247);
    border: 1px solid #ccc;
  }
  &:deep(.tn-navbar-back) {
    margin-left: 16px;
  }
}
</style>
<style lang="scss">
Page {
  display: block;
  padding: 0px 16px;
  background-color: white !important;
}
.nav-bottom {
  filter: drop-shadow(0px 0px 3px #888);
}
</style>
