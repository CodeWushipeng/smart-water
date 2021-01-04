import axios from 'axios';
import { MessageBox, Message, Loading } from 'element-ui';
import router from '../router/index';
import store from '../store/index';
import qs from "qs"
let request = axios.create({
  timeout: 8000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  baseURL: process.env.VUE_APP_API,
});
request.interceptors.request.use(
  config => {
    // loadingSever = Loading.service({
    //   lock: true,
    // });
    config.headers.token = store.state.token;
    config.data = qs.stringify(config.data);
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(new Error(error).message);
  }
);

request.interceptors.response.use(
  res => {
    // loadingSever.close();
    if (res.data.code == 0) {
      console.log(res.data);
      return res.data;
    } else if (res.data.code == 3002){
      Message.error("登录已过期，请重新登录")
      router.replace("/login")
    } else {
      console.log(res);
      Message.error(res.data.msg);
      return Promise.reject(res.data);
    }
  },
  error => {
    // loadingSever.close();
    console.log(error);
    Message.error("网络错误");
    return Promise.reject(new Error(error).message);
  }
);

export default request;
