import React, { useContext, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import EditorContext from '../../context';
import { ActionType } from '../../types';
import { InsetItemBox } from './index.style';
import { InsetItemProps } from './types';

const InsetItem: React.FC<InsetItemProps> = (props) => {
  const { index, visible } = props;
  const [hasDropped, setHasDropped] = useState(false);
  const [hasBoxDropped, setHasBoxDropped] = useState(false);
  const { state, dispatch } = useContext(EditorContext);

  const [, drag] = useDrop({
    accept: 'box',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    drop(item: unknown, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      setHasBoxDropped(true);
    },
  });

  const [{ isOverCurrent }, insetDrag] = useDrop({
    accept: 'box',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
    drop(item: unknown, monitor) {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      setHasDropped(true);
    },
  });

  useEffect(() => {
    if (hasDropped) {
      const list = state.componentList.slice();
      list.unshift({
        child: [
          {
            text: `${state.componentList.length}`,
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
          text: `${state.componentList.length}`,
          id: new Date().getTime(),
        });
      } else {
        list[index].child = [
          {
            text: `${state.componentList.length}`,
            id: new Date().getTime(),
          },
        ];
      }
      console.log(list);

      dispatch({
        type: ActionType.InsetBoxComponentAction,
        payload: {
          data: list,
        },
      });
    }
  }, [hasBoxDropped, index]);

  useEffect(() => {
    setHasDropped(false);
    setHasBoxDropped(false);
  }, [state.componentList]);

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
      <div ref={drag}>{props.children}</div>
    </div>
  );
};
export default InsetItem;
