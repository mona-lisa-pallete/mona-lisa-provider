import instance from '@/lib/request';
import { IResponse } from '@/lib/request.types';

export const getAllActions = async () =>
  instance.request<any, IResponse<Array<{ label: string; type: string }>>>({
    url: '/davinciapi/api/1/platform/action/list',
    method: 'GET',
  });

export const getActionsByTypes = async (data: { types: string[] }) =>
  instance.request<any, IResponse<Array<{ label: string; type: string }>>>({
    url: '/davinciapi/api/1/platform/action/code',
    data,
    method: 'POST',
  });
