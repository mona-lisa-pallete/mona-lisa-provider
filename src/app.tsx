import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './global.less';

import moment from 'moment';
import 'moment/locale/zh-cn';

/**
 * 注册 React 运行环境，模拟由 sdk 构建的 dll 环境，以后将要删掉
 */
window.React = React;

moment.locale('zh-cn');

if (taroVendor.applyPolyfills) {
  taroVendor.applyPolyfills().then(function () {
    taroVendor.defineCustomElements(window);
  });
}

export function rootContainer(container: React.ReactNode) {
  return <ConfigProvider locale={zhCN}>{container}</ConfigProvider>;
}
