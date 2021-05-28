import instance from '@/lib/request';
import { IResponse } from '@/lib/request.types';
import { getDllApi } from '@/utils/host';
import {
  IAddPreviewRequest,
  IAddPreviewReponse,
  IAddPageReponse,
  IAddPageRequest,
  IGetComponentsReponse,
  IGetPageReponse,
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
  return instance.request<IGetComponentsReponse[], IResponse<IGetComponentsReponse[]>>({
    url: '/davinciapi/api/1/platform/component',
    method: 'GET',
  });
};

const getPage = async (id: string | number) =>
  instance.request<IGetPageReponse, IResponse<IGetPageReponse>>({
    url: `/davinciapi/api/1/provider/page/${id}`,
    method: 'GET',
  });

/**
 * 模拟通过 api 获取组件 meta
 * @param elementRef
 * @returns
 */
const getCompMeta = async (elementRef: string) => {
  return fetch(`${getDllApi()}/${elementRef}.json`).then((res) => res.json());
};

export { addPreviewPage, addPage, getComponents, getCompMeta, getPage };
