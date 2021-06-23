import { PlatformType } from '@/services/page/schema';

/**
 * 获取对应页面类型
 */
function getPlatform(platform: string[]): 'h5mini' | 'h5' | 'mini' {
  const isBoth = platform.includes(PlatformType.MINIAPP) && platform.includes(PlatformType.WEB);
  // const isMini = item.platform.includes(PlatformType.MINIAPP);
  const isH5 = platform.includes(PlatformType.WEB);
  if (isBoth) {
    return 'h5mini';
  } else if (isH5) {
    return 'h5';
  } else {
    return 'mini';
  }
}

export default getPlatform;
