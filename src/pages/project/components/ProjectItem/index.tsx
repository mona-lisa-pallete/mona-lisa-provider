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
  const { actionRender, onClick } = props;

  return (
    <ProjectItemBox onClick={onClick} className="project-item-box">
      <ProjectItemHeader>
        <ProjectItemName>OPPO买手机增课领取页面名称过长的情况</ProjectItemName>
        <Dropdown overlay={actionRender} className="form-manage-item__btn">
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
