import React from 'react';
import { ConfigProvider } from 'antd';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import zhCN from 'antd/es/locale/zh_CN';
import './global.less';

import moment from 'moment';
import 'moment/locale/zh-cn';
import MaterialLibraryContainer from './components/MaterialLibraryContainer/';

/**
 * 注册 sentry
 */
const isLocal = window.location.host.includes('localhost');
if (!isLocal) {
  Sentry.init({
    dsn: 'https://4072071bc4a14619b507c556d3477f9d@o807559.ingest.sentry.io/5803649',
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}
moment.locale('zh-cn');

if (taroVendor.applyPolyfills) {
  taroVendor.applyPolyfills().then(function () {
    taroVendor.defineCustomElements(window);
  });
}

export function rootContainer(container: React.ReactNode) {
  // const { materialVisible, materialType } = useModel('useMaterialModel');

  return (
    <ConfigProvider locale={zhCN}>
      {container}
      <MaterialLibraryContainer />
    </ConfigProvider>
  );
}
