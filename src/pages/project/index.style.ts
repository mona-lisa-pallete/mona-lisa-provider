import { Menu } from 'antd';
import styled from 'styled-components';

export const ProjectContainer = styled.div`
  background: #ffffff;
  border-radius: 4px;
`;

export const ProjectMain = styled.div`
  margin-top: 16px;
  padding: 0 16px;
  .ant-form-item {
    margin-bottom: 16px;
  }
`;

export const ProjectListContainer = styled.div`
  > div {
    margin-right: 10px;
    margin-bottom: 10px;
  }
  font-size: 0;
  @media screen and (min-width: 2401px) {
    .project-item-box {
      width: calc(12.5% - 9px);
      &:nth-child(8n + 0) {
        margin-right: 0;
      }
    }
  }
  @media screen and (max-width: 2400px) and (min-width: 2201px) {
    .project-item-box {
      width: calc(14.2857% - 9px);
      &:nth-child(7n + 0) {
        margin-right: 0;
      }
    }
  }
  @media screen and (max-width: 2200px) and (min-width: 1921px) {
    .project-item-box {
      width: calc(16.666666% - 8.5px);
      &:nth-child(6n + 0) {
        margin-right: 0;
      }
    }
  }
  @media screen and (max-width: 1920px) and (min-width: 1631px) {
    .project-item-box {
      width: calc(20% - 8px);
      &:nth-child(5n + 0) {
        margin-right: 0;
      }
    }
  }
  @media screen and (max-width: 1630px) {
    .project-item-box {
      width: calc(25% - 8px);
      &:nth-child(4n + 0) {
        margin-right: 0;
      }
    }
  }
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
