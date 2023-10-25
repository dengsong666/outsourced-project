<script lang="ts" setup>
import { getCunZhengList } from "@/apis";
import more from "@/static/more.png";
import { useCommon } from "@/store";
import { px2vw } from "@/utils";
type ListItem = { evidenceTime: string; id: string; name: string };
const common = useCommon();
const { bottom, top } = common.menuButtonPos;

const searchValue = ref("");
let total = 100,
  pageSize = 20,
  pageNum = 1,
  done = false;
const handleSearch = () => {
  (total = 100), (pageSize = 20), (pageNum = 1), (done = false);
  recordList.value = [];
  updateSearch();
};
const banner = reactive({
  top_limit: 145 - bottom - 4, // 粘性布局的滚动上限
});
const filter = reactive({
  top: 0,
  rotate: false,
  styles: [],
});
// 滚动时调整过滤框
onPageScroll((e) => {
  const scrollTop = e.scrollTop;
  filter.top = scrollTop > banner.top_limit ? banner.top_limit : scrollTop;
});

const recordList = ref<ListItem[]>([]);

// 搜索
const updateSearch = async () => {
  if (!done && pageSize * (pageNum - 1) < total) {
    const res = await getCunZhengList({
      pageNum,
      pageSize,
      musicTypeId: recordType.value,
      searchContent: searchValue.value,
    });
    recordList.value = recordList.value.concat(res.dataList);
    total=res.totalCount;
    pageNum++;
  } else {
    // 当页面已经请求完
    done = true;
  }
};
// 划到底部刷新
onReachBottom(updateSearch);
// 初始请求
onReady(updateSearch);
const showPop = ref(false);
const selections = reactive({
  title: "选择类型",
  options: [
    {
      label: "全部",
      value: "",
    },
    {
      label: "demo",
      value: 1,
    },
    {
      label: "曲子",
      value: 3,
    },
    {
      label: "歌词",
      value: 2,
    },
  ],
});
// 类型
const recordType = ref("");
// 选择回调
const handleSelect = (item: any) => {
  if (recordType.value != item.select) {
    recordType.value = item.select;
    handleSearch();
  }
};
const hadleClickItem =(item:ListItem)=>{
  uni.navigateTo({url:`/pages/yusi/czjl/copyrightDetail/index?id=${item.id}`})
}

</script>
<template>
  <Topbar back-text=" " center place back-color class="cz-tab">
    <text class="m-a">存证记录</text>
  </Topbar>
  <div class="w-full cz-list">
    <!-- 顶部 -->
    <div class="my10px justify-between center">
      <tn-search-box
        class="grow"
        v-model="searchValue"
        :search-button="false"
        shape="round"
        @search="handleSearch"
      >
      </tn-search-box>
      <Select :select="selections" :top="px2vw(140 - filter.top)" @confirm="handleSelect">
        <!-- <i class="iconfont icon-more text-18px ml16px" /> -->
        <img :src="more" class="ml16px w18px h18px" />
      </Select>
    </div>
    <div class="relative">
      <tn-popup
        v-model="showPop"
        radius="16"
        open-direction="top"
        @close="showPop = false"
      >
      </tn-popup>
      <tn-list-item right-icon="right" v-for="item in recordList" @click="()=>hadleClickItem(item)">
        {{ item.name }}
        <text class="mlauto mr16px">{{ item.evidenceTime }}</text>
      </tn-list-item>
    </div>
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
.cz-tab .tn-navbar__wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
.cz-list .tn-popup__content.tn-popup__content--top {
  border-bottom-left-radius: 16px !important;
  border-bottom-right-radius: 16px !important;
}
</style>
