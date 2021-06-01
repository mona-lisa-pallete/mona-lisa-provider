import EditorContext from '@/pages/editor/context';
import { ActionType } from '@/pages/editor/types';
import { nanoid } from 'nanoid';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { DvContainerProps } from './types';

const DvContainer: React.FC<DvContainerProps> = (props) => {
  const { index } = props;
  const { state, dispatch } = useContext(EditorContext);
  const [hasDropped, setHasDropped] = useState(false);
  const [elementRef, setElementRef] = useState('');
  const dropRef = useRef(true);

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
  console.log(index);

  console.log(isOverCurrent);

  useEffect(() => {
    if (hasDropped && dropRef.current) {
      const list = state.dsl.content.slice();
      const elementId = nanoid();
      const element = list[index];

      element.contentChild?.push({
        contentType: 'element',
        contentProp: {
          style: {
            // position
          },
        },
        elementId,
        elementRef,
      });

      list[index] = element;

      dispatch({
        type: ActionType.UpdateComponent,
        payload: {
          dsl: {
            content: list,
            action: state.dsl.action,
          },
        },
      });
      // dispatch({
      //   type: ActionType.SetSelectedRef,
      //   payload: {
      //     id: elementId,
      //     ref: elementRef,
      //     containerId,
      //   },
      // });
      dropRef.current = false;
    }
  }, [hasDropped, index, elementRef, state.dsl.content]);

  useEffect(() => {
    setHasDropped(false);
    dropRef.current = true;
    // setHasBoxDropped(false);
  }, [state.dsl]);

  return (
    <div ref={insetDrag} style={props.style}>
      {props.children}
      {/* {index} */}
    </div>
  );
};

export default DvContainer;
