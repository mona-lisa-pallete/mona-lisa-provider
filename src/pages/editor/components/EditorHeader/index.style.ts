import { Button } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

export const EditorHeaderContainer = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  width: 100vw;
  position: relative;
  z-index: 11;
  background: #ffffff;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 0 16px;
  justify-content: space-between;
`;

export const PageList = styled.div`
  width: 146px;
  max-height: 544px;
  overflow-y: auto;
`;

export const PageItem = styled.div`
  padding: 8px 0;
  &:hover {
    background-color: #f5f5f7;
  }
`;

export const PageItemImg = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-right: 10px;
  margin-bottom: 4px;
  > img {
    width: 105px;
    height: 59px;
    border-radius: 2px;
  }
  > span {
    display: inline-block;
    flex: 1;
    padding-right: 10px;
    text-align: right;
  }
`;

export const PageItemName = styled.div`
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(5, 12, 50, 0.7);
  padding-left: 30px;
`;

export const PagePopover = createGlobalStyle`
  .page-popover {
    .ant-popover-inner-content {
      padding: 16px 0;
    }
  }
  .page-message {
    padding-top: 150px;
  }
`;

export const PagePopoverBtn = styled(Button)`
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
`;

export const CreatePageBtn = styled(Button)`
  display: flex;
  align-items: center;
  padding: 6px 10px;
  margin: 0 auto 8px auto;
`;

export const BackBtn = styled(Button)`
  display: inline-flex;
  align-items: center;
`;

export const ActionBox = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  .ant-btn {
    color: #1980ff;
    border: 1px solid #1980ff;
  }
  .ant-btn-primary {
    color: #fff;
  }
`;

export const PageNameBox = styled.div`
  font-size: 16px;
  color: rgba(5, 12, 50, 0.9);
  flex: 1;
  text-align: center;
  font-weight: 500;
  .ant-input {
    border: none;
    border-bottom: 1px solid #d9d9d9;
  }
`;

export const PageHeaderCol = styled.div`
  display: flex;
  flex: 1;
  > img {
    box-sizing: border-box;
    width: 99px;
    height: auto;
    padding-right: 16px;
    border-right: 1px solid #dadbe1;
  }
`;

export const SaveBtn = styled(Button)`
  width: 84px;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #1980ff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #1980ff;
  margin-right: 10px;
  i {
    height: 23px;
    margin-left: 3px;
  }
`;
