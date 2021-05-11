import React from 'react';
import { useDrop, XYCoord } from 'react-dnd';

interface CardProps {
  id: any;
  index: number;
  // moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const ViewportItem: React.FC<CardProps> = (props) => {
  // const ref = useRef<HTMLDivElement>(null);
  // const { index } = props;

  const [, drop] = useDrop(
    () => ({
      accept: 'a',
      drop(item: any, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        // const left = Math.round(item.left + delta.x);
        // const top = Math.round(item.top + delta.y);
        // moveBox(item.id, left, top);
        console.log(delta.x, delta.y);

        return undefined;
      },
    }),
    [],
  );
  return (
    <div
      style={{
        height: '50px',
        position: 'relative',
      }}
      ref={drop}
    >
      {props.children}
    </div>
  );
};
export default ViewportItem;
