import instance from '@/lib/request';
import { IResponse } from '@/lib/request.types';
import { IAddPreviewRequest, IAddPreviewReponse, IAddPageReponse, IAddPageRequest } from './schema';

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

export { addPreviewPage, addPage };
