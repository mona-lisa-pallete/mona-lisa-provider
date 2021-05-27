import instance from '@/lib/request';
import { IResponse } from '@/lib/request.types';
import {
  IGetProjectReponse,
  IGetProjectRequest,
  IAddProjectRequest,
  ISetProjectRequest,
} from './schema';

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

const setProject = async (id: string | number, data: ISetProjectRequest) =>
  instance.request<undefined, IResponse<undefined>>({
    url: `/davinciapi/api/1/provider/project/${id}`,
    data,
    method: 'PATCH',
  });

const delProject = async (id: string | number) =>
  instance.request<undefined, IResponse<undefined>>({
    url: `/davinciapi/api/1/provider/project/${id}`,
    method: 'DELETE',
  });

export { getProjects, addProject, getProjectUsers, setProject, delProject };
