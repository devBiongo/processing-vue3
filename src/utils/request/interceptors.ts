import type {
  AxiosResponse,
  AxiosError,
  AxiosPromise,
  InternalAxiosRequestConfig,
} from "axios";
import { message as AntdMessage } from "ant-design-vue";

// 下面响应结果的结构为普遍使用，但可根据你们公司自己规则来定
interface Result<T = any> {
  code: number | string;
  msg?: string;
  message?: string;
  data: T;
}

export const requestInterceptors =
  (requestHook: any) =>
  (
    config: InternalAxiosRequestConfig<any>
  ): InternalAxiosRequestConfig<any> => {
    requestHook && requestHook(config);
    return config;
  };

export const requestInterceptorsCatch =
  (requestCatchHook: any) =>
  (error: AxiosError): AxiosPromise => {
    requestCatchHook && requestCatchHook(error);
    return Promise.reject(error);
  };

export const responseInterceptors =
  (responseHook: any, responseCallback: any) =>
  (response: AxiosResponse): any => {
    responseCallback && responseCallback(response);
    console.log('responseInterceptors',response)
    if (response.config.responseType == "blob") {
      return Promise.resolve(response);
    } 
    const result: Result = response.data;
    if (!result) {
      const message = `Error：${response.config.url} response.data is null or does not exist ！`;
      AntdMessage.error(message);
      return Promise.reject(message);
      // 接口响应code码我默认1或者200是正常响应，这个值根据你们后端的逻辑来定噢
    }
    if (result.code === 200) {
      result.data === null && console.warn(response);
      return Promise.resolve(response);
    } 
    return Promise.reject(response);
  };

export const responseInterceptorsCatch =
  (responseCatchHook: any, responseCallback: any) =>
  (error: AxiosError): AxiosPromise => {
    console.log('responseInterceptorsCatch',{error})
    responseCallback && responseCallback(error);
    if (error && error.response) {
      // 以下外部状态码是常规普遍使用的噢~你也可以根据你们公司自己逻辑来定
      switch (error.response.status) {
        case 400:
          error.message = "请求错误(400)";
          break;
        case 401:
          error.message = "未授权，请重新登录(401)";
          break;
        case 403:
          if (error.response.data &&(error.response.data as any).code === 5001) {
            error.message = (error.response.data as any).msg;
          } else {
            error.message = "拒绝访问(403)";
          }
          break;
        case 404:
          error.message = "请求出错(404)";
          break;
        case 408:
          error.message = "请求超时(408)";
          break;
        case 500:
          error.message = "服务器错误(500)";
          break;
        case 501:
          error.message = "服务未实现(501)";
          break;
        case 502:
          error.message = "网络错误(502)";
          break;
        case 503:
          error.message = "服务不可用(503)";
          break;
        case 504:
          error.message = "网络超时(504)";
          break;
        case 505:
          error.message = "HTTP版本不受支持(505)";
          break;
        default:
          error.message = `连接出错(${error.response.status})!`;
      }
    }

    if (error.message && error.message.indexOf("timeout") !== -1) {
      error.message = "请求超时";
    }

    if (error.response?.data && (error.response.data as any).code === 5001) {
      // 过期
      return responseCatchHook && responseCatchHook(error);
    }

    error.message && AntdMessage.error(error.message);

    return Promise.reject({ ...error.response });
  };
