import React, { useRef } from 'react';
// import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd';

interface CardProps {
  id: any;
  index: number;
  // moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const ViewportItem: React.FC<CardProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  // const [{ handlerId }, drop] = useDrop({
  //   accept: 'box',
  //   collect(monitor) {
  //     return {
  //       handlerId: monitor.getHandlerId(),
  //     };
  //   },
  //   hover(item: DragItem, monitor: DropTargetMonitor) {
  //     if (!ref.current) {
  //       return;
  //     }
  //     const dragIndex = item.index;
  //     const hoverIndex = index;

  //     // Don't replace items with themselves
  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }e

  //     // Determine rectangle on screen
  //     const hoverBoundingRect = ref.current?.getBoundingClientRect();

  //     // Get vertical middle
  //     const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

  //     // Determine mouse position
  //     const clientOffset = monitor.getClientOffset();

  //     // Get pixels to the top
  //     const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

  //     // Only perform the move when the mouse has crossed half of the items height
  //     // When dragging downwards, only move when the cursor is below 50%
  //     // When dragging upwards, only move when the cursor is above 50%

  //     // Dragging downwards
  //     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
  //       return;
  //     }

  //     // Dragging upwards
  //     if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
  //       return;
  //     }

  //     // Time to actually perform the action
  //     moveCard(dragIndex, hoverIndex);

  //     // Note: we're mutating the monitor item here!
  //     // Generally it's better to avoid mutations,
  //     // but it's good here for the sake of performance
  //     // to avoid expensive index searches.
  //     item.index = hoverIndex;
  //   },
  // });

  // const [{ isDragging }, drag] = useDrag({
  //   type: 'box',
  //   item: () => {
  //     return { id, index };
  //   },
  //   collect: (monitor: any) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });

  // drop(ref);
  return (
    <div
      style={{
        height: '50px',
      }}
      ref={ref}
    >
      {props.children}
    </div>
  );
};
export default ViewportItem;
