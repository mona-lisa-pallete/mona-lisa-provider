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
  componentName: string;
  contentLength: number;
  id: number;
  materialName: string;
  materialType: string;
  ossUrl: string;
  pageConfigId: number;
}

export interface IAddMaterialRequest {
  materialType: string;
  ossUrl: string;
  materialName?: string;
  pageConfigId?: string;
  componentName?: string;
}

export interface IAddMaterialsResponse {
  id: number;
}

export interface IGetMaterialResponse {
  contentDuration: number;
  contentHeight: number;
  contentLength: number;
  contentMd5: string;
  contentType: string;
  contentWidth: number;
  createTime: string;
  createUserName: string;
  id: number;
  materialName: string;
  materialType: string;
  ossUrl: string;
  updateTime: string;
  updateUserName: string;
}

export interface ISetMaterialRequest {
  materialName: string;
  contentMD5?: string;
}

export interface IAddMaterialsRequest {
  materialType: 'image' | 'video';
  ossUrl: string;
}
