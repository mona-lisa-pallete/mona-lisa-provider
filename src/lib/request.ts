// import Request from '@grfe/utils/dist/request';
import axios from 'axios';
import { message } from 'antd';
import { getApi } from '@/utils/host';

// const requestInstance = new Axios({
//   baseURL: getApi(),
// }).instance;

const requestInstance = axios.create({
  baseURL: getApi(),
  timeout: 1000,
});

requestInstance.interceptors.request.use((config) => {
  return config;
});

requestInstance.interceptors.response.use((response: any) => {
  if (response.code !== 0) {
    message.error(response.msg);
  }
  return response.data;
});

export default requestInstance;
