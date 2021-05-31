export interface UserInfo {
  access_token?: string;
  id: number | string;
  phone?: string;
  role?: number;
  status?: number;
  username?: string;
}

export interface IGetUserInfo {
  date: number;
  user: UserInfo;
}
