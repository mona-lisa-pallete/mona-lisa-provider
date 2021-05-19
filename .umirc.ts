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
  headScripts: ['//at.alicdn.com/t/font_2260391_11ut8faea2el.js'],
  styles: ['//at.alicdn.com/t/font_2395081_pjtg7zzsnmf.css'],
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
