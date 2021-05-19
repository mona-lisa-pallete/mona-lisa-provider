import React, { useContext, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import EditorContext from '../../context';
import { ActionType } from '../../types';
import ViewportItem from '../ViewportItem';
import { PhoneHeader, ViewportBox, ViewportContainer } from './index.style';
import InsetItem from '../InsetItem';
import DragItem from '../DragItem';
import DvImage from '@/_components/DvImage';
import DvContainer from '@/_components/DvContainer';
import PreviewHeader from '@/assets/img/common/preview-header.png';

const Viewport: React.FC = () => {
  const { state, dispatch } = useContext(EditorContext);
  const [hasDropped, setHasDropped] = useState(false);
  const [{ isStart }, drag] = useDrop(
    {
      accept: 'box',
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        isStart: monitor.canDrop(),
      }),
      drop(item: unknown, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        setHasDropped(!hasDropped);
      },
    },
    [setHasDropped],
  );

  useEffect(() => {
    if (hasDropped) {
      dispatch({
        type: ActionType.AddComponent,
        payload: {
          text: `${new Date().getTime()}`,
          id: new Date().getTime(),
          style: {
            left: 0,
            top: 0,
          },
        },
      });
    }
  }, [hasDropped]);

  useEffect(() => {
    setHasDropped(false);
  }, [state.componentList]);

  const handleSelect = (ref: string) => {
    dispatch({
      type: ActionType.SetSelectedRef,
      payload: {
        ref,
      },
    });
  };

  return (
    <ViewportContainer>
      <PhoneHeader src={PreviewHeader} />
      <ViewportBox ref={drag}>
        {state.dsl.content.map((i, index) => {
          return (
            <>
              {(index + 1) % 2 === 0 && <InsetItem visible={isStart} index={index} />}
              {i.contentType === 'container' && (
                <ViewportItem id={i.elementId} index={index}>
                  <DvContainer>
                    {i?.contentChild &&
                      i.contentChild.map((childItem, childItemIndex) => {
                        return (
                          <DragItem
                            id={childItemIndex}
                            left={childItem?.contentProp?.style?.left}
                            top={childItem?.contentProp?.style?.top}
                            style={{
                              position: 'absolute',
                            }}
                            onSelect={() => {
                              handleSelect(childItem.elementRef!);
                            }}
                          >
                            {childItem.elementRef === 'DvImage' && (
                              <DvImage contentProps={childItem.contentProp} />
                            )}
                          </DragItem>
                        );
                      })}
                  </DvContainer>
                </ViewportItem>
              )}
            </>
          );
        })}
      </ViewportBox>
    </ViewportContainer>
  );
};

export default Viewport;
