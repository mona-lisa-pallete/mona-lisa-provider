import { MaterialType } from '@/pages/material-manage/types';

export interface IGetMaterialsRequest {
  limit: string | number;
  materialType: string;
  page: string | number;
  beginTime?: string;
  createUserId?: string;
  createUserName?: string;
  endTime?: string;
  materialName?: string;
  md5?: string;
  widthMod?: string | number;
  heightMod?: string | number;
}
export interface IGetMaterialsResponse {
  list: IGetMaterialsResponseList[];
  totalCount: number;
}

export interface IGetMaterialsResponseList {
  id: number;
  materialName: string;
  materialType: MaterialType;
  materialVersion: number;
  ossUrl: string;
  contentMd5: string;
  contentCrc64: string;
  contentType: string;
  contentLength: number;
  contentWidth: number;
  contentHeight: number;
  contentDuration: number;
  createUserId: number;
  createUserName: string;
  createTime: string;
  updateUserId: number;
  updateUserName: string;
  updateTime: string;
  status: number;
}

export interface IAddMaterialRequest {
  materialType: string;
  ossUrl: string;
  materialName?: string;
}

export interface IAddMaterialsResponse {
  id: number;
}

export interface IGetMaterialResponse {
  id: number;
  materialName: string;
  materialType: string;
  materialVersion: number;
  ossUrl: string;
  contentMd5: string;
  contentCrc64: string;
  contentType: string;
  contentLength: number;
  contentWidth: number;
  contentHeight: number;
  contentDuration: number;
  createUserId: number;
  createUserName: string;
  createTime: string;
  updateUserId: number;
  updateUserName: string;
  updateTime: string;
  status: number;
}

export interface ISetMaterialRequest {
  materialName: string;
  contentMD5?: string;
}

export interface IAddMaterialsRequest {
  materialType: MaterialType;
  ossUrl: string;
}
