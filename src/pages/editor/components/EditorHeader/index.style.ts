import styled, { createGlobalStyle } from 'styled-components';

export const EditorHeaderContainer = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  width: 100vw;
  background: #ffffff;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 0 16px;
  > img {
    box-sizing: border-box;
    width: 99px;
    height: auto;
    padding-right: 16px;
    border-right: 1px solid #dadbe1;
  }
`;

export const PageList = styled.div`
  width: 146px;
  height: 544px;
`;

export const PageItem = styled.div`
  &:hover {
    background-color: #f5f5f7;
  }
`;

export const PageItemImg = styled.div`
  display: flex;
  align-items: center;
`;

export const PageItemName = styled.div`
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(5, 12, 50, 0.7);
`;

export const PagePopover = createGlobalStyle`
  .page-popover {
    .ant-popover-inner-content {
      padding: 16px;
    }
  }
`;
