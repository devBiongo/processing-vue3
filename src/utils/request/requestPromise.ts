import type {
    AxiosInstance,
    InternalAxiosRequestConfig
  } from 'axios'
   
  // 下面响应结果的结构为普遍使用，但可根据你们公司自己规则来定
  interface Result<T = any> {
    code: number | string
    msg?: string
    message?: string
    data: T
  }
   
  // 默认格式下的post
  export const postPromise = (service: AxiosInstance, url: string, params: any): Promise < Result > =>
    new Promise((resolve, reject) => {
      service
        .post(url, params)
        .then((response) => resolve(response.data))
        .catch((err) => {
          reject(err)
        })
    })
   
  // 表单格式下的post
  export const formPostPromise = (service: AxiosInstance, url: string, params: any): Promise < any > =>
    new Promise((resolve, reject) => {
      const formdata = new FormData()
      for (const [k, v] of Object.entries(params)) {
        formdata.append(k, v as string)
      }
      service
        .post(url, formdata)
        .then((response) => {
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
   
  // 默认格式下的get
  export const getPromise = (service: AxiosInstance, url: string, params: any): Promise < Result > =>
    new Promise((resolve, reject) => {
      console.log(url,params)
      service
        .get(url)
        .then((response) => {
          console.log(123,response)
          resolve(response.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
   
  // 默认格式下的导出文件 post类型
  export const postExportPromise = (service: AxiosInstance, url: string, params: any): Promise < any > =>
    new Promise((resolve, reject) => {
      service({
          method: 'post',
          url: url,
          data: {
            ...params
          },
          responseType: 'blob'
        })
        .then((response) => {
          const res = response.data
          const filename = decodeURI(response.headers['content-disposition'].split(';')[1].split('filename=')[1])
          resolve({
            res,
            filename
          })
        })
        .catch((err) => {
          reject(err)
        })
    })
   
  // 默认格式下的导出文件 get类型
  export const exportPromise = (service: AxiosInstance, url: string, params: any): Promise < any > =>
    new Promise((resolve, reject) => {
      service({
          method: 'get',
          url: url,
          params,
          responseType: 'blob'
        })
        .then((response) => {
          const res = response.data
          try {
            const filename = decodeURI(response.headers['content-disposition'] ?.split(';')[1].split('filename=')[1])
            const blob = new Blob([res])
            const downloadElement = document.createElement('a')
            const href = window.URL.createObjectURL(blob) //创建下载的链接
            downloadElement.href = href
            downloadElement.download = filename //下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() //点击下载
            document.body.removeChild(downloadElement) //下载完成移除元素
            window.URL.revokeObjectURL(href) //释放掉blob对象
            resolve({
              res,
              filename
            })
          } catch (error) {
            console.log(error)
            reject({
              res,
              filename: ''
            })
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
   
  // 表单格式下的上传文件
  export const uploadPromise = (service: AxiosInstance, url: string, files: Blob, config?: InternalAxiosRequestConfig<any>): Promise < any > =>
    new Promise((resolve, reject) => {
      config && (config.headers['Content-Type'] = 'multipart/form-data')
   
      service
        .post(url, files, config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          console.log(err, 'err')
          reject(err)
        })
    })