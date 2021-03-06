import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import EditorContext from '../../context';
import { ActionType, DSLContent } from '../../types';
import { InsetItemBox } from './index.style';
import { InsetItemProps } from './types';
import { nanoid } from 'nanoid';

const InsetItem: React.FC<InsetItemProps> = (props) => {
  const { index, visible, height = '118px', style = {} } = props;
  const { state, dispatch, setActionData, setDragContainerId, handleResize } = useContext(
    EditorContext,
  );
  const [hasDropped, setHasDropped] = useState(false);
  const [elementRef, setElementRef] = useState('');
  const dropRef = useRef(true);

  const [{ isOverCurrent }, insetDrag] = useDrop({
    accept: 'container',
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

  const pushElement = (list: DSLContent[]) => {
    const elementId = nanoid();
    const containerId = nanoid();
    list.push({
      contentType: 'container',
      contentProp: {
        style: {
          position: 'relative',
          width: '100%',
        },
      },
      elementId: containerId,
      elementRef: 'DvDiv',
      contentChild: [
        {
          contentType: 'element',
          contentProp: {
            style: {},
          },
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
      type: ActionType.SetFormData,
      payload: {
        data: {},
      },
    });
    setActionData({});
    setDragContainerId(containerId);
    handleResize('add');
    if (index === -1 || index === -2) {
      dispatch({
        type: ActionType.SetSelectedRef,
        payload: {
          id: elementId,
          ref: elementRef,
          containerId,
        },
      });
    }
  };

  useEffect(() => {
    if (hasDropped && dropRef.current) {
      const isNullData = index === -1;
      const isLast = index === -2;
      const list = state.dsl.content.slice();
      // ?????????
      if (isNullData || isLast) {
        pushElement(list);
        dropRef.current = false;
        return;
      }
      const elementId = nanoid();
      const containerId = nanoid();
      list.splice(index, 0, {
        contentType: 'container',
        contentProp: {
          style: {
            position: 'relative',
            width: '100%',
          },
        },
        elementRef: 'DvDiv',
        elementId: containerId,
        contentChild: [
          {
            contentType: 'element',
            contentProp: {
              style: {},
            },
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
      setDragContainerId(containerId);
      dispatch({
        type: ActionType.SetSelectedRef,
        payload: {
          id: elementId,
          ref: elementRef,
          containerId,
        },
      });
      dispatch({
        type: ActionType.SetFormData,
        payload: {
          data: {},
        },
      });
      handleResize('add');
      setActionData({});
      dropRef.current = false;
    }
  }, [hasDropped, index, elementRef, state.dsl.content]);

  useEffect(() => {
    setHasDropped(false);
    dropRef.current = true;
    // setHasBoxDropped(false);
  }, [state.dsl]);

  return (
    <div
      style={{
        height,
        display: visible ? 'flex' : 'none',
        marginBottom: '20px',
        ...style,
      }}
      className="inset-box"
    >
      <InsetItemBox
        ref={insetDrag}
        style={{
          border: '1px dashed #c0c2cc',
          background: isOverCurrent ? '#F5F5F7' : '#fff',
          height: '100%',
        }}
      >
        ????????????
      </InsetItemBox>
    </div>
  );
};
export default InsetItem;
