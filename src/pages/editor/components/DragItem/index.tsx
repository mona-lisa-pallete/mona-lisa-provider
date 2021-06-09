import React from 'react';
import { DragItemContainer } from './index.style';
import { DragItemProps } from './types';
import './index.less';

const DragItem: React.FC<DragItemProps> = (props) => {
  const { style, active, id } = props;

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
      }}
      id={id}
      active={active}
      className={`drag-item-container ${active ? 'drag-item-container--active' : ''}`}
    >
      {props.children}
    </DragItemContainer>
  );
};
export default DragItem;
