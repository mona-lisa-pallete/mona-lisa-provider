export interface IAddPreviewRequest {
  page: string;
  dsl: string;
}

export interface IAddPreviewReponse {
  url: string;
}

export interface IAddPageRequest {
  page: string;
  dsl: any;
  name: string;
}

export interface IAddPageReponse {}

export interface IGetComponentsReponse {
  id: number;
  ref: string;
  label: string;
  cdnPath: string;
}

export interface IGetPageReponse {
  projectId: number;
  page: string;
  name: string;
  thumbnailUrl: string;
  createUserId: number;
  createUserName: string;
  updateUserId: number;
  updateUserName: string;
  createTime: string;
  updateTime: string;
  status: number;
  dsl: any;
}
