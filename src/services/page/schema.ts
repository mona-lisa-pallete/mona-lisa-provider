export interface IGetPagesRequest {
  name: string;
  createUserName: string;
  projectId: string;
  currentPage: string;
  limit: string;
}

export enum PlatformType {
  WEB = 'WEB',
  MINIAPP = 'MINIAPP',
}

export enum MiniPageStyle {
  Default = 'none',
  SemiImmersion = 'half',
  Immersion = 'full',
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
  status: 1 | 0;
  editVersion: number;
  releaseVersion: number;
  releaseUsername: string;
  releaseTime: string;
  thumbnailUrl: string;
  platform: PlatformType[];
}

export interface IGetPagesReponse {
  totalCount: number;
  currentPage: number;
  list: PageItem[];
}

export interface IUpdatePageRequest {
  action?: 'online' | 'offline';
  name?: string;
  attributes?: {
    miniappImmersion?: MiniPageStyle;
    shareTitle?: string;
    shareDescription?: string;
    shareImage?: string;
    miniappShareTitle?: string;
    miniappShareDescription?: string;
    miniappShareImage?: string;
  };
}
