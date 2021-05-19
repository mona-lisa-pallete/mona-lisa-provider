import instance from '@/lib/request';
import { IResponse } from '@/lib/request.types';
import { OssUploadPolicy } from './schema';

const getUploadPolicy = async (params: { dirPath: string; customFilename?: boolean }) =>
  instance.request<OssUploadPolicy, IResponse<OssUploadPolicy>>({
    url: '/auth/api/1/oss/policy',
    params,
  });

export { getUploadPolicy };
