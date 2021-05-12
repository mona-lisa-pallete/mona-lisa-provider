import styled from 'styled-components';

export const PageHeaderContainer = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
  position: relative;
  &::after {
    position: absolute;
    bottom: 0;
    left: 16px;
    width: calc(100% - 38px);
    border-top: 1px solid #e8e9ed;
    content: '';
  }
`;

export const PageHeaderTitle = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 600;
  color: rgba(3, 12, 52, 0.9);
  align-items: center;
`;

export const TitleIcon = styled.div`
  width: 4px;
  height: 16px;
  background: #0082ff;
  border-radius: 0px 2px 2px 0px;
  margin-right: 8px;
`;
