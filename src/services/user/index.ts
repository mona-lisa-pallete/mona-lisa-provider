import instance from '@/lib/request';
import { IResponse } from '@/lib/request.types';
import { IGetUserInfo } from './schema';

const getUserInfo = (params: { app: string } = { app: 'portal' }) => {
  return instance.request<IGetUserInfo, IResponse<IGetUserInfo>>({
    method: 'GET',
    url: `/portalapi/api/1/auth/portal_profile_info`,
    params,
  });
};

export { getUserInfo };
