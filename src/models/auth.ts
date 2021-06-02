/**
 * 不准改 **
 */

import { Reducer } from 'umi';
import { UserInfo } from '@grfe/micro-layout/lib/typings/typing';

export interface UserInfoModelState {
  userInfo: UserInfo | null;
}
export interface IUserInfoModel {
  state: UserInfoModelState;
  reducers: {
    setUserInfo: Reducer<UserInfoModelState>;
  };
}

const defaultState = {
  userInfo: null,
};

const userInfoModel: IUserInfoModel = {
  state: defaultState,
  reducers: {
    setUserInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
export default userInfoModel;
