// 导入自定义的HTTP请求工具
import { http } from '@/utils';

/**
 * 发送验证码
 * @param data 包含电话号码的对象，用于接收验证码
 */
export function sendCode(data: { phone: string }) {
  return http.post({
    url: '/v1/user/send/code',
    data
  });
}

/**
 * 使用验证码登录
 * @param data 包含验证码和电话号码的对象
 */
export function byCodeLogin(data: { code: string; phone: string }) {
  return http.post({
    url: '/v1/user/login/bySmsCode',
    data
  });
}

/**
 * 使用微信登录
 * @param data 包含微信登录凭证(code)的对象
 */
export function byWeChatLogin(data: { code: string }) {
  return http.post({
    url: '/v1/user/login/byWeCode',
    data
  });
}

/**
 * 获取微信二维码登录信息
 * @param data 包含访问页面信息的对象
 */
export function getWeChatQR(data: { accessPage: string }) {
  return http.post({
    url: '/v1/user/login/getWeQr',
    data
  });
}

/**
 * 获取用户信息
 */
export function getUserInfo() {
  return http.post({
    url: '/v1/user/get/info',
  });
}

/**
 * 更新用户信息
 * @param data 包含头像保存路径、联系电话、联系微信和昵称的对象
 */
export function updateUserInfo(data: { avatarSaveUrl: string; contractPhone: string; contractWeChat: string; nickname: string }) {
  return http.post({
    url: '/v1/user/update',
    data
  });
}
export function getUserBalanceTotal() {
  return http.post({
    url: '/v1/user-balance/get/balance'
  });
}
export function getUserOrderList(data: PageReq) {
  return http.post<PageRes>({
    url: '/v1/video/order/getOrderDetail',
    data
  });
}
export function payPackage(data: { packageId: number, payType: number }) {
  return http.post<Pay>({
    url: '/v1/recharge/buy',
    data
  });
}