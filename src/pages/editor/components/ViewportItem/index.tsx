import { swapArr } from '@/utils/common';
import React, { useContext } from 'react';
import EditorContext from '../../context';
import { ActionType } from '../../types';
import { ActionBar } from './index.style';
// import { useDrop, XYCoord } from 'react-dnd';
// import EditorContext from '../../context';

interface CardProps {
  id: any;
  index: number;
  actionVisible: boolean;
  // moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const ViewportItem: React.FC<CardProps> = (props) => {
  // const ref = useRef<HTMLDivElement>(null);
  const { actionVisible = false, index } = props;
  const { state, dispatch } = useContext(EditorContext);
  // const { state } = useContext(EditorContext);

  // const moveBox = (left: number, top: number, i: number) => {
  //   const list = state.componentList.slice();
  //   list[index].child[i].style.left = left;
  //   list[index].child[i].style.top = top;
  // dispatch({
  //   type: ActionType.UpdateComponent,
  //   payload: {
  //     data: [...list],
  //   },
  // });
  // };

  // const [, drop] = useDrop(
  //   () => ({
  //     accept: 'a',
  //     hover(item: any, monitor) {
  //       const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
  //       const left = Math.round(item.left + delta.x);
  //       const top = Math.round(item.top + delta.y);
  //       moveBox(left, top, item.id);
  //     },
  //   }),
  //   [],
  // );

  const handleMove = (targetIndex: number) => {
    const arr = swapArr(state.dsl.content, index, index + targetIndex);
    dispatch({
      type: ActionType.UpdateComponent,
      payload: {
        dsl: {
          content: arr,
          action: state.dsl.action,
        },
      },
    });
  };

  const handleDel = () => {};
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      {props.children}
      {actionVisible && (
        <ActionBar>
          {index !== 0 && (
            <i
              className="iconicon-arrow-up iconfont"
              onClick={() => {
                handleMove(-1);
              }}
            />
          )}
          {index !== state.dsl.content.length - 1 && (
            <i
              className="iconicon-arrow-down iconfont"
              onClick={() => {
                handleMove(1);
              }}
            />
          )}
          <i className="icon-delete iconfont" onClick={handleDel} />
        </ActionBar>
      )}
    </div>
  );
};
export default ViewportItem;
