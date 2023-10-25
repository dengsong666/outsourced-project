import http from '@/utils/request'

// 验证码登录
export function loginByCode(data: { code: string; jsCode: string; phone: string }) {
  return http({
    method: 'POST',
    url: '/v1/user/login/byCode',
    data,
  })
}
// 微信一键登录
export function loginByWechat(data: { jsCode: string; jsCodeByPhone: string }) {
  return http({
    method: 'POST',
    url: '/v1/user/login/byWeChat',
    data,
  })
}
// 发送验证码
export function getCode(data: { phone: string }) {
  return http({
    method: 'POST',
    url: '/v1/user/send/code',
    data,
  })
}
// 获取用户信息
export function getUserInfo() {
  return http<UserInfo>({
    method: 'GET',
    url: '/v1/user/getInfo',
  })
}
// 更新用户信息
export function setUserInfo(data: { avatarSaveUrl: string, contractPhone: string, contractWeChat: string,nickname: string }) {
  return http({
    method: 'POST',
    url: '/v1/user/update',
    data
  })
}
// 获取用户隐私信息
export function getUserPrivacy() {
  return http({
    method: 'GET',
    url: '/v1/user/getPrivacyInfo',
  })
}
// 实名认证
export function realNameAuth(data: { cardNo: string, realName: string }) {
  return http({
    method: 'POST',
    url: '/v1/user/realName',
    data
  })
}
// 获取著作权
export function getCopyRight(data: { cardNo?: string, userId?: string }) {
  return http({
    method: 'POST',
    url: '/v1/user/getRightInfo',
    data
  })
}
// 获取消费列表
export function getConsumeList(data: Page) {
  return http({
    method: 'POST',
    url: '/v1/fishhook/consume/getList',
    data
  })
}
// 是否打开激励广告
export function isShowAd() {
  return http({
    method: 'GET',
    url: '/v1/fishhook/video/motive/getEnable',
  })
}
// 增加鱼钩
export function addYuGou() {
  return http({
    method: 'POST',
    url: '/v1/fishhook/video/motive/add',
  })
}

