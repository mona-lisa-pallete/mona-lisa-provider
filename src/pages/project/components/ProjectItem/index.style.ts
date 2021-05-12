import styled from 'styled-components';
import { Menu } from 'antd';

export const ProjectItem = styled.div`
  width: 268px;
  background: #fefefe;
  border-radius: 4px;
  border: 1px solid #dadbe2;
  display: inline-block;
`;

export const ProjectItemName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: rgba(5, 12, 50, 0.9);
  margin-right: 9px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ProjectItemHeader = styled.div`
  height: 64px;
  box-sizing: border-box;
  padding: 10px 12px 10px 16px;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #dadbe2;
`;

export const ProjectItemIcon = styled.div`
  width: 24px;
  height: 24px;
  background: #fff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  &:hover {
    background: #f5f5f7;
  }
  .more-icon {
    cursor: pointer;
  }
`;

export const ProjectItemInfo = styled.div`
  background: #fefefe;
  padding: 12px 0 12px 16px;
`;

export const ProjectItemInfoItem = styled.div`
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(5, 12, 50, 0.45);
`;

export const MenuBtn = styled(Menu)`
  width: 94px;
  .ant-dropdown-menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 400;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
  }
  .menu-item--del {
    color: #ff6f6f;
  }
`;
