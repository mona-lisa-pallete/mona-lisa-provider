import instance from '@/lib/request';
import { IResponse } from '@/lib/request.types';
import { IGetProjectReponse, IGetProjectRequest, IAddProjectRequest } from './schema';

const getProjects = async (params: IGetProjectRequest) =>
  instance.request<IGetProjectReponse, IResponse<IGetProjectReponse>>({
    url: '/davinciapi/api/1/provider/project/list',
    params,
    method: 'GET',
  });

const addProject = async (data: IAddProjectRequest) =>
  instance.request<{}, IResponse<{}>>({
    url: '/davinciapi/api/1/provider/project',
    data,
    method: 'POST',
  });

const getProjectUsers = async () =>
  instance.request<string[], IResponse<string[]>>({
    url: '/davinciapi/api/1/provider/project/users',
    method: 'GET',
  });

export { getProjects, addProject, getProjectUsers };
