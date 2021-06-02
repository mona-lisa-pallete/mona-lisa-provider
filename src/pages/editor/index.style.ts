import styled from 'styled-components';

export const EditorMain = styled.div`
  display: flex;
`;

export const EditorConfig = styled.div`
  width: 320px;
  background: #ffffff;
  .ant-tabs-tabpane {
    padding: 0 16px;
  }
  .ant-form-item {
    margin-bottom: 20px;
  }
`;

export const FormSubTitle = styled.div`
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(5, 12, 50, 0.9);
  margin-bottom: 10px;
`;

export const DelText = styled.span`
  color: #f5222d;
`;
