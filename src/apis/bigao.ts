import http from '@/utils/request'
// 获取基础详情 // 本人
export function getMyBiGaoDetails(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/compareDraft/details/getInfo',
    data
  })
}
// 获取补充详情 // 本人
export function getMyBiGaoExtraDetails(data: { worksId: number, typeId?: 1 | 2 | 3 } & Page) {
  return http({
    method: 'POST',
    url: '/v1/compareDraft/my/details/getInfo',
    data
  })
}
// 标记投稿 // 本人
export function markBiGao(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/compareDraft/my/details/mark',
    data
  })
}
// 结束比稿 // 本人
export function finishBiGao(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/compareDraft/my/details/finish',
    data
  })
}
// 投稿消息数 // 本人
export function getBiGaoMsg(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/compareDraft/my/details/tab/getTotal',
    data
  })
}
// 设置已读 // 本人
export function setReaded(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/compareDraft/my/details/read',
    data
  })
}
// 添加比稿 // 非本人
export function addBiGao(data: { worksId: number, contributeDemoId?: number, contributeMusicId?: number, contributeLyric?: string }) {
  return http({
    method: 'POST',
    url: '/v1/compareDraft/other/details/addCompare',
    data
  })
}
// 获取补充详情 // 非本人
export function getBiGaoExtraDetails(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/compareDraft/other/details/getInfo',
    data
  })
}
// 退出比稿 // 非本人
export function quitBiGao(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/compareDraft/other/details/quitCompare',
    data
  })
}
