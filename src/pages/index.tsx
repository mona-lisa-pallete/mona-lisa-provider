import React, { useEffect } from 'react';
import { history } from 'umi';

const HomeEntrance: React.FC = () => {
  useEffect(() => {
    history.push('/project');
  }, []);

  return <div />;
};

export default HomeEntrance;
