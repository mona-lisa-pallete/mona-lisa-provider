#

## 运营类项目脚手架

- [运营类项目脚手架](#运营类项目脚手架)
  - [前置知识](#前置知识)
  - [本地代理](#本地代理)
  - [部署到UAE应用](#部署到uae应用)
    - [了解UAE、Gitlab CI](#了解uaegitlab-ci)
    - [具体操作](#具体操作)
  - [npm源](#npm源)
  - [umirc.ts 配置](#umircts-配置)
  - [总是哪里缺了都是TODO](#总是哪里缺了都是todo)

### 前置知识

[umi基本操作](https://umijs.org/zh-CN/docs/directory-structure)

- 使用umi自带的router做路由处理，不需要其他第三方包
- 全局状态使用dva
- 自己搞重定向
- @grfe/utils包含一些通用的工具方法如
  - 上传至OSS，使用V2版本
  - request函数

### 本地代理

- 预置test和Prod代理，
- 开发环境很麻烦，如果需要开发环境，自己写一个 /conf/proxy.local.js 里面写一个接口代理覆盖预设代理

> /conf/proxy.local.js 是个人本地代理，不会加入git。

### 部署到UAE应用

#### 了解UAE、Gitlab CI

1. [基于gitlab CI部署UAE流程](http://doc.shensz.local/pages/viewpage.action?pageId=26937001)

#### 具体操作

  1. 在UAE上建一个项目
  2. 修改 `ci.yml` 的 `PROD_UAE_APP` 变量，为UAE的id
  3. 修改 `script/pack.sh` 下的 `app_name` 变量为项目名称
  4. 修改 `server/app.js` 下的 `app.use(mount('/demo', serve('./build', serveOptions)))` 语句为项目的 `baseUrl`
  5. 在 `portal-home` 项目中增加新项目的配置，可通过搜索其他项目名称参考配置，如 `guocha`
  6. 初次部署时，需要在UAE的生产环境发一个包才可以在
  
- TODO: server/app koa -> express， 需要通过ci或者其他方式实现自动化 writeFile

### npm源

- TODO: 待改成 r.guorou.net

### umirc.ts 配置

- TODO: 待微前端done配置

### 总是哪里缺了都是TODO
