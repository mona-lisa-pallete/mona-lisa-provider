import React, { useEffect } from 'react';
import { history } from 'umi';

const HomeEntrance: React.FC = () => {
  useEffect(() => {
    history.push('/editor');
  }, []);

  return <h1>davinci-provider</h1>;
};

export default HomeEntrance;
