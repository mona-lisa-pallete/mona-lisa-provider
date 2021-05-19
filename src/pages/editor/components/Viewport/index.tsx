import React, { useContext, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import EditorContext from '../../context';
import { ActionType } from '../../types';
import ViewportItem from '../ViewportItem';
import { ViewportBox } from './index.style';
import InsetItem from '../InsetItem';
import DragItem from '../DragItem';
import DvImage from '@/_components/DvImage';
import DvContainer from '@/_components/DvContainer';

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
    console.log(state.componentList);
  }, [state.componentList]);

  return (
    <ViewportBox ref={drag}>
      {state.componentList.map((i, index) => {
        return (
          <>
            <InsetItem visible={isStart} index={index}>
              <ViewportItem id={i.id} index={index}>
                {i?.child &&
                  i.child.map((childItem: any, childItemIndex: number) => {
                    return (
                      <DragItem
                        id={childItemIndex}
                        left={childItem?.style?.left}
                        top={childItem?.style?.top}
                        style={{
                          position: 'absolute',
                        }}
                      >
                        {childItem.text}
                      </DragItem>
                    );
                  })}
              </ViewportItem>
            </InsetItem>
          </>
        );
      })}
      <DvContainer>
        <DvImage
          contentProps={{
            url:
              'https://static-zy-com.oss-cn-hangzhou.aliyuncs.com//kbase/portallandingpage/assets/rc-upload-1616675028067-2.jpeg',
          }}
        />
      </DvContainer>
    </ViewportBox>
  );
};

export default Viewport;
