import React from 'react';
import { DragItemContainer } from './index.style';
import { DragItemProps } from './types';

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
        // border: active ? '3px solid #187FFE' : '3px solid rgba(0,0,0,0)',
      }}
      onClick={onSelect}
      active={active}
    >
      {props.children}
    </DragItemContainer>
  );
};
export default DragItem;
