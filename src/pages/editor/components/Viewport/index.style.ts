import styled from 'styled-components';

export const ViewportBox = styled.div`
  width: 375px;
  min-height: 627px;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.08);
  border-radius: 4px 4px 0px 0px;
  margin-bottom: 16px;
`;

export const DragBox = styled.div`
  position: absolute;
`;

export const PhoneHeader = styled.img`
  display: block;
  width: 375px;
  height: auto;
  margin-top: 16px;
  background-color: #fff;
`;

export const ViewportContainer = styled.div`
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  max-height: calc(100vh - 50px);
`;
