import React, { useContext, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import EditorContext from '../../context';
import { ActionType } from '../../types';
import { InsetItemBox } from './index.style';
import { InsetItemProps } from './types';
import { nanoid } from 'nanoid';

const InsetItem: React.FC<InsetItemProps> = (props) => {
  const { index, visible, height = '118px', style = {} } = props;
  const { state, dispatch } = useContext(EditorContext);
  const [hasDropped, setHasDropped] = useState(false);
  const [hasBoxDropped] = useState(false);
  const [elementRef, setElementRef] = useState('');

  // const [{ isBoxOverCurrent }, drag] = useDrop({
  //   accept: 'box',
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //     isBoxOverCurrent: monitor.isOver({ shallow: true }),
  //   }),
  //   drop(item: any, monitor) {
  //     const didDrop = monitor.didDrop();
  //     if (didDrop) {
  //       return;
  //     }
  //     setElementRef(item?.name);
  //     setHasBoxDropped(true);
  //   },
  // });

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
      setElementRef(item?.name);
      setHasDropped(true);
    },
  });

  useEffect(() => {
    if (hasDropped) {
      console.log(2222222);

      const isNullData = index === -1;
      const list = state.dsl.content.slice();
      if (isNullData) {
        const elementId = nanoid();
        list.push({
          contentType: 'container',
          contentProp: {
            style: {
              position: 'relative',
              width: '100%',
              height: '118px',
            },
          },
          elementRef: 'DavinciDiv',
          contentChild: [
            {
              contentType: 'element',
              contentProp: {},
              elementId,
              elementRef,
            },
          ],
        });
        dispatch({
          type: ActionType.UpdateComponent,
          payload: {
            dsl: {
              content: list,
              action: state.dsl.action,
            },
          },
        });
        dispatch({
          type: ActionType.SetSelectedRef,
          payload: {
            id: elementId,
            ref: elementRef,
          },
        });
      }
      //   const list = state.dsl.content;
      //   list.splice(index, 0, {
      //     child: [
      //       {
      //         text: `${dragType}${Math.ceil(Math.random() * 10)}`,
      //         id: new Date().getTime(),
      //       },
      //     ],
      //   });
      //   dispatch({
      //     type: ActionType.InsetComponent,
      //     payload: {
      //       data: list,
      //     },
      //   });
    }
  }, [hasDropped, index, elementRef, state.dsl.content]);

  useEffect(() => {
    if (hasBoxDropped) {
      const list = state.dsl.content;
      console.log(list);

      // if (list[index].child) {
      //   list[index].child.push({
      //     text: `${dragType}${Math.ceil(Math.random() * 10)}`,
      //     id: new Date().getTime(),
      //   });
      // } else {
      //   list[index].child = [
      //     {
      //       text: `${dragType}${Math.ceil(Math.random() * 10)}`,
      //       id: new Date().getTime(),
      //     },
      //   ];
      // }
      // dispatch({
      //   type: ActionType.InsetBoxComponentAction,
      //   payload: {
      //     data: list,
      //   },
      // });
    }
  }, [hasBoxDropped, index]);

  // useEffect(() => {
  //   setHasDropped(false);
  //   setHasBoxDropped(false);
  // }, [state.componentList]);

  return (
    <div
      style={{
        height,
        display: visible ? 'flex' : 'none',
        marginBottom: '20px',
        ...style,
      }}
    >
      <InsetItemBox
        ref={insetDrag}
        style={{
          border: '1px dashed #c0c2cc',
          background: isOverCurrent ? '#F5F5F7' : '#fff',
          height: '100%',
        }}
      >
        放在此处{`${visible}`}
      </InsetItemBox>
      {/* <div
        ref={drag}
        style={{
          border: isBoxOverCurrent ? '1px solid #c0c2cc' : 'none',
        }}
      >
        {props.children}
      </div> */}
    </div>
  );
};
export default InsetItem;
