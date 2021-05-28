import styled from 'styled-components';

export const TableTitleWrap = styled.div`
  display: flex;
  align-items: center;
  .table-title {
    &__icon {
      width: 4px;
      height: 16px;
      margin-right: 8px;
      background: #1980ff;
      border-radius: 2px;
    }
    &__text {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      line-height: 1.3;
    }
  }
`;
