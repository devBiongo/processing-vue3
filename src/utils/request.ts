import { message } from "ant-design-vue";
import axios from "axios";
import qs from "qs";
import { getToken } from "./auth";

const instance = axios.create({ baseURL: "/api", timeout: 10000 });
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
    console.log(1,response)
    // 响应状态码处理
    if (![200, 304, 400].includes(response.status)) {
      return Promise.reject("ネットワーク異常");
    }
    // 业务码处理
    if (response.data.code !== 200) {
      return Promise.reject(response.data.message);
    }
    // 正常则返回数据
    return Promise.resolve(response.data.data);
  },
  (response) => {
    return Promise.reject(response.response.data.message);
  }
);

export default {
  post(url: string, data: any) {
    return instance({
      method: "post",
      url,
      data,
    }).catch((error) => {
      message.error(error);
    });
  },
  get(url: string, params?: any) {
    return instance({
      method: "get",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      url,
      params: qs.stringify(params), // get 请求时带的参数
    }).catch((error) => {
      message.error(error);
    });
  },
};
