import Request from '@grfe/utils/dist/request';
import { message } from 'antd';
import { getApi } from '@/utils/host';

const requestInstance = new Request({
  baseURL: getApi(),
}).instance;

requestInstance.interceptors.request.use((config) => {
  return config;
});

requestInstance.interceptors.response.use((response: any) => {
  if (response.code !== 0) {
    message.error(response.msg);
  }
  return response;
});

export default requestInstance;
