import http from '@/utils/request'

// 获取推荐列表
export function getRecommendList(data: { musicTypeId?: 1 | 2 | 3 } & Page) {
  return http({
    method: 'POST',
    url: '/v1/fishpond/getRecommendList',
    data,
  })
}
// 获取鱼塘列表
export function getYutangList(data: { musicTypeId?: 1 | 2 | 3; timeTypeId?: number; musicStyleIdList?: number[] } & Page) {
  return http({
    method: 'POST',
    url: '/v1/fishpond/getList',
    data,
  })
}
// 获取比稿列表
export function getBiGaoList(data: { musicTypeId?: 1 | 2 | 3 | 4 } & Page) {
  return http({
    method: 'POST',
    url: '/v1/fishpond/getDraftList',
    data,
  })
}
// 获取搜索列表
export function getSearchList(data: { searchContent: string; musicTypeId?: 1 | 2 | 3 } & Page) {
  return http({
    method: 'POST',
    url: '/v1/fishpond/search',
    data,
  })
}
// 获取搜索列表历史记录
export function getSearchHistoryList() {
  return http({
    method: 'POST',
    url: '/v1/fishpond/search/getRecentKeyList',
  })
}
// 删除搜索历史记录
export function delSearchHistory() {
  return http({
    method: 'DELETE',
    url: '/v1/fishpond/search/deleteAllRecentKey',
  })
}
// 获取最近播放列表
export function getLatelyPlayList(data: Page = { pageNum: 1, pageSize: 10 }) {
  return http({
    method: 'POST',
    url: '/v1/recentPlay/getList',
    data,
  })
}
// 添加最近播放
export function addLatelyPlay(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/recentPlay/add',
    data,
  })
}
// 移除最近播放
export function removeLatelyPlay(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/recentPlay/delete',
    data,
  })
}
