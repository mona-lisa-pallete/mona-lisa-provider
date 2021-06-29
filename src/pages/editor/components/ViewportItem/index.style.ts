import styled from 'styled-components';

export const ActionBar = styled.div`
  width: 36px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  left: calc(100% + 10px);
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  i {
    margin-bottom: 10px;
    color: #fff;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .action-bar__disabled {
    &:hover {
      color: #fff;
    }
  }
  /* justify-content: space-between; */
`;

export const ViewportItemContainer = styled.div`
  /* .viewport-item--active {
    &:after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
      display: block;
      border: 2px solid #187ffe;
      content: '';
    }
  } */
`;
