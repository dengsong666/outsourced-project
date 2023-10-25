<script lang="ts" setup>
import { downloadProtocal, getXieYiList } from "@/apis";
import tishi from "@/static/tishi.png";
import { shareFile } from "@/utils";
type XYData = { name: string; id: string; costFishHook: number };
const protocalList = ref<Array<XYData>>([]);
const showModel = ref(false);
const currentItem = ref<XYData>();
// 不可重复点击
const downloadEnable = ref(true);
/**
 * 协议助手下载确定
 */
const sumbmit = async () => {
  if (currentItem.value && downloadEnable.value) {
    const protocal = currentItem.value;
    try {
      // 禁止重复点击
      downloadEnable.value = false;
      // 显示Loading
      uni.showLoading({ title: "下载中..." });
      // 下载链接
      const { templateUrl, templateId } = await downloadProtocal({
        templateId: protocal.id,
      });
      // 隐藏Loading
      uni.hideLoading();
      // 分享文件
      shareFile(
        templateUrl,
        protocalList.value.find((protocal) => protocal.id === templateId)?.name ||
          templateId
      );
      // 关闭弹窗
      showModel.value = false;
    } catch (error) {
      console.error(error);
      uni.showToast({ title: `下载失败:${error}` });
    } finally {
      downloadEnable.value = true;
    }
  }
};
/**
 * 点击下载
 * @param item
 */
const download = (item: any) => {
  showModel.value = true;
  currentItem.value = item;
};

let total = 100,
  pageSize = 20,
  pageNum = 1,
  done = false;
const updateData = async () => {
  if (!done && pageSize * (pageNum - 1) < total) {
    const res = await getXieYiList({ pageSize, pageNum });
    protocalList.value = protocalList.value.concat(res.dataList);
    total = res.totalCount;
    pageNum++;
  } else {
    done = true;
  }
};
const h = computed(() =>
  !currentItem.value || currentItem.value.costFishHook < 100 ? 596 : 620
);
onReady(() => {
  updateData();
});
onReachBottom(() => {
  updateData();
});
</script>
<template>
  <Topbar back-text=" " center place back-color class="xy-tab">
    <text class="m-a">协议助手</text>
  </Topbar>
  <div class="w-full xy-list">
    <!-- 顶部 -->
    <Tips title="温馨提示：仅供参考提示" class="xy-tip" />
    <div
      v-for="item in protocalList"
      class="h50px flex justify-between text-14px bottom items-center border-b-#eee border-b-1px border-b-solid"
    >
      <text>{{ item.name }}</text>
      <text class="color-default" @click="() => download(item)">下载</text>
    </div>
    <tn-popup v-model="showModel" :width="560" :height="h">
      <div class="model-content">
        <div class="mt22px">
          <text
            class="w-32px h32px mxa rd-16px color-white bg-#FAAD14 center text-24px"
            :src="tishi"
            ><text>!</text></text
          >
        </div>
        <div class="mt10px text-center text-16px">协议助手提示</div>
        <div class="leading-24px text-justify mt-12px">
          <i class="w-8px h-8px rd-4px bg-default inline-block mr-4px v-middle"></i>
          <text class="v-middle text-justify"
            >您将消费<text class="color-default">{{ currentItem?.costFishHook }}鱼钩</text
            >用于下载该协议模板。</text
          >
        </div>
        <div class="leading-24px text-justify">
          <i class="w-8px h-8px rd-4px bg-default inline-block mr-4px v-middle"></i>
          <text class="v-middle"
            >声明：协议模板内容仅供参考，本平台不对使用该模板签署协议的最终结果负责，涉及签约具体权益事宜请咨询专业法律从业者。</text
          >
        </div>
        <div class="mt-20px flex justify-between items-center">
          <div class="w-116px h-32px rd-8px bg-#F4F4F4 center" @click="showModel = false">
            <text>取消</text>
          </div>
          <div
            class="w-116px h-32px rd-8px bg-default text-white center"
            @click="sumbmit"
          >
            <text>确定</text>
          </div>
        </div>
      </div>
    </tn-popup>
  </div>
  <Tabbar />
</template>

<style lang="scss" scoped>
:deep(.tn-list-item__content) {
  display: flex;
}
</style>
<style lang="scss">
page {
  padding-left: 16px;
  padding-right: 16px;
}
.xy-tab .tn-navbar__wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
.xy-list .tn-popup__content.tn-popup__content--top {
  border-bottom-left-radius: 16px !important;
  border-bottom-right-radius: 16px !important;
}
:deep(.xy-tip .tn-collapse) {
  margin-left: -16px;
  width: 375px !important;
}
.model-content {
  font-family: PingFangSC-Medium, PingFang SC;
}
</style>
