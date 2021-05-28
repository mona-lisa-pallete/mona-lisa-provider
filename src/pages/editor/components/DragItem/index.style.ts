import styled from 'styled-components';

export const DragItemContainer = styled.div<{ active?: boolean }>`
  width: 100%;
  height: 100%;
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    display: ${(props: any) => (props.active ? 'block' : 'none')};
    border: 3px solid #187ffe;
    content: '';
  }
`;
