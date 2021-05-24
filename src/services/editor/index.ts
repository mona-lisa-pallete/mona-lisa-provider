import instance from '@/lib/request';
import { IResponse } from '@/lib/request.types';
import {
  IAddPreviewRequest,
  IAddPreviewReponse,
  IAddPageReponse,
  IAddPageRequest,
  IGetComponentsReponse,
} from './schema';

const addPreviewPage = async (data: IAddPreviewRequest) =>
  instance.request<IAddPreviewReponse, IResponse<IAddPreviewReponse>>({
    url: '/davinciapi/api/1/provider/dsl/temp',
    data,
    method: 'POST',
  });

const addPage = async (data: IAddPageRequest) =>
  instance.request<IAddPageReponse, IResponse<IAddPageReponse>>({
    url: '/davinciapi/api/1/provider/dsl',
    data,
    method: 'POST',
  });

const getComponents = async () => {
  return instance.request<IGetComponentsReponse, IResponse<IGetComponentsReponse>>({
    url: '/davinciapi/api/1/platform/component',
    method: 'GET',
  });
};

/**
 * 模拟通过 api 获取组件 meta
 * @param elementRef
 * @returns
 */
const getCompMeta = async (elementRef: string) => {
  return fetch(`http://127.0.0.1:22111/${elementRef}.json`).then((res) => res.json());
};

export { addPreviewPage, addPage, getComponents, getCompMeta };
