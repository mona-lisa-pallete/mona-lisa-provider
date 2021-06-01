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
    'https://static.guorou.net/davinci/lib/reactVendor.dll.js',
    'https://static.guorou.net/davinci/lib/taroVendor.dll.js',
    '//course-static.oss-cn-hangzhou.aliyuncs.com/browser.min.js',
    '//course-static.oss-cn-hangzhou.aliyuncs.com/moment.js',
    'https://static.guorou.net/davinci/lib/antd.min.dll.js',
    '//at.alicdn.com/t/font_2395081_9sik77mosu5.js',
  ],
  externals: {
    react: 'reactVendor.React',
    'react-dom': 'reactVendor.ReactDOM',
    antd: 'antd',
  },
  styles: [
    '//at.alicdn.com/t/font_2395081_9sik77mosu5.css',
    'https://static.guorou.net/course-static/8b5e1c66cad44947aa14258d1220678d.css',
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
