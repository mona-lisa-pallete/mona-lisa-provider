import { Dropdown, Menu } from 'antd';
import React from 'react';
import { Status } from './index.style';
import { StatusTagProps, StatusType } from './types';

const StatusTag: React.FC<StatusTagProps> = (props) => {
  const { type, edit = false } = props;

  const menu = (
    <Menu>
      <Menu.Item>审核中</Menu.Item>
      <Menu.Item>已上线</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown disabled={!edit} overlay={menu}>
      <Status type={type}>
        {type === StatusType.Primary && (
          <>
            <i className="icon-notset iconfont" />
            <span>未上线</span>
          </>
        )}
        {type === StatusType.Warning && (
          <>
            <i className="iconicon-clock-circle iconfont" />
            <span>上线中</span>
          </>
        )}
        {type === StatusType.Success && (
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
