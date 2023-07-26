import { message } from "ant-design-vue";
import axios, { AxiosError } from "axios";
// import qs from "qs";
import { getToken } from "./auth";
import { appNotification } from "./notification";

const baseUrl = "/api";
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 5 * 1000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) config.headers.Authorization = "Bearer " + token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // console.log("responseInterceptor", response);
    if (!response.data) {
      return Promise.reject(
        `Error:${response.config.url} response.data is null or does not exist ！`
      );
    }
    if (response.config.responseType == "blob") {
      return Promise.resolve(response.data);
    }
    if (response.data.code !== 200) {
      return Promise.reject(`${response.data.message}(${response.data.code})`);
    }
    return Promise.resolve(response.data);
  },
  (error: AxiosError) => {
    // console.log("responseInterceptorCatch", error);
    switch (error.response?.status) {
      case 400:
        error.message = "请求错误(400)";
        break;
      case 401:
        error.message = "";
        appNotification("未授权，请重新登录(401)","再ログインしてください！");
        break;
      case 403:
        if (error.response.data) {
          error.message = (error.response.data as any).message;
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
        error.message = `连接出错`;
    }
    if (error.message && error.message.indexOf("timeout") !== -1) {
      error.message = "请求超时";
    }
    return Promise.reject(error.message);
  }
);

export default {
  post(url: string, data: any) {
    return new Promise((resolve) => {
      instance
        .post(url, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          if(err){
            message.error(err);
          }
          resolve(undefined);
        });
    });
  },
  get(url: string) {
    return new Promise((resolve) => {
      instance
        .get(url)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          if(err){
            message.error(err);
          }
          resolve(undefined);
        });
    });
  },
};
