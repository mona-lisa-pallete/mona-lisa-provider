import EditorContext from '@/pages/editor/context';
import { ActionType } from '@/pages/editor/types';
import { nanoid } from 'nanoid';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { DvDiv, DvMask } from './index.style';
import { DvContainerProps } from './types';

const DvContainer: React.FC<DvContainerProps> = (props) => {
  const { index, id } = props;
  const { state, dispatch, setDragContainerId } = useContext(EditorContext);
  const [hasDropped, setHasDropped] = useState(false);
  const [elementRef, setElementRef] = useState('');
  const dropRef = useRef(true);

  const [{ isOverCurrent, isStart }, insetDrag] = useDrop({
    accept: 'drag',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      isStart: monitor.canDrop(),
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
    if (hasDropped && dropRef.current) {
      const list = state.dsl.content.slice();
      const elementId = nanoid();
      const element = list[index];

      element.contentChild?.push({
        contentType: 'element',
        contentProp: {
          style: {
            position: 'absolute',
          },
        },
        elementId,
        elementRef,
      });

      list[index] = element;
      setDragContainerId(state.dsl.content[index].elementId!);
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
          ref: elementRef,
          id: elementId,
          containerId: state.dsl.content[index].elementId,
        },
      });
      dispatch({
        type: ActionType.SetFormData,
        payload: {
          data: {},
        },
      });
      dropRef.current = false;
    }
  }, [hasDropped, index, elementRef, state.dsl.content]);

  useEffect(() => {
    setHasDropped(false);
    dropRef.current = true;
  }, [state.dsl]);

  return (
    <DvDiv ref={insetDrag} className="dv-container" id={id} style={props.style}>
      {props.children}
      {isStart && (
        <DvMask className="inset-box" active={isOverCurrent}>
          放在此处
        </DvMask>
      )}
    </DvDiv>
  );
};

export default DvContainer;
