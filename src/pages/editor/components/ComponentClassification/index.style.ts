import styled from 'styled-components';

export const ComponentClassificationContainer = styled.div`
  display: inline-flex;
  vertical-align: top;
  background-color: #fff;
`;

export const ComponentClassificationList = styled.div`
  height: calc(100vh - 48px);
  border-right: 1px solid #e8e9ed;
`;

export const ComponentClassificationItem = styled.div`
  height: 68px;
  width: 64px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(5, 12, 50, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  > i {
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
    height: 24px;
    margin-bottom: 5px;
    color: rgba(5, 12, 50, 0.7);
    font-size: 24px;
  }
  &:hover {
    &:after {
      display: block;
    }
  }
  &:after {
    position: absolute;
    top: 50%;
    left: 0;
    display: none;
    width: 3px;
    height: 22px;
    background: #1980ff;
    border-radius: 0px 100px 100px 0px;
    transform: translateY(-50%);
    content: '';
  }
`;
