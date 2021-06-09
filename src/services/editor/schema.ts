import { DSL } from '@/pages/editor/types';
import { PlatformType } from '../page/schema';

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
  projectId: number;
}

export interface IAddPageReponse {
  page: string;
}

export interface IGetComponentsReponse {
  id: number;
  ref: string;
  label: string;
  cdnPath: string;
  compMetaUrl: string;
  compUrl: string;
  formMetaUrl: string;
  formUrl: string;
  componentMeta: {
    version: string;
    elementRef: string;
    logo: string;
    label: string;
    eventAttr: Array<{
      alias: string;
      type: string;
    }>;
    propFormConfig: {
      useSystemForm: boolean;
      useCustomForm: boolean;
      customFormRef: string;
    };
  };
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
  dsl: DSL;
  platform: PlatformType[];
  attributes: {
    miniappImmersion: string;
    shareTitle: string;
    shareDescription: string;
    shareImage: string;
    miniappShareTitle: string;
    miniappShareDescription: string;
    miniappShareImage: string;
  };
}
