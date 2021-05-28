import styled from 'styled-components';

export const UploadButton = styled.div`
  > span {
    font-size: 22px;
  }
  .upload-text {
    color: #050c32;
    font-weight: 400;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    > span {
      color: #1980ff;
    }
  }
  .upload-tips {
    color: rgba(5, 12, 50, 0.45);
    font-weight: 400;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
  }
`;

export const FileListItem = styled.div`
  margin-bottom: 11px;
  padding-bottom: 11px;
  border-bottom: 1px solid rgba(216, 216, 216, 0.25);
  position: relative;
  .file-item-main {
    display: flex;
    align-items: center;
    .file-item__name {
      display: flex;
      flex-grow: 1;
      flex-shrink: 1;
      align-items: center;
      margin-right: 30px;
      overflow: hidden;
      &-text {
        display: -webkit-box;
        flex-shrink: 1;
        padding-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      > img {
        flex-shrink: 0;
        width: 16px;
        height: 16px;
      }
    }
    .file-item__action {
      padding: 0;
      color: #ff6f6f;
      font-weight: 400;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
    }
    > img {
      width: 92px;
      height: 52px;
      margin-right: 6px;
      object-fit: cover;
    }
    > video {
      width: 92px;
      height: 52px;
      margin-right: 6px;
    }
  }
  .file-item__progress {
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
  }
`;

export const UploadContainer = styled.div`
  padding: 35px;
  min-height: 100vh;
  box-sizing: border-box;
`;

export const FileList = styled.div`
  margin-top: 15px;
  height: calc(100vh - 220px);
  box-sizing: border-box;
  overflow: auto;
`;
export const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
