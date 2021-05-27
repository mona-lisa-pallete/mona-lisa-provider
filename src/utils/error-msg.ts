enum imgErrorMsg {
  sizeError = '图片规格不符，规格为375的整数倍，请调整之后重新上传',
}

enum imgErrorType {
  size = 'size',
  format = 'format',
}

const jpgPngGif = ['image/png', 'image/gif', 'image/jpeg'];
const jpgPng = ['image/png', 'image/jpeg'];

const imgFormatError = new Map([
  [jpgPngGif, '图片格式支持jpg、png、gif'],
  [jpgPng, '图片格式支持jpg、png'],
]);

export { imgErrorMsg, imgFormatError, jpgPngGif, jpgPng, imgErrorType };
