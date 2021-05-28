import { getCompMeta } from '@/services/editor';
import { getDllApi } from '@/utils/host';
import { useEffect, useState } from 'react';
import { LoadScript } from './load-stuff';

const useHideHeader = () => {
  useEffect(() => {
    window.onload = () => {
      document.querySelector('aside')!.style.display = 'none';
      (document.querySelector('.reset-antd') as HTMLElement).style.display = 'none';
      (document.querySelector('.site-layout-background') as HTMLElement).style.margin = '0px';
    };
  }, []);
};

/**
 * 获取接入到平台的组件的 meta
 * 1. 获取组件 meta
 * 2. 加载组件实例
 * 3. 加载组件的属性编辑表单
 */
const useWidgetMeta = (() => {
  /** meta 缓存 */
  const metaCache: Record<string, any> = {};
  return (elementRef: string, elementRefMeta?: any) => {
    let initState = {
      fetching: false,
      metadata: null,
    };
    if (!elementRef) {
      initState = {
        fetching: false,
        metadata: null,
      };
    }
    if (metaCache[elementRef]) {
      initState = {
        fetching: false,
        metadata: metaCache[elementRef],
      };
    }
    const [metaState, setMetaState] = useState(initState);
    useEffect(() => {
      if (!elementRef || !elementRefMeta) return;
      getCompMeta(elementRef).then(async (metaFromRemote) => {
        const isLocal = window.location.host.includes('localhost');
        console.log(elementRefMeta);
        const RefMeta = isLocal ? metaFromRemote : elementRefMeta;
        const {
          propFormConfig: { customFormRef },
        } = RefMeta;
        await Promise.all([
          // LoadScript({ src: `http://127.0.0.1:22110/zxj/main.js` }),
          // 加载组件实例
          LoadScript({ src: `${getDllApi()}/${elementRef}.js` }),
          // // 加载组件的表单实例
          LoadScript({ src: `${getDllApi()}/${customFormRef}.js` }),
        ]);

        setMetaState({
          fetching: false,
          metadata: metaFromRemote,
        });
      });
      // getCompMeta(elementRef).then((metaFromRemote) => {
      //   setMetaState({
      //     fetching: false,
      //     metadata: metaFromRemote,
      //   });
      // });
    }, [elementRef, elementRefMeta]);

    return metaState;
  };
})();

export { useHideHeader, useWidgetMeta };
