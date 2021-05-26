export interface IGetProjectRequest {
  name: string;
  createUserName: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  createUserId: number;
  createUserName: string;
  updateUserId: number;
  updateUserName: string;
  createTime: string;
  updateTime: string;
}

export interface IGetProjectReponse {
  totalCount: number;
  currentPage: number;
  list: ProjectItem[];
}

export interface IAddProjectRequest {
  name: string;
}

export interface ISetProjectRequest {
  name: string;
}
