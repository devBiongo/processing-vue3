import axios from 'axios'
import NProgress from 'nprogress'
import { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } from './interceptors'
import { getPromise, formPostPromise, postPromise, exportPromise, uploadPromise, postExportPromise } from './requestPromise'
 
import type { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import session from '@/utils/SessionUtil'

const baseUrl = '/api' 
const service: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10 * 1000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 请求前的处理
const requestHook = function (config: InternalAxiosRequestConfig<any>) {
  NProgress.start()
  const token = session.get('token')
  if (token) config.headers.Authorization = "Bearer " + token;
}
// 请求前的错误处理
const requestCatchHook = function (error: AxiosError) {
  // for debug
  console.log(error, 'requestCatchHook') 
}
 
// 过期回调
const responseExpireHook = function (response: AxiosResponse) {
  // 过期回调处理 此处写你自己的逻辑
  return response
}
 
// 响应完成回调
const responseFinishCallback = function () {
  NProgress.done()
}

// 请求拦截器
service.interceptors.request.use(requestInterceptors(requestHook), requestInterceptorsCatch(requestCatchHook))
 
// 响应拦截器
service.interceptors.response.use(
  responseInterceptors(responseExpireHook, responseFinishCallback),
  responseInterceptorsCatch(responseExpireHook, responseFinishCallback)
)
 
export const get = (url: string, params?: any) => getPromise(service, url, params)
export const post = (url: string, params?: any) => postPromise(service, url, params)
export const formPost = (url: string, params?: any) => formPostPromise(service, url, params)
export const exportExcel = (url: string, params: any) => exportPromise(service, url, params)
export const upload = (url: string, files: Blob, config?: InternalAxiosRequestConfig<any>) => uploadPromise(service, url, files, config)
export const postExcel = (url: string, paramss: any) => postExportPromise(service, url, paramss)
 
export default service