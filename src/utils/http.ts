import axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { loadingBar, message } from './common'
const service = axios.create({
  baseURL: '/api',
  timeout: 3000
})
const r =
  (method: string) =>
    <T = any>(config: AxiosRequestConfig): Promise<T> =>
      service.request({ ...config, method })
/* 请求拦截器 */
service.interceptors.request.use(
  (config) => {
    loadingBar.start()
    //  伪代码
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token;
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => {
    const { code = 0, message: msg = '', data = response.data } = response.data as Res
    loadingBar.finish()
    console.log('%c [ data ]-31', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    if (!code) return data
    else {
      message.error(msg)
      if (code == 9) sessionStorage.setItem('no-login', 'true')
      return Promise.reject(new Error(msg))
    }
  },
  (error: AxiosError) => {
    loadingBar.error()
    const { code = undefined } = error.response?.data as any
    // message.error(errors[code])
    return Promise.reject(error)
  }
)
export const http = { get: r('get'), post: r('post'), put: r('put'), patch: r('patch'), delete: r('delete') } 
