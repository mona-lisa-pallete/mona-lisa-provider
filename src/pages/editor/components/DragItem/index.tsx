import React from 'react';
import { DragItemContainer } from './index.style';
import { DragItemProps } from './types';
import './index.less';

const DragItem: React.FC<DragItemProps> = (props) => {
  const { left, top, style, onSelect, active } = props;

  // const [, drag] = useDrag(
  //   () => ({
  //     type: 'a',
  //     item: { left, top, id },
  //     collect: (monitor) => ({
  //       isDragging: monitor.isDragging(),
  //     }),
  //   }),
  //   [left, top, id],
  // );
  return (
    <DragItemContainer
      // ref={drag}
      style={{
        ...style,
        left: `${left}px`,
        top: `${top}px`,
        position: 'static',
        // border: active ? '3px solid #187FFE' : '3px solid rgba(0,0,0,0)',
      }}
      onClick={(e) => {
        onSelect(e);
      }}
      active={active}
      className={`drag-item-container ${active ? 'drag-item-container--active' : ''}`}
    >
      {props.children}
    </DragItemContainer>
  );
};
export default DragItem;
