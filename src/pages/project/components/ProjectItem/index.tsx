import React from 'react';
import {
  ProjectItem as ProjectItemBox,
  ProjectItemHeader,
  ProjectItemIcon,
  ProjectItemInfo,
  ProjectItemInfoItem,
  ProjectItemName,
  MenuBtn,
} from './index.style';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';

const ProjectItem: React.FC = () => {
  const menu = () => {
    return (
      <MenuBtn>
        <Menu.Item key="edit">删除</Menu.Item>
      </MenuBtn>
    );
  };

  return (
    <ProjectItemBox className="project-item-box">
      <ProjectItemHeader>
        <ProjectItemName>OPPO买手机增课领取页面名称过长的情况</ProjectItemName>
        <Dropdown overlay={menu()} className="form-manage-item__btn">
          <ProjectItemIcon>
            <MoreOutlined className="more-icon" style={{ fontSize: '19px' }} />
          </ProjectItemIcon>
        </Dropdown>
      </ProjectItemHeader>
      <ProjectItemInfo>
        <ProjectItemInfoItem>创建人：李雷</ProjectItemInfoItem>
        <ProjectItemInfoItem>创建时间：2021-10-21 13:34:43</ProjectItemInfoItem>
      </ProjectItemInfo>
    </ProjectItemBox>
  );
};

export default ProjectItem;
