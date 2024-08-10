import axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'

interface ResponseData<T> {
  msg?: string
  data: T
  code: string
}
const service = axios.create({
  baseURL: '/api',
  timeout: 3000
})
const r =
  (method: string) =>
    <T = any>(config: AxiosRequestConfig): Promise<ResponseData<T>> =>
      service.request({ ...config, method })
/* 请求拦截器 */
service.interceptors.request.use(
  (config) => {
    //  伪代码
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => {
    const { code = 200, msg = '', data = response.data } = response.data
    if (code === 200) return { code, data, msg } as any
    else {
      // 处理业务错误。
      // Message.error(message)

      return Promise.reject(new Error(msg))
    }
  },
  (error: AxiosError) => {
    const { code = undefined } = error.response?.data as any
    // message.error(errors[code])
    return Promise.reject(error)
  }
)
export const http = { get: r('get'), post: r('post'), put: r('put'), patch: r('patch'), delete: r('delete') } 
