import React from 'react';
import { useDrag } from 'react-dnd';
import { DragItemProps } from './types';

const DragItem: React.FC<DragItemProps> = (props) => {
  const { left, top, style } = props;

  const [, drag] = useDrag(
    () => ({
      type: 'a',
      item: { left, top },
    }),
    [left, top],
  );

  return (
    <div ref={drag} style={{ ...style, left, top }}>
      {props.children}
    </div>
  );
};
export default DragItem;
