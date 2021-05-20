import React from 'react';
import ComponentDragItem from '../ComponentDragItem';
import { TabBox, TabItemName } from './index.style';

const PictureTab: React.FC = () => {
  return (
    <TabBox>
      <TabItemName>图片组件</TabItemName>
      <ComponentDragItem name="componentDrag">
        <img
          style={{
            width: '168px',
            height: '168px',
          }}
        />
      </ComponentDragItem>
    </TabBox>
  );
};
export default PictureTab;
