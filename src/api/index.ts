import http from './Http'

export * from './agent'

// 登录
export function login(data: { account?: string; password?: string }) {
  return http<{ accessExpire: string; accessToken: string }>('POST', {
    url: '/agent/aUserLogin',
    data
  })
}
