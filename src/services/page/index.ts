import instance from '@/lib/request';
import { IResponse } from '@/lib/request.types';
import { IGetPagesRequest, IGetPagesReponse } from './schema';

const getPages = async (params: IGetPagesRequest) =>
  instance.request<IGetPagesReponse, IResponse<IGetPagesReponse>>({
    url: '/davinciapi/api/1/provider/page/list',
    params,
    method: 'GET',
  });

const getPageUsers = async () =>
  instance.request<string[], IResponse<string[]>>({
    url: '/davinciapi/api/1/provider/page/users',
    method: 'GET',
  });

export { getPages, getPageUsers };
