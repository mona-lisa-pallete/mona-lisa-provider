import instance from '@/lib/request';
import { IResponse } from '@/lib/request.types';
import { IGetPagesRequest, IGetPagesReponse, IUpdatePageRequest } from './schema';

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

const delPage = async (id: string | number) =>
  instance.request<undefined, IResponse<undefined>>({
    url: `/davinciapi/api/1/provider/page/${id}`,
    method: 'DELETE',
  });

const updatePage = async (id: string | number, data: IUpdatePageRequest) =>
  instance.request<undefined, IResponse<undefined>>({
    url: `/davinciapi/api/1/provider/page/${id}`,
    method: 'PATCH',
    data,
  });

export { getPages, getPageUsers, delPage, updatePage };
