import axios from 'axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import { getStorage, loadingBar, message } from './common'
interface CustomConfig extends AxiosRequestConfig {
  loading?: boolean
}
const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})
let reqCount = 0
// 触发事件
const r =
  (method: string) =>
    <T = any>(config: CustomConfig): Promise<T> =>
      service.request({ loading: true, ...config, method })
/* 请求拦截器 */
service.interceptors.request.use(
  (config) => {
    reqCount++;
    (config as any).loading && loadingBar.start();
    //  伪代码
    const token = getStorage('token')
    if (token) {
      config.headers.Authorization = token;
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => {
    reqCount--;
    const { code = 0, message: msg = '', data = response.data } = response.data as Res;
    (response.config as any).loading && loadingBar.finish();
    console.log('%c [ data ]-31', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    if (!code) return data
    else {
      reqCount || message.error(msg)
      if (code == 9) window.location.hash = '#login'
      return Promise.reject(new Error(msg))
    }
  },
  (error: AxiosError) => {
    loadingBar.error()
    // const { code = undefined } = error.response?.data as any
    console.error(error);

    // message.error(errors[code])
    return Promise.reject(error)
  }
)
export const http = { get: r('get'), post: r('post'), put: r('put'), patch: r('patch'), delete: r('delete') } 
