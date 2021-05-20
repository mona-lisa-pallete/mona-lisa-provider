import React from 'react';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { ComponentDragItemProps } from './types';

const ComponentDragItem: React.FC<ComponentDragItemProps> = (props) => {
  const { name } = props;
  const [, drag] = useDrag(
    () => ({
      type: 'box',
      item: { name },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name],
  );
  return <div ref={drag}>{props.children}</div>;
};

export default ComponentDragItem;
