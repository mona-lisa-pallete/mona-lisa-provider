import { useState, useEffect } from 'react';
import { getUserInfo } from '@/services/user';
import { UserInfo } from '@/services/user/schema';
import { setStorage, SetStorageMethod, getStorage, GetStorageMethod } from '@/utils/storage';
import cookie from 'js-cookie';

export default function useUserModel() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(() => {
    const data = getStorage(GetStorageMethod.GetUserInfo)();
    if (!data) {
      const id = cookie.get('portal_uid')!;
      return {
        id,
      };
    }
    return data;
  });

  const getData = async () => {
    const res = await getUserInfo();
    if (res.code === 0) {
      setUserInfo(res.data.user);
      const data = JSON.stringify(res.data.user);
      setStorage(SetStorageMethod.SetUserInfo)(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    userInfo,
  };
}
