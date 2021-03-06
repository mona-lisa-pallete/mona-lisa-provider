import { swapArr } from '@/utils/common';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useContext } from 'react';
import EditorContext from '../../context';
import { ActionType } from '../../types';
import { ActionBar, ViewportItemContainer } from './index.style';
// import { useDrop, XYCoord } from 'react-dnd';
// import EditorContext from '../../context';
import './index.less';

const { confirm } = Modal;

interface CardProps {
  id: any;
  index: number;
  actionVisible: boolean;
  active?: boolean;
  onClick?: () => void;
  // moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const ViewportItem: React.FC<CardProps> = (props) => {
  // const ref = useRef<HTMLDivElement>(null);
  const { actionVisible = false, index, active, onClick, id } = props;
  const { state, dispatch } = useContext(EditorContext);
  // const { state } = useContext(EditorContext);

  // const moveBox = (left: number, top: number, i: number) => {
  //   const list = state.componentList.slice();
  //   list[index].child[i].style.left = left;
  //   list[index].child[i].style.top = top;
  // dispatch({
  //   type: ActionType.UpdateComponent,
  //   payload: {
  //     data: [...list],
  //   },
  // });
  // };

  // const [, drop] = useDrop(
  //   () => ({
  //     accept: 'a',
  //     hover(item: any, monitor) {
  //       const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
  //       const left = Math.round(item.left + delta.x);
  //       const top = Math.round(item.top + delta.y);
  //       moveBox(left, top, item.id);
  //     },
  //   }),
  //   [],
  // );

  const handleMove = (targetIndex: number) => {
    const arr = swapArr(state.dsl.content, index, index + targetIndex);
    dispatch({
      type: ActionType.UpdateComponent,
      payload: {
        dsl: {
          content: arr,
          action: state.dsl.action,
        },
      },
    });
  };

  const handleDel = () => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '删除之后暂时无法找回，是否确认删除？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      async onOk() {
        const arr = state.dsl.content.slice();
        arr.splice(index, 1);

        dispatch({
          type: ActionType.SetSelectedRef,
          payload: {
            id: '',
            containerId: '',
            ref: '',
          },
        });

        dispatch({
          type: ActionType.UpdateComponent,
          payload: {
            dsl: {
              content: arr,
              action: state.dsl.action,
            },
          },
        });
      },
    });
  };
  return (
    <ViewportItemContainer
      style={{
        position: 'relative',
        width: '100%',
        // fontSize: '0',
      }}
      className={`${active ? 'viewport-item--active' : ''}`}
      onClick={onClick}
      id={id}
    >
      {props.children}
      {actionVisible && (
        <ActionBar>
          {index !== 0 && (
            <i
              className={`iconicon-arrow-up iconfont`}
              onClick={() => {
                handleMove(-1);
              }}
            />
          )}
          {index !== state.dsl.content.length - 1 && (
            <i
              className={`iconicon-arrow-down iconfont`}
              onClick={() => {
                handleMove(1);
              }}
            />
          )}
          <i className="icon-delete iconfont" onClick={handleDel} />
        </ActionBar>
      )}
      <div className="indicator"></div>
    </ViewportItemContainer>
  );
};
export default ViewportItem;
