import { getAllActions } from '@/services/action';
import { getCompMeta } from '@/services/editor';
import { getActionDllApi, getDllApi } from '@/utils/host';
import { useEffect, useState } from 'react';
import { LoadScript } from './load-stuff';

const isLocal = window.location.host.includes('localhost');

const useHideHeader = (location: any) => {
  useEffect(() => {
    const style = location.pathname === '/editor' ? 'none' : 'block';
    document.querySelector('aside')!.style.display = style;
    (document.querySelector('.reset-antd') as HTMLElement).style.display = style;
    (document.querySelector('.site-layout-background') as HTMLElement).style.margin =
      location.pathname === '/editor' ? '0px' : '16px';
  }, [location]);
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
  return (elementRef: string, elementRefMeta?: any, cdnUrl?: string) => {
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
      if (!elementRef || !elementRefMeta) {
        setMetaState({
          fetching: false,
          metadata: null,
        });
        return;
      }
      getCompMeta(elementRef).then(async (metaFromRemote) => {
        const RefMeta = isLocal ? metaFromRemote : elementRefMeta;
        const {
          propFormConfig: { customFormRef },
        } = RefMeta;
        const host = isLocal ? getDllApi() : cdnUrl;

        const path = isLocal ? elementRef : 'index';
        // console.log(cdnUrl, 'cdnUrlcdnUrlcdnUrl');

        await Promise.all([
          // LoadScript({ src: `http://127.0.0.1:22110/zxj/main.js` }),
          // 加载组件实例
          LoadScript({ src: `${host}${path}.js` }),
          // // 加载组件的表单实例
          LoadScript({ src: `${host}${customFormRef}.js` }),
        ]);

        setMetaState({
          fetching: false,
          metadata: RefMeta,
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

const useActions = () => {
  const [actions, setActions] = useState<any>([]);
  useEffect(() => {
    async function request() {
      const { code, data } = await getAllActions();
      if (code === 0) {
        setActions(
          data.map((v) => ({
            label: v.label,
            value: v.type,
          })),
        );
      }
    }
    request();
  }, []);
  return actions;
};

/**
 * 简化，直接根据type来下载特定oss目录路径下dll.js
 */
const useActionMeta = (() => {
  const metaCache: Record<string, any> = {}; // meta 缓存

  return (elementRef: string) => {
    const [metaState, setMetaState] = useState<{ fetching: boolean; metadata?: any }>({
      fetching: false,
      metadata: metaCache[elementRef],
    });
    useEffect(() => {
      async function request() {
        // getActionsByTypes // 简单版本管理，没有调用此接口
        setMetaState({ fetching: true });
        const host = isLocal
          ? getActionDllApi()
          : `https://static.guorou.net/davinci/component/${elementRef}`;

        const path = isLocal ? elementRef : 'index';
        await LoadScript({ src: `${host}/${path}.js` });
        metaCache[elementRef] = true; // TODO 简化为 true，没有从json中获取实际meta数据
        setMetaState({
          fetching: false,
          metadata: metaCache[elementRef],
        });
      }

      if (!elementRef) {
        setMetaState({ fetching: false });
      } else {
        request();
      }
    }, [elementRef]);

    return metaState;
  };
})();

export { useHideHeader, useWidgetMeta, useActionMeta, useActions };
