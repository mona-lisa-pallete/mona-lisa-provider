import { Dropdown, Menu } from 'antd';
import React from 'react';
import { Status } from './index.style';
import { StatusTagProps, PageStatusType } from './types';

const StatusTag: React.FC<StatusTagProps> = (props) => {
  const { type, edit = false, onChangeStatus } = props;

  const menu = (
    <Menu>
      {type !== PageStatusType.Audit && (
        <Menu.Item
          onClick={() => {
            onChangeStatus && onChangeStatus(PageStatusType.Audit);
          }}
        >
          审核中
        </Menu.Item>
      )}
      <Menu.Item
        onClick={() => {
          onChangeStatus && onChangeStatus(PageStatusType.Online);
        }}
      >
        已上线
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown disabled={!edit} overlayClassName="status-down" overlay={menu}>
      <Status type={type}>
        {type === PageStatusType.Offline && (
          <>
            <i className="icon-notset iconfont" />
            <span>未上线</span>
          </>
        )}
        {type === PageStatusType.Deploy && (
          <>
            <i className="iconicon-clock-circle iconfont" />
            <span>上线中</span>
          </>
        )}
        {type === PageStatusType.Audit && (
          <>
            <i className="iconicon-check-circle iconfont" />
            <span>审核中</span>
          </>
        )}
        {type === PageStatusType.Online && (
          <>
            <i className="iconicon-check-circle iconfont" />
            <span>已上线</span>
          </>
        )}
        {edit && <i className="icon-down iconfont" />}
      </Status>
    </Dropdown>
  );
};

export default StatusTag;
