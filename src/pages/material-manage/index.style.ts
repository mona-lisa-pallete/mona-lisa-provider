import styled from 'styled-components';
import { QueryFilter } from '@ant-design/pro-form';
import { Menu } from 'antd';

export const Query = styled(QueryFilter)`
  padding: 16px 16px 0 16px;
`;

export const MaterialManageContainer = styled.div`
  background-color: #fff;
  flex-grow: 1;
  .ant-tabs-nav {
    padding-left: 16px;
  }
`;

export const MaterialManageMenuBtn = styled(Menu)`
  width: 100px;
  .ant-dropdown-menu-item {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.8);
    font-weight: 400;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
  }
  .menu-item--del {
    color: #ff6f6f;
  }
`;

export const MaterialManageList = styled.div`
  display: flex;
  align-self: center;
  flex-wrap: wrap;
  padding: 0 16px;
  font-size: 0;
  .material-manage-item {
    width: calc(25% - 18px);
    margin-right: 18px;
    margin-bottom: 16px;
    &__mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: none;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      font-weight: 500;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      background: rgba(0, 0, 0, 0.55);
      img {
        margin-right: 6px;
      }
      > div {
        display: flex;
        align-items: center;
      }
    }
    &__box {
      position: relative;
      display: inline-block;
      flex-shrink: 0;
      width: 100%;
      height: 148px;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 4px 4px 0 0;
      &:hover {
        .material-manage__col-name-img {
          transform: translateY(calc(-100% + 148px));
        }
        .material-manage-item__mask {
          display: flex;
        }
      }
      .material-manage__col-name-img {
        width: 100%;
        height: auto;
        min-height: 148px;
        object-fit: scale-down;
        border-radius: 4px;
        transition: 2s;
      }
      .ant-image {
        width: 100%;
        /* height: 148px; */
        min-height: 148px;
        overflow: hidden;
        transition: 2s;
      }
      &--video {
        display: flex;
        align-items: center;
        > video {
          width: 100%;
        }
      }
    }
    &__action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      height: 39px;
      padding: 0 12px;
      font-size: 14px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-top: none;
      border-radius: 0px 0px 4px 4px;
    }
    &__name {
      overflow: hidden;
      white-space: nowrap;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
    }
    &__btn {
      cursor: pointer;
      > svg {
        &:hover {
          color: #767a8f;
        }
      }
    }
  }
  @media screen and (min-width: 2401px) {
    .material-manage-item {
      width: calc(20% - 16px);
      &:nth-child(5n + 0) {
        margin-right: 0;
      }
    }
  }
  @media screen and (min-height: 1200px) {
    .material-manage-item__box {
      height: 195px;
      &:hover {
        .material-manage__col-name-img {
          transform: translateY(calc(-100% + 195px));
        }
      }
      .ant-image {
        min-height: 195px;
      }
      .material-manage__col-name-img {
        min-height: 195px;
      }
    }
  }
  @media screen and (max-width: 2400px) and (min-width: 1601px) {
    .material-manage-item {
      width: calc(20% - 15px);
      &:nth-child(5n + 0) {
        margin-right: 0;
      }
    }
  }
  @media screen and (max-height: 900px) {
    .material-manage-item__box {
      height: 148px;
      &:hover {
        .material-manage__col-name-img {
          transform: translateY(calc(-100% + 148px));
        }
      }
      .ant-image {
        min-height: 148px;
      }
      .material-manage__col-name-img {
        min-height: 148px;
      }
    }
  }
  @media screen and (max-width: 1600px) and (min-width: 1367px) {
    .material-manage-item {
      width: calc(25% - 15px);
      &:nth-child(4n + 0) {
        margin-right: 0;
      }
    }
  }
  @media screen and (max-width: 1366px) {
    .material-manage-item {
      width: calc(33.33333% - 12px);
      &:nth-child(3n + 0) {
        margin-right: 0;
      }
    }
  }
`;
