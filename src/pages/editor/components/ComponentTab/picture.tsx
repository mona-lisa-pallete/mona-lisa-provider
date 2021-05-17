import React from 'react';
import { TabBox, TabItemName } from './index.style';

const PictureTab: React.FC = () => {
  return (
    <TabBox>
      <TabItemName>图片组件</TabItemName>
      <img
        style={{
          width: '168px',
          height: '168px',
        }}
      />
    </TabBox>
  );
};
export default PictureTab;
