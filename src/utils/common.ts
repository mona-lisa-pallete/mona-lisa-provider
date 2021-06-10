/* eslint-disable prefer-promise-reject-errors */
import { MaterialType } from '@/pages/material-manage/types';
import type { RcFile } from 'antd/lib/upload';

function getScrollWidth() {
  if (document.body.clientHeight === document.body.scrollHeight) {
    return 0;
  }
  const oDiv = document.createElement('DIV');
  oDiv.style.cssText = 'position:absolute;top:-1000px;width:100px;height:100px; overflow:hidden;';
  const noScroll = document.body.appendChild(oDiv).clientWidth;
  oDiv.style.overflowY = 'scroll';
  const scroll = oDiv.clientWidth;
  document.body.removeChild(oDiv);
  return noScroll - scroll;
}

export type FileType = 'video' | 'image';

const swapArr = (arr: any[], index1: number, index2: number) => {
  // eslint-disable-next-line prefer-destructuring
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
};

const validateFile = (file: RcFile, acceptList: string[], sizeLimit?: number) => {
  return new Promise((resolve: () => void, reject: (E: Error) => void) => {
    if (sizeLimit && file.size > sizeLimit / 1024 / 1024) {
      reject(new Error('size'));
      return;
    }
    if (!acceptList.includes(file.name)) {
      reject(new Error('fileType'));
      return;
    }
    resolve();
  });
};

function secondsFormat(s: number) {
  const day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整
  const hour = Math.floor((s - day * 24 * 3600) / 3600);
  const minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
  const second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
  return {
    day,
    hour,
    minute,
    second,
  };
}

function checkPhone(phone: number | string) {
  let value = '';
  if (typeof phone === 'number') {
    value = phone.toString();
  } else {
    value = phone;
  }
  const flag = /^1[3456789]\d{9}$/.test(value);
  return flag;
}

function getFileName(str: string) {
  return str.substring(0, str.lastIndexOf('.'));
}

function getFileType(str: string) {
  return str.substring(str.lastIndexOf('.'));
}

function isMp4(name: string) {
  const type = getFileType(name);
  return ['.mp4'].includes(type);
}

function isPic(name: string) {
  const type = getFileType(name);
  return ['.jpg', '.jpeg', '.png'].includes(type);
}

function isPicGif(name: string) {
  const type = getFileType(name);
  return ['.jpg', '.jpeg', '.png', '.gif'].includes(type);
}

function isVideoSize(size: number) {
  return size / 1024 / 1024 <= 1024;
}

function isImgSize(size: number) {
  return size / 1024 / 1024 <= 20;
}

function getImageSize(img: HTMLImageElement) {
  return new Promise((resolve: (size: { width: number; height: number }) => void) => {
    // eslint-disable-next-line no-param-reassign
    img.onload = (e: any) => {
      const { width, height } = e.target;
      resolve({
        width,
        height,
      });
    };
  });
}

const convertFileToMaterial = (fileType: string) => {
  const fileTypeName = fileType.replaceAll('.', '');
  let materialType = '';
  switch (fileTypeName) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      materialType = MaterialType.Image;
      break;
    case 'mp4':
      materialType = MaterialType.Video;
      break;
    case 'ppt':
    case 'pptx':
    case 'pdf':
    case 'word':
    case 'xls':
    case 'xlsx':
      materialType = MaterialType.File;
      break;
  }
  return materialType;
};

export {
  getScrollWidth,
  swapArr,
  validateFile,
  secondsFormat,
  checkPhone,
  getFileName,
  getFileType,
  isMp4,
  isPic,
  isPicGif,
  isVideoSize,
  isImgSize,
  getImageSize,
  convertFileToMaterial,
};
