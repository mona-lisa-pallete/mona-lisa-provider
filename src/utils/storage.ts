import { UserInfo } from '@/services/user/schema';

enum LocalKey {
  USER_INFO = 'userInfo',
}

enum SessionKey {}

enum SetStorageMethod {
  SetUserInfo = 'setUserInfo',
}

enum GetStorageMethod {
  GetUserInfo = 'getUserInfo',
}

interface ISetStorageMethod {
  setUserInfo: (data: string) => void;
}

interface IGetStorageMethod {
  getUserInfo: () => null | UserInfo;
}

const setStorageData: ISetStorageMethod = {
  setUserInfo(data: string) {
    localStorage.setItem(LocalKey.USER_INFO, data);
  },
};

const getStorageData: IGetStorageMethod = {
  getUserInfo() {
    const data = localStorage.getItem(LocalKey.USER_INFO);
    if (!data) {
      return null;
    }
    return JSON.parse(data);
  },
};

const setStorage = (method: SetStorageMethod) => {
  const fun = setStorageData[method];
  return fun!;
};

const getStorage = (method: GetStorageMethod) => {
  const fun = getStorageData[method];
  return fun!;
};

export { LocalKey, SessionKey, setStorage, SetStorageMethod, getStorage, GetStorageMethod };
