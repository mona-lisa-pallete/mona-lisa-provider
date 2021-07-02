import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import EditorContext from '../../context';
import { ActionType } from '../../types';
import ViewportItem from '../ViewportItem';
import { PhoneHeader, ViewportBox, ViewportContainer } from './index.style';
import InsetItem from '../InsetItem';
import DragItem from '../DragItem';
// import DvImage from '@/PlatformTools/DvImage';
import DvContainer from '@/PlatformTools/DvContainer';
import PreviewHeader from '@/assets/img/common/preview-header.png';
// import { ActionType as ActionFormType } from '../ActionForm/types';
import { CompLoader } from './comp-loader';
import { changeElementStyleById, isDragTarget } from '../../utils';
import Draggable, { DraggableData } from 'react-draggable';

interface ViewportProps {
  onSelectEntity?: (payload: { ref: string; id: string; containerId: string }) => void;
}

const Viewport: React.FC<ViewportProps> = ({ onSelectEntity }) => {
  const { state, dispatch, setDragContainerId } = useContext(EditorContext);
  const [hasDropped, setHasDropped] = useState(false);
  const [, setDropName] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);
  const [{ isStart }, drag] = useDrop(
    {
      accept: 'container',
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

    onSelectEntity?.({
      ref,
      id,
      containerId,
    });
    // console.log(data.contentProp, 'data.contentProp');

    dispatch({
      type: ActionType.SetFormData,
      payload: {
        data: {
          ...data.contentProp,
        },
      },
    });
  };

  const handleItemEvent = (_: any, data: DraggableData, id: string) => {
    const parentRect = data.node.parentElement?.getBoundingClientRect();
    const rect = data.node.getBoundingClientRect();
    const left = rect?.left - parentRect!.left;
    const top = rect?.top - parentRect!.top;
    const content = changeElementStyleById(id, state.dsl.content, {
      left,
      top,
    });
    // console.log(left, top, 'data');
    data.node.parentElement?.getBoundingClientRect();
    dispatch({
      type: ActionType.UpdateComponent,
      payload: {
        dsl: {
          content,
          action: state.dsl.action,
        },
      },
    });
  };

  const isNullData = state.dsl.content.length === 0;
  const isLast = state.dsl.content.length > 0;

  return (
    <ViewportContainer ref={boxRef}>
      <PhoneHeader src={PreviewHeader} />
      <ViewportBox className="viewport-box" ref={drag}>
        {isNullData && <InsetItem height="605px" visible={isStart} index={-1} />}
        {state?.dsl?.content?.map((i, index) => {
          return (
            <div className="container-item" key={i.elementId}>
              <InsetItem key={`${i.elementId}inset`} visible={isStart} index={index} />
              <div
                style={{
                  width: '100%',
                }}
              >
                {i.contentType === 'container' && (
                  <ViewportItem
                    id={i.elementId}
                    actionVisible={state.selectedContainerId === i.elementId}
                    index={index}
                    active={state.selectedContainerId === i.elementId}
                    onClick={() => {
                      if (i.contentChild?.[0]?.elementId) {
                        const child = i.contentChild?.[0];
                        setDragContainerId(i.elementId!);
                        handleSelect(child.elementRef!, child.elementId!, child, i.elementId!);
                      }
                    }}
                  >
                    <DvContainer id={i.elementId!} index={index} style={i.contentProp.style}>
                      {i?.contentChild &&
                        i.contentChild.map((childItem) => {
                          return (
                            <Draggable
                              bounds="parent"
                              disabled={!isDragTarget(childItem.elementRef!)}
                              onStop={(e, data) => {
                                handleItemEvent(e, data, childItem.elementId!);
                              }}
                              defaultPosition={{
                                x: (childItem.contentProp?.style?.left as number) || 0,
                                y: (childItem?.contentProp?.style?.top as number) || 0,
                              }}
                              key={childItem.elementId}
                            >
                              <div
                                style={{
                                  display: isDragTarget(childItem.elementRef!)
                                    ? 'inline-block'
                                    : 'block',
                                  position: isDragTarget(childItem.elementRef!)
                                    ? 'absolute'
                                    : 'static',
                                  top: 0,
                                  left: 0,
                                }}
                                id={childItem.elementId}
                              >
                                <DragItem
                                  id={`${childItem.elementId}2`}
                                  onSelect={(e) => {
                                    e.stopPropagation();
                                    handleSelect(
                                      childItem.elementRef!,
                                      childItem.elementId!,
                                      childItem,
                                      i.elementId!,
                                    );
                                  }}
                                  active={state.selectedElementId === childItem.elementId}
                                >
                                  <CompLoader
                                    elementRef={childItem.elementRef!}
                                    contentProps={{
                                      ...childItem.contentProp,
                                      style: {
                                        ...childItem.contentProp.style,
                                        position: 'static',
                                      },
                                    }}
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
