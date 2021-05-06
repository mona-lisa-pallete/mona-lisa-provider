import React from 'react';
import { useAsync } from 'react-use';
import { getConfigDataForTest } from '@/services';

const HomeEntrance: React.FC = () => {
  useAsync(async () => {
    const res = await getConfigDataForTest();
    console.log('%celelee test:', 'background:#000;color:#fff', res);
    return res;
  }, []);

  return <h1>davinci-provider</h1>;
};

export default HomeEntrance;
