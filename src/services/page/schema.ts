export interface IGetPagesRequest {
  name: string;
  createUserName: string;
  projectId: string;
  currentPage: string;
  limit: string;
}

export interface PageItem {
  projectId: number;
  page: string;
  name: string;
  createUserId: number;
  createUserName: string;
  updateUserId: number;
  updateUserName: string;
  createTime: string;
  updateTime: string;
  status: number;
  editVersion: number;
  releaseVersion: number;
  releaseUsername: string;
  releaseTime: string;
  thumbnailUrl: string;
}

export interface IGetPagesReponse {
  totalCount: number;
  currentPage: number;
  list: PageItem[];
}
