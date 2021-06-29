import styled from 'styled-components';

export const PreviewModalRoot = styled.div`
  .preview-modal {
    &__mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 13;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.65);
      .preview-close {
        position: absolute;
        top: 23px;
        right: 23px;
        font-size: 23px;
        cursor: pointer;
      }
    }
  }
`;

export const PreviewPhone = styled.div`
  position: relative;
  width: 375px;
  height: 710px;
`;

export const PreviewPhoneBG = styled.img`
  width: 100%;
  height: auto;
  min-height: 548px;
  min-width: 278px;
  max-width: 360px;
`;

export const PreviewPhoneContainer = styled.div`
  position: relative;
  width: 375px;
  height: 710px;
  > iframe {
    position: absolute;
    top: 110px;
    left: 20px;
    width: 330px;
    height: 530px;
    /* width: 89%; */
    /* height: 80%; */
  }
`;

export const SelectBox = styled.div`
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  .ant-dropdown-trigger {
    color: rgba(5, 12, 50, 0.7);
    font-size: 14px;
  }
`;

export const PreviewQRContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PreviewQRItem = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 128px;
    height: 128px;
    margin-right: 26px;
  }
  &:first-child {
    margin-bottom: 97px;
  }
`;

export const PreviewQRInfo = styled.div``;

export const PreviewQRName = styled.div`
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 10px;
`;

export const PreviewQRLink = styled.div`
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  max-width: 120px;
  margin-bottom: 23px;
`;

export const PreviewQRAction = styled.div`
  .ant-btn {
    &:first-child {
      margin-right: 16px;
    }
  }
`;
