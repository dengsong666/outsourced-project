import http from '@/utils/request'

// 获取banner
export function getBannerList() {
  return http({
    method: 'GET',
    url: '/v1/banner/getList',
  })
}
// 获取系统配置
export function getConfig() {
  return http({
    method: 'GET',
    url: '/v1/system/getConfig',
  })
}
// 获取音乐风格
export function getStyleList(data: Page = { pageNum: 1, pageSize: 100 }) {
  return http({
    method: 'POST',
    url: '/v1/style/getList',
    data,
  })
}
// 举报类型列表
export function getReportList(data: { showType: 0 | 1 | 2 } & Page) {
  return http({
    method: 'POST',
    url: '/v1/report/getList',
    data,
  })
}
// 点赞
export function setLike(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/works/like/addOrCancel',
    data,
  })
}
// 举报
export function setReport(data: { worksId: number, reason: string, type: 1 | 2 | 3 }) {
  return http({
    method: 'POST',
    url: '/v1/report/report',
    data,
  })
}
// 获取鱼钩产品包
export function getYugouPackage(data: Page = { pageNum: 1, pageSize: 100 }) {
  return http({
    method: 'POST',
    url: '/v1/fishhook/package/getList',
    data,
  })
}
// 充值鱼钩订单
export function rechargeYugou(data: { packageId?: number, otherFishHookNum?: number }) {
  return http({
    method: 'POST',
    url: '/v1/buyOrder/createOrder',
    data,
  })
}
// 获取兑换鱼钩
export function getExchangeYugou(data: { redeemCode: string }) {
  return http({
    method: 'POST',
    url: '/v1/fishhook/redeem/getInfo',
    data,
  })
}
// 兑换鱼钩
export function exchangeYugou(data: { redeemCode: string }) {
  return http({
    method: 'POST',
    url: '/v1/fishhook/redeem/add',
    data,
  })
}
// 获取用户协议
export function getUserProtocol() {
  return http({
    method: 'GET',
    url: '/v1/protocol/getList',
  })
}
// 获取客服二维码和链接
export function getCustomerService() {
  return http({
    method: 'GET',
    url: '/v1/user/getCustomerServiceInfo',
  })
}
// 获取demo词曲详情
export function getDetails(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/details/getInfo',
    data
  })
}
// 自荐
export function setRecommend(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/details/recommend',
    data
  })
}
// 取消合作
export function cancelCooperation(data: { worksId: number }) {
  return http({
    method: 'POST',
    url: '/v1/details/cancel/cooperation',
    data
  })
}
// 联系作者
export function contractOther(data: { worksId: number, contactType: 1 | 2 | 3 | 4 | 5 | 6 }) {
  return http({
    method: 'POST',
    url: '/v1/contract/other/getInfo',
    data
  })
}
// 获取消息列表
export function getMessageList(data: Page) {
  return http({
    method: 'POST',
    url: '/v1/message/getList',
    data
  })
}
// 获取消息详情
export function getMessageDetails(data: { messageId: number }) {
  return http({
    method: 'POST',
    url: '/v1/message/getDetails',
    data
  })
}
// 获取消息详情
export function getUnreadCount() {
  return http({
    method: 'GET',
    url: '/v1/message/getUnreadCount',
  })
}


