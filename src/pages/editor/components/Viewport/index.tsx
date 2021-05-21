import React, { useContext, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import EditorContext from '../../context';
import { ActionType, DSLActionType, DSLContent } from '../../types';
import ViewportItem from '../ViewportItem';
import { PhoneHeader, ViewportBox, ViewportContainer } from './index.style';
import InsetItem from '../InsetItem';
import DragItem from '../DragItem';
import DvImage from '@/_components/DvImage';
import DvContainer from '@/_components/DvContainer';
import PreviewHeader from '@/assets/img/common/preview-header.png';
import { ActionType as ActionFormType } from '../ActionForm/types';

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

  const handleSelect = (ref: string, id: string, data: DSLContent) => {
    dispatch({
      type: ActionType.SetSelectedRef,
      payload: {
        ref,
        id,
      },
    });
    const actionData = state.dsl.action;
    const actionFormData: any = [];
    // eslint-disable-next-line guard-for-in
    for (const eventKey in data.contentProp.event) {
      data.contentProp.event[eventKey].forEach((i) => {
        const isOpen = [
          DSLActionType.openH5,
          DSLActionType.openMini,
          DSLActionType.openPage,
        ].includes(actionData[i].actionType);
        const isModal = actionData[i].actionType === DSLActionType.openModal;
        const obj: any = {
          actionType: '',
        };
        if (isOpen) {
          obj.actionType = ActionFormType.Page;
          obj.pageType = actionData[i].actionType;
        } else if (isModal) {
          obj.actionType = ActionFormType.Modal;
        } else {
          obj.actionType = ActionFormType.Toast;
        }
        actionFormData.push({
          ...obj,
          ...actionData[i].actionProp,
        });
      });
    }
    dispatch({
      type: ActionType.SetFormData,
      payload: {
        data: {
          ...data,
          action: actionFormData,
        },
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
                      i.contentChild.map((childItem) => {
                        return (
                          <DragItem
                            id={childItem.elementId!}
                            left={childItem?.contentProp?.style?.left}
                            top={childItem?.contentProp?.style?.top}
                            style={{
                              position: 'absolute',
                              left: childItem?.contentProp?.style?.left,
                              top: childItem?.contentProp?.style?.top,
                            }}
                            active={childItem.elementId === state.selectedElementId}
                            onSelect={() => {
                              handleSelect(childItem.elementRef!, childItem.elementId!, childItem);
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
