import { getDllApi } from '@/utils/host';

interface IComponentData {
  compUrl: string;
  formUrl: string;
  compMetaUrl: string;
  name: string;
}

// 不访问本地组件工程
export const isLocal = false;

// 通过域名判断是否访问本地组件工程
// export const isLocal = window.location.host.includes('localhost');

const getDllComponentPath = (cData: IComponentData) => {
  const compMetaUrl = isLocal ? `${getDllApi()}${cData.name}.json` : cData.compMetaUrl;
  const formUrl = isLocal ? `${getDllApi() + cData.name}.js` : cData.formUrl;
  const compUrl = isLocal ? `${getDllApi() + cData.name}.js` : cData.compUrl;
  console.log('获取到组件地址', [compMetaUrl, formUrl, compUrl], isLocal);
  return [compMetaUrl, formUrl, compUrl];
};

export default getDllComponentPath;
