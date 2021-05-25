import React from 'react';
import ComponentDragItem from '../ComponentDragItem';
import { TabBox, TabItemName } from './index.style';

interface PictureTabProps {
  img: string;
}

const PictureTab: React.FC<PictureTabProps> = (props) => {
  const { img } = props;

  return (
    <TabBox>
      <TabItemName>图片组件</TabItemName>
      <ComponentDragItem name="picture">
        <img
          src={img}
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
