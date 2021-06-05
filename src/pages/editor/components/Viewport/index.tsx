import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import EditorContext from '../../context';
import { ActionType } from '../../types';
import ViewportItem from '../ViewportItem';
import { PhoneHeader, ViewportBox, ViewportContainer } from './index.style';
import InsetItem from '../InsetItem';
import DragItem from '../DragItem';
// import DvImage from '@/_components/DvImage';
import DvContainer from '@/_components/DvContainer';
import PreviewHeader from '@/assets/img/common/preview-header.png';
// import { ActionType as ActionFormType } from '../ActionForm/types';
import { CompLoader } from './comp-loader';
import Draggable, { DraggableData } from 'react-draggable';
import { changeElementStyleById } from '../../utils';

const Viewport: React.FC = () => {
  const { state, dispatch } = useContext(EditorContext);
  const [hasDropped, setHasDropped] = useState(false);
  const [, setDropName] = useState('');
  const boxRef = useRef(null);
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
        const itemData = monitor.getItem() as any;
        setDropName(itemData.name);
        setHasDropped(!hasDropped);
      },
    },
    [setHasDropped],
  );

  useEffect(() => {
    if (hasDropped) {
      // dispatch({
      //   type: ActionType.AddComponent,
      //   payload: {
      //     text: `${new Date().getTime()}`,
      //     id: new Date().getTime(),
      //     style: {
      //       left: 0,
      //       top: 0,
      //     },
      //   },
      // });
    }
  }, [hasDropped]);

  useEffect(() => {
    if (state.dsl.content) {
      setHasDropped(false);
    }
  }, [state.dsl.content]);

  useEffect(() => {
    setTimeout(() => {
      const imgList = boxRef.current?.querySelectorAll('img');
      if (imgList?.length) {
        for (let i = 0; i < imgList.length; i++) {
          const dom = imgList[i] as HTMLImageElement;
          dom.draggable = false;
        }
      }
    }, 1000);
  }, [state.dsl.content]);

  const handleSelect = (ref: string, id: string, data: any, containerId: string) => {
    dispatch({
      type: ActionType.SetSelectedRef,
      payload: {
        ref,
        id,
        containerId,
      },
    });
    dispatch({
      type: ActionType.SetFormData,
      payload: {
        data: {
          ...data.contentProp,
        },
      },
    });
  };

  const isNullData = state.dsl.content.length === 0;
  const isLast = state.dsl.content.length > 0;

  const handleItemEvent = (_: any, data: DraggableData, id: string) => {
    const content = changeElementStyleById(id, state.dsl.content, {
      left: data.lastX * 2,
      top: data.lastY * 2,
    });
    dispatch({
      type: ActionType.UpdateComponent,
      payload: {
        dsl: {
          content,
          action: state.dsl.action,
        },
      },
    });
    // console.log(data.lastX, data.lastY);
    // console.log(data.deltaX, data.deltaY);
    // console.log(data.x, data.y);
  };

  return (
    <ViewportContainer ref={boxRef}>
      <PhoneHeader src={PreviewHeader} />
      <ViewportBox className="viewport-box" ref={drag}>
        {isNullData && <InsetItem height="605px" visible={isStart} index={-1} />}
        {state?.dsl?.content?.map((i, index) => {
          return (
            <div key={i.elementId}>
              <InsetItem key={`${i.elementId}inset`} visible={isStart} index={index} />
              <div
                style={{
                  width: '100%',
                }}
              >
                {i.contentType === 'container' && (
                  <ViewportItem
                    actionVisible={state.selectedContainerId === i.elementId}
                    id={i.elementId}
                    index={index}
                    active={state.selectedContainerId === i.elementId}
                    onClick={() => {
                      if (i.contentChild?.[0]?.elementId) {
                        const child = i.contentChild?.[0];
                        handleSelect(child.elementRef!, child.elementId!, child, i.elementId!);
                      }
                    }}
                  >
                    <DvContainer index={index} style={i.contentProp.style}>
                      {i?.contentChild &&
                        i.contentChild.map((childItem) => {
                          return (
                            <Draggable
                              bounds="parent"
                              onStop={(e, data) => {
                                handleItemEvent(e, data, childItem.elementId!);
                              }}
                              key={childItem.elementId}
                            >
                              <div
                                style={{
                                  display: 'inline-block',
                                  position: 'absolute',
                                }}
                                key={childItem.elementId}
                                id={childItem.elementId}
                              >
                                <DragItem
                                  id={childItem.elementId!}
                                  active={state.selectedElementId === childItem.elementId}
                                  onSelect={(e) => {
                                    e.stopPropagation();
                                    handleSelect(
                                      childItem.elementRef!,
                                      childItem.elementId!,
                                      childItem,
                                      i.elementId!,
                                    );
                                  }}
                                  style={childItem.contentProp.style}
                                >
                                  <CompLoader
                                    elementRef={childItem.elementRef!}
                                    contentProps={childItem.contentProp}
                                  />
                                </DragItem>
                              </div>
                            </Draggable>
                          );
                        })}
                    </DvContainer>
                  </ViewportItem>
                )}
              </div>
            </div>
          );
        })}
        {isLast && <InsetItem style={{ flex: 1 }} visible={isStart} index={-2} />}
      </ViewportBox>
    </ViewportContainer>
  );
};

export default Viewport;
