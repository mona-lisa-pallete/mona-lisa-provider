import { Form } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

export const PageContainer = styled.div`
  background: #ffffff;
  border-radius: 4px;
`;

export const PageMain = styled.div`
  margin-top: 16px;
  padding: 0 16px;
`;

export const PageInfo = styled.div`
  display: inline-flex;
`;

export const PageImg = styled.div`
  width: 125px;
  height: 75px;
  overflow: hidden;
  margin-right: 16px;
  display: inline-block;
  flex-shrink: 0;
  &:hover {
    .page-img {
      transform: translateY(calc(-100% + 75px));
    }
  }
  .page-img {
    width: 125px;
    height: auto;
    transition: 2s;
  }
  .ant-image {
    width: 125px;
    height: 75px;
    overflow: hidden;
    transition: 2s;
  }
`;

export const PageDetail = styled.div`
  flex: 1;
`;

export const PageName = styled.div`
  font-size: 14px;
  height: 44px;
  overflow: hidden;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(5, 12, 50, 0.9);
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const PageAction = styled.div`
  display: flex;
  .ant-btn {
    padding: 0;
  }
`;

export const PageTag = styled.div`
  .mini {
    color: #52c41a;
    border: 1px solid #b7dd9b;
  }
  .h5 {
    color: #1980ff;
    border: 1px solid #97c6ff;
  }
`;

export const CopyForm = styled(Form)`
  .ant-form-item {
    margin-bottom: 16px;
  }
`;

export const Point = styled.div<{ online?: boolean }>`
  width: 8px;
  height: 8px;
  background: ${(props: any) => (props.online ? '#52c41a' : '#C0C2CC')};
  border-radius: 50%;
  margin-right: 12px;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TableActionMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > .ant-btn {
    width: 100%;
  }
`;

export const PagePopoverStyle = createGlobalStyle`
  .table-action-menu {
    .ant-popover-inner-content {
      padding: 4px 0;
      min-width: 96px;
    }
    .ant-btn {
      width: 96px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(5, 12, 50, 0.7);
      &:hover {
        background-color: #F5F5F7;
      }
    }
  }
`;

export const TableActionCol = styled.div`
  .ant-btn {
    height: auto;
    padding: 0 12px;
    line-height: 1.3;
    border-right: 1px solid #e8e9ed;
    &:last-child {
      border-right: none;
    }
  }
`;
