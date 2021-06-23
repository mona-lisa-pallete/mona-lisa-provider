import styled, { createGlobalStyle } from 'styled-components';

export const ConfirmModalGlobalStyle = createGlobalStyle`
  .confirm-modal {
    .ant-modal-header {
      padding: 13px 0;
    }
    .ant-modal-close {
      height: 48px;
    }
    .ant-modal-close-x {
      height: 100%;
      line-height: 48px;
    }
    .ant-modal-body {
      padding: 20px;
    }
    .ant-modal-footer {
      padding: 0;
    }
  }
`;

export const ConfirmModalFooter = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 16px;
`;
