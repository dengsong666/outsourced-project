import http from './Http'

export * from './agent'
export * from './tenant'

// 登录
export function login(data: { account?: string; password?: string }) {
  return http<{ accessExpire: string; accessToken: string }>('POST', {
    url: '/agent/aUserLogin',
    data
  })
}
// 上传
export function upload(file_type: string, file: File) {
  return http('POST', {
    headers: { 'Content-Type': '"multipart/form-data' },
    url: `/upload/${file_type}`,
    data: file
  })
}
