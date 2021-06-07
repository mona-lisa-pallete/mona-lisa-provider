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

const getMaterialCreator = () => {
  return instance.request<string[], IResponse<string[]>>({
    method: 'GET',
    url: `/davinciapi/api/1/provider/material/users`,
  });
};

export { getUserInfo, getMaterialCreator };
