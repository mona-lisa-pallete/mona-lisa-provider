import React from 'react';
import { useDrag } from 'react-dnd';
import { DragItemProps } from './types';

const DragItem: React.FC<DragItemProps> = (props) => {
  const { left, top, style, id } = props;

  console.log(left, top, 'left');

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

  // if (isDragging) {
  //   return <div ref={drag} />;
  // }

  return (
    <div ref={drag} style={{ ...style, left, top }}>
      {props.children}
    </div>
  );
};
export default DragItem;
