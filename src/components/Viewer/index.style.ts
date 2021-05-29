import styled from 'styled-components';

export const ViewerContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.65);
  z-index: 10;
  display: flex;
  flex-direction: column;
  .viewer-title {
    .table-title__text {
      color: #fff;
    }
  }
`;

export const ViewerBottom = styled.div`
  /* height: 135px; */
  width: 100%;
  z-index: 11;
`;
export const ViewerAction = styled.div`
  height: 48px;
  width: 100%;
  background: #242424;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  .scale-value {
    width: 38px;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
  > img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .line {
    width: 1px;
    height: 18px;
    margin-right: 20px;
    border-left: 1px solid #fff;
  }
`;

export const ViewerMain = styled.div`
  flex: 1;
  width: 100%;
  position: relative;
  display: flex;
`;

export const ViewerList = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  background: #242424;
  display: flex;
  transition: 0.3s;
  > div {
    height: 72px;
    white-space: nowrap;
  }
  img {
    width: auto;
    max-width: 136px;
    height: 72px;
    margin-right: 7px;
    object-fit: scale-down;
    &:last-child {
      margin-right: 0;
    }
  }
  video {
    width: auto;
    max-width: 136px;
    height: 72px;
    margin-right: 7px;
    object-fit: scale-down;
    &:last-child {
      margin-right: 0;
    }
  }
  iframe {
    width: auto;
    max-width: 136px;
    height: 72px;
    margin-right: 7px;
    object-fit: scale-down;
    &:last-child {
      margin-right: 0;
    }
  }
`;
export const ViewerDetails = styled.div`
  width: 260px;
  background: #313131;
  height: 100%;
  z-index: 12;
  transition: all 0.3s;
  max-width: 400px;
  min-width: 260px;
`;

export const ViewerFile = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    /* max-width: 1300px; */
  }
  > video {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    max-width: 1000px;
  }
  > iframe {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    width: 1000px;
    height: 500px;
  }
  .action-prev {
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    &:hover {
      background-color: #000;
      border-radius: 50%;
    }
  }
  .action-next {
    z-index: 11;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    &:hover {
      background-color: #000;
      border-radius: 50%;
    }
  }
`;

export const ViewerDetailsInfo = styled.div`
  margin: 16px 16px 0 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #575757;
  font-size: 14px;
  .info-item {
    display: flex;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    &__label {
      flex-shrink: 0;
      min-width: 70px;
      color: rgba(255, 255, 255, 0.7);
    }
    &__value {
      flex: 1;
      overflow: hidden;
      color: #fff;
      white-space: nowrap;
      text-overflow: ellipsis;
      &--material {
        display: flex;
        > img {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .info-material {
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    color: #fff;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
