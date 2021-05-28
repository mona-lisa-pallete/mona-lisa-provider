import instance from '@/lib/request';
import { IResponse } from '@/lib/request.types';
import {
  IGetMaterialsRequest,
  IGetMaterialsResponse,
  IAddMaterialsRequest,
  IAddMaterialsResponse,
  IGetMaterialResponse,
  ISetMaterialRequest,
} from './schema';

const getMaterials = (params: IGetMaterialsRequest) => {
  return instance.request<IGetMaterialsResponse, IResponse<IGetMaterialsResponse>>({
    method: 'GET',
    url: `/davinciapi/api/1/provider/material/list`,
    params,
  });
};

const getMaterial = (id: number) => {
  return instance.request<IGetMaterialResponse, IResponse<IGetMaterialResponse>>({
    method: 'GET',
    url: `/davinciapi/api/1/provider/material/${id}`,
  });
};

const setMaterial = (id: number, data: ISetMaterialRequest) => {
  return instance.request<IGetMaterialResponse, IResponse<IGetMaterialResponse>>({
    method: 'PATCH',
    url: `/davinciapi/api/1/provider/material/${id}`,
    data,
  });
};

const addMaterials = (data: IAddMaterialsRequest[]) => {
  return instance.request<IAddMaterialsResponse, IResponse<IAddMaterialsResponse>>({
    method: 'POST',
    url: `/davinciapi/api/1/provider/material`,
    data,
  });
};

const delMaterial = (id: string | number) => {
  return instance.request<IAddMaterialsResponse, IResponse<IAddMaterialsResponse>>({
    method: 'DELETE',
    url: `/davinciapi/api/1/provider/material/${id}`,
  });
};

export { getMaterials, getMaterial, setMaterial, addMaterials, delMaterial };
