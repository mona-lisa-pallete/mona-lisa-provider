import React from 'react';
import ComponentDragItem from '../ComponentDragItem';
import { TabBox, TabItemName } from './index.style';

interface PictureTabProps {
  img: string;
  label: string;
  name: string;
}

const ComponentTab: React.FC<PictureTabProps> = (props) => {
  const { img, label, name } = props;

  return (
    <TabBox>
      <TabItemName>{label}</TabItemName>
      <ComponentDragItem name={name}>
        <img
          src={img}
          style={{
            width: '168px',
          }}
        />
      </ComponentDragItem>
    </TabBox>
  );
};
export default ComponentTab;
