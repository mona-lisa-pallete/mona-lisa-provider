import React from 'react';
import { useDrag } from 'react-dnd';
import { DragItemProps } from './types';

const DragItem: React.FC<DragItemProps> = (props) => {
  const { left, top, style, id, onSelect, active } = props;

  const [, drag] = useDrag(
    () => ({
      type: 'a',
      item: { left, top, id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [left, top, id],
  );

  return (
    <div
      ref={drag}
      style={{
        ...style,
        left: `${left}px`,
        top: `${top}px`,
        border: active ? '3px solid #187FFE' : 'none',
      }}
      onClick={onSelect}
    >
      {props.children}
    </div>
  );
};
export default DragItem;
