import instance from '@/lib/request';
import { IResponse } from '@/lib/request.types';
import { IAddPreviewRequest, IAddPreviewReponse } from './schema';

const addPreview = async (data: IAddPreviewRequest) =>
  instance.request<IAddPreviewReponse, IResponse<IAddPreviewReponse>>({
    url: '/davinciapi/api/1/provider/dsl',
    data,
    method: 'POST',
  });

export { addPreview };
