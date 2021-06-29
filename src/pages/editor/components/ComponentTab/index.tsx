import React from 'react';
import { isDragTarget } from '../../utils';
import ComponentDragItem from '../ComponentDragItem';
import { TabBox, TabItemName } from './index.style';

interface PictureTabProps {
  img: string;
  label: string;
  name: string;
}

const ComponentTab: React.FC<PictureTabProps> = (props) => {
  const { img, label, name } = props;
  const type = isDragTarget(name) ? 'drag' : 'container';
  return (
    <TabBox>
      <TabItemName>{label}</TabItemName>
      <ComponentDragItem type={type} name={name}>
        <img
          src={img}
          className="dv-drag-logo"
          style={{
            width: '168px',
          }}
        />
      </ComponentDragItem>
    </TabBox>
  );
};
export default ComponentTab;
