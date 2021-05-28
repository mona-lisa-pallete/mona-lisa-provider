/* eslint-disable prefer-promise-reject-errors */
import type { RcFile } from 'antd/lib/upload';
import { imgErrorMsg, imgErrorType, imgFormatError } from '@/utils/error-msg';

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

const isRightSizeImg = (img: HTMLImageElement) => {
  return new Promise(
    (resolve: () => void, reject: (error: { type: imgErrorType; msg: imgErrorMsg }) => void) => {
      img.onload = async (e: any) => {
        const { width } = e.target;
        if (width % 375 !== 0) {
          reject({
            type: imgErrorType.size,
            msg: imgErrorMsg.sizeError,
          });
          return;
        }
        resolve();
      };
    },
  );
};

const isRightSizeCountDownImg = (img: HTMLImageElement) => {
  return new Promise(
    (resolve: () => void, reject: (error: { type: imgErrorType; msg: string }) => void) => {
      img.onload = async (e: any) => {
        const { width, height } = e.target;
        if (width % 375 !== 0 || height % 65 !== 0) {
          reject({
            type: imgErrorType.size,
            msg: '营销条底图限制长为375的倍数，高为65的倍数，请调整之后重新上传',
          });
          return;
        }
        resolve();
      };
    },
  );
};

const isRightFormatImg = (types: Array<Blob['type']>, file: RcFile) => {
  return new Promise(
    (resolve: () => void, reject: (error: { type: imgErrorType; msg: string }) => void) => {
      if (!types.includes(file.type)) {
        reject({
          type: imgErrorType.format,
          msg: imgFormatError.get(types)!,
        });
      } else {
        resolve();
      }
    },
  );
};

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

export {
  getScrollWidth,
  swapArr,
  validateFile,
  secondsFormat,
  isRightSizeImg,
  isRightFormatImg,
  checkPhone,
  isRightSizeCountDownImg,
  getFileName,
  getFileType,
  isMp4,
  isPic,
  isPicGif,
  isVideoSize,
  isImgSize,
};
