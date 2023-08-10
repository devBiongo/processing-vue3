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
    if (!response.data) {
      return Promise.reject(
        `Error:${response.config.url} response.data is null or does not exist ！`
      );
    }
    // 获取响应的头部信息
    const contentDisposition = response.headers["content-disposition"];
    const contentType = response.headers["content-type"];

    if (contentDisposition && contentDisposition.includes("attachment")) {
      // 创建 Blob 对象
      const blob = new Blob([response.data], { type: contentType });

      // 创建临时下载链接
      const downloadUrl = URL.createObjectURL(blob);

      // 创建一个隐藏的 <a> 标签用于触发下载
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "downloaded-file"; // 设置下载文件的名称
      document.body.appendChild(link);

      // 触发点击事件以进行下载
      link.click();

      // 移除临时链接
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      return Promise.resolve(response.data);
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
        appNotification("401", "再ログインしてください！");
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
  post(url: string, data: any, config?: any) {
    return new Promise((resolve) => {
      instance
        .post(url, data, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          if (err) {
            message.error(err);
          }
          resolve(undefined);
        });
    });
  },
  get(url: string, config?: any) {
    return new Promise((resolve) => {
      instance
        .get(url, config ? config : {})
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          if (err) {
            message.error(err);
          }
          resolve(undefined);
        });
    });
  },
};
