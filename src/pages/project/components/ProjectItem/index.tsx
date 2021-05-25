import React from 'react';
import {
  ProjectItem as ProjectItemBox,
  ProjectItemHeader,
  ProjectItemIcon,
  ProjectItemInfo,
  ProjectItemInfoItem,
  ProjectItemName,
} from './index.style';
import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { ProjectItemProps } from './types';

const ProjectItem: React.FC<ProjectItemProps> = (props) => {
  const { actionRender, onClick, name, createTime, createUserName } = props;

  return (
    <ProjectItemBox onClick={onClick} className="project-item-box">
      <ProjectItemHeader>
        <ProjectItemName>{name}</ProjectItemName>
        <Dropdown overlay={actionRender} className="form-manage-item__btn">
          <ProjectItemIcon>
            <MoreOutlined className="more-icon" style={{ fontSize: '19px' }} />
          </ProjectItemIcon>
        </Dropdown>
      </ProjectItemHeader>
      <ProjectItemInfo>
        <ProjectItemInfoItem>创建人：{createUserName}</ProjectItemInfoItem>
        <ProjectItemInfoItem>创建时间：{createTime}</ProjectItemInfoItem>
      </ProjectItemInfo>
    </ProjectItemBox>
  );
};

export default ProjectItem;
