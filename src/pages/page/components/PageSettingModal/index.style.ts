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

export const PageTypeTipsContainer = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    margin-bottom: 10px;
    color: rgba(5, 12, 50, 0.7);
    font-size: 14px;
  }
  .title {
    font-weight: 500;
  }
  .tips-img {
    width: 300px;
    &--first {
      margin-bottom: 20px;
    }
  }
`;
