import React, { useContext, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import EditorContext from '../../context';
import { ActionType } from '../../types';
import ViewportItem from '../ViewportItem';
import { ViewportBox } from './index.style';
import InsetItem from '../InsetItem';
import DragItem from '../DragItem';

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
        },
      });
    }
  }, [hasDropped]);

  useEffect(() => {
    setHasDropped(false);
  }, [state.componentList]);

  return (
    <ViewportBox ref={drag} style={{ background: isStart ? '#FFAA00' : '#FFFFFF' }}>
      {state.componentList.map((i, index) => {
        return (
          <>
            <InsetItem visible={isStart} index={index}>
              <ViewportItem id={i.id} index={index}>
                {i?.child &&
                  i.child.map((childItem: any) => {
                    return (
                      <DragItem
                        left={childItem?.left}
                        top={childItem?.top}
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
    </ViewportBox>
  );
};

export default Viewport;
