import { PageStatusType } from '@/pages/page/components/StatusTag/types';

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
  id: number;
  projectId: number;
  page: string;
  name: string;
  thumbnailUrl: string;
  webUrl: string;
  miniappCodeUrl: string;
  miniappUrl: string;
  releaseBatch: string;
  templateId: string;
  platform: string[];
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
  webReleaseState: PageStatusType;
  miniappReleaseState: PageStatusType;
}

export interface IGetPagesReponse {
  totalCount: number;
  currentPage: number;
  list: PageItem[];
}

export type PageActionType = 'online' | 'offline' | 'miniappOnline' | 'miniappAudit';

export interface IUpdatePageRequest {
  action?: PageActionType;
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
