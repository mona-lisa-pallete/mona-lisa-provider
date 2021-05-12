import React, { useContext } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import EditorContext from '../../context';
import { ActionType } from '../../types';

interface CardProps {
  id: any;
  index: number;
  // moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const ViewportItem: React.FC<CardProps> = (props) => {
  // const ref = useRef<HTMLDivElement>(null);
  const { index } = props;
  const { state, dispatch } = useContext(EditorContext);

  const moveBox = (left: number, top: number, i: number) => {
    const list = state.componentList.slice();
    list[index].child[i].style.left = left;
    list[index].child[i].style.top = top;
    dispatch({
      type: ActionType.UpdateComponent,
      payload: {
        data: [...list],
      },
    });
  };

  const [, drop] = useDrop(
    () => ({
      accept: 'a',
      hover(item: any, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(left, top, item.id);
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
