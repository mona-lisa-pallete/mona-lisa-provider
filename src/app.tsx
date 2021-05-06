import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './global.less';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


export function rootContainer(container: React.ReactNode) {
  return <ConfigProvider locale={zhCN}>{container}</ConfigProvider>;
}
