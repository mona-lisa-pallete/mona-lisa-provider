import React, { useContext, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import EditorContext from '../../context';
import { ActionType } from '../../types';
import { InsetItemBox } from './index.style';
import { InsetItemProps } from './types';

const InsetItem: React.FC<InsetItemProps> = (props) => {
  const { index, visible } = props;
  const { state, dispatch } = useContext(EditorContext);
  const [hasDropped, setHasDropped] = useState(false);
  const [hasBoxDropped, setHasBoxDropped] = useState(false);
  const [dragType, setDragType] = useState('');

  const [{ isBoxOverCurrent }, drag] = useDrop({
    accept: 'box',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isBoxOverCurrent: monitor.isOver({ shallow: true }),
    }),
    drop(item: any, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      setDragType(item?.name);
      setHasBoxDropped(true);
    },
  });

  const [{ isOverCurrent }, insetDrag] = useDrop({
    accept: 'box',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    drop(item: any, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      setDragType(item?.name);
      setHasDropped(true);
    },
  });

  useEffect(() => {
    if (hasDropped) {
      const list = state.componentList.slice();
      list.splice(index, 0, {
        child: [
          {
            text: `${dragType}${Math.ceil(Math.random() * 10)}`,
            id: new Date().getTime(),
          },
        ],
      });
      dispatch({
        type: ActionType.InsetComponent,
        payload: {
          data: list,
        },
      });
    }
  }, [hasDropped, index]);

  useEffect(() => {
    if (hasBoxDropped) {
      const list = state.componentList.slice();
      if (list[index].child) {
        list[index].child.push({
          text: `${dragType}${Math.ceil(Math.random() * 10)}`,
          id: new Date().getTime(),
        });
      } else {
        list[index].child = [
          {
            text: `${dragType}${Math.ceil(Math.random() * 10)}`,
            id: new Date().getTime(),
          },
        ];
      }
      dispatch({
        type: ActionType.InsetBoxComponentAction,
        payload: {
          data: list,
        },
      });
    }
  }, [hasBoxDropped, index]);

  // useEffect(() => {
  //   setHasDropped(false);
  //   setHasBoxDropped(false);
  // }, [state.componentList]);

  return (
    <div>
      <InsetItemBox
        ref={insetDrag}
        style={{
          border: isOverCurrent ? '1px solid blue' : 'none',
          display: visible ? 'block' : 'none',
        }}
      >
        插入此处
      </InsetItemBox>
      <div
        ref={drag}
        style={{
          border: isBoxOverCurrent ? '1px solid red' : 'none',
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
export default InsetItem;
