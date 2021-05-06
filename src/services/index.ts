import Request from '@grfe/utils/dist/request';

const request = new Request({});

request.setResInterceptor(response => {
  // setting your request interceptor
  return response;
});

const publicPath = '/portalapi/api/1/business_config';

export const getConfigDataForTest = async () =>
  request.get<any>(`${publicPath}/get_config_data`, { key: 'group_manage_level' });

export default request;
