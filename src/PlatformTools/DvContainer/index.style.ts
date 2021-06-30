import styled from 'styled-components';

export const DvDiv = styled.div`
  position: relative;
`;

export const DvMask = styled.div<{ active?: boolean }>`
  background: ${(props: any) => (props.active ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.7)')};
  border: 1px solid #ffffff;
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  color: #ffffff;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
