import styled from 'styled-components';

export const PlaceholderImgDiv = styled.div`
  background: #ececec;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  > img {
    width: 28px;
    height: 33px;
    margin-bottom: 5px;
  }
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: rgba(0, 0, 0, 0.25);
`;
