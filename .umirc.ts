import { defineConfig } from 'umi';
// @ts-ignore
import getSymlinks from 'get-symlinks';
import * as fs from 'fs';
import menuConfig from './conf/menu';
import theme from './src/theme';

const pkg = require('./package.json');
const { devProxy } = require('./conf/proxy.js');
console.log(devProxy);

const PROJECT_NAME = pkg.name;
const BASE_PATH = '/' + PROJECT_NAME;

const config = defineConfig({
  base: BASE_PATH,
  outputPath: './build',
  publicPath: `${BASE_PATH}/`,
  hash: true,
  antd: {},
  dva: {},
  devServer: {
    port: 9999,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  mlayout: {
    headerTitle: '落地页配置后台',
    menuConfig,
    headerLogo: 'https://static.guorou.net/course-static/22a23e8987c449708948925fab439ad3.svg',
  },
  theme,
  headScripts: [
    'http://localhost:11111/reactVendor.dll.js',
    'http://localhost:11111/taroVendor.dll.js',
    // '//static.guorou.net/course-static/fad6f1187bf044528f72e253f124797f.js',
    '//cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js',
    '//at.alicdn.com/t/font_2260391_11ut8faea2el.js',
    // '//static.guorou.net/course-static/88f475f5a0514b8e9c898624166d6ea2.js',
    '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.js',
    '//unpkg.com/antd@4.15.6/dist/antd.min.js',
  ],
  externals: {
    react: 'reactVendor.React',
    'react-dom': 'reactVendor.ReactDOM',
    antd: 'antd',
  },
  styles: [
    '//at.alicdn.com/t/font_2395081_pjtg7zzsnmf.css',
    '//cdnjs.cloudflare.com/ajax/libs/antd/4.15.6/antd.css',
  ],
  favicon: 'https://static.guorou.net/portal/logo-simple.svg',
  chainWebpack: (config, { webpack }) => {
    // config.plugin('worker-plugin').use(WorkerPlugin, [{ globalObject: 'this' }]);
  },
  plugins: ['@grfe/micro-layout'],
  proxy: {
    ...devProxy,
  },
});

export default config;
