const fs = require('fs');
const path = require('path');

const apiList = [
  '/auth',
  '/portalapi',
  '/webotapi',
  'portalapi/usercenterapi',
  '/phome',
  '/login',
  '/davinciapi',
  '/pauthapi',
  '/enrollmentapi',
];

let localProxy = {};
try {
  /**
   * proxy.local.js 格式和Umi配置一致
   *
   * exports.modules = {
      '/imagegenerator': {
        target: 'http://120.0.0.1:7777',
        changeOrigin: true,
        pathRewrite: { '^/imagegenerator': '' },
      },
    };
   */

  const PATH = './proxy.local.js';
  const existsLocal = fs.existsSync(path.resolve(__dirname, PATH));
  if (existsLocal) {
    localProxy = require(PATH);
  }
} catch (error) {
  console.log('proxy:', error);
}

const target = ((env) => {
  const map = {
    dev: 'http://127.0.0.1:5400', // 'http://portalhome.uae.shensz.local',
    test: 'http://portal.test.guorou.net',
    prod: 'https://portal.guorou.net',
  };

  return map[env] || map.dev;
})(String(process.env.PROXY_ENV).toLowerCase());
const devProxy = ((paths) => {
  const res = {};
  paths.forEach((p) => {
    res[p] = {
      target,
      changeOrigin: true,
    };
  });

  return res;
})(apiList);

exports.devProxy = {
  ...devProxy,
  ...localProxy.modules,
};
