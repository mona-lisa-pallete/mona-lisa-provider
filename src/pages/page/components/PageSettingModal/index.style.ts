import styled from 'styled-components';

export const ShareFormContainer = styled.div`
  display: flex;
`;

export const ShareFormItem = styled.div`
  width: calc(50% - 20px);
  margin-right: 40px;
  &:last-child {
    margin-right: 0;
  }
  textarea {
    height: 80px;
    resize: none;
  }
`;
