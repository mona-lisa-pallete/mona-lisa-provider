import instance from '@/lib/request';
import { IResponse } from '@/lib/request.types';
import {
  IGetMaterialsRequest,
  IGetMaterialsResponse,
  IAddMaterialsRequest,
  IAddMaterialRequest,
  IAddMaterialsResponse,
  IGetMaterialResponse,
  ISetMaterialRequest,
} from './schema';

const getMaterials = (params: IGetMaterialsRequest) => {
  return instance.request<IGetMaterialsResponse, IResponse<IGetMaterialsResponse>>({
    method: 'GET',
    url: `/enrollmentapi/api/1/landing_page/material`,
    params,
  });
};

const addMaterial = (data: IAddMaterialRequest) => {
  return instance.request<IAddMaterialsResponse, IResponse<IAddMaterialsResponse>>({
    method: 'POST',
    url: `/enrollmentapi/api/1/landing_page/material`,
    data,
  });
};

const getMaterial = (id: number) => {
  return instance.request<IGetMaterialResponse, IResponse<IGetMaterialResponse>>({
    method: 'GET',
    url: `/enrollmentapi/api/1/landing_page/material/${id}`,
  });
};

const setMaterial = (id: number, data: ISetMaterialRequest) => {
  return instance.request<IGetMaterialResponse, IResponse<IGetMaterialResponse>>({
    method: 'PUT',
    url: `/enrollmentapi/api/1/landing_page/material/${id}`,
    data,
  });
};

const addMaterials = (data: IAddMaterialsRequest[]) => {
  return instance.request<IAddMaterialsResponse, IResponse<IAddMaterialsResponse>>({
    method: 'POST',
    url: `/enrollmentapi/api/1/landing_page/materials`,
    data,
  });
};

const delMaterial = (id: string | number) => {
  return instance.request<IAddMaterialsResponse, IResponse<IAddMaterialsResponse>>({
    method: 'DELETE',
    url: `/enrollmentapi/api/1/landing_page/material/${id}`,
  });
};

export { getMaterials, addMaterial, getMaterial, setMaterial, addMaterials, delMaterial };
