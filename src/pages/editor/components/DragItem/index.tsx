import React from 'react';
import { DragItemContainer } from './index.style';
import { DragItemProps } from './types';
import './index.less';

const DragItem: React.FC<DragItemProps> = (props) => {
  const { style, active, id, onSelect } = props;

  return (
    <DragItemContainer
      // ref={drag}
      style={{
        ...style,
        // display: isDrag ? 'inline-block' : 'block',
        // position: isDrag ? 'absolute' : 'static',
      }}
      id={`${id}`}
      active={active}
      className={`drag-item-container ${active ? 'drag-item-container--active' : ''}`}
      onClick={onSelect}
    >
      {props.children}
    </DragItemContainer>
  );
};
export default DragItem;
