import { ActionType, getAllActions } from '@/services/action';
import { getCompMeta } from '@/services/editor';
import { getDllApi } from '@/utils/host';
import { useEffect, useState } from 'react';
import { LoadScript } from './load-stuff';
import { isLocal } from '@/configs/dll';

const useHideHeader = (location: any) => {
  useEffect(() => {
    // const style = location.pathname === '/editor' ? 'none' : 'block';
    // document.querySelector('aside').style.display = style;
    // (document.querySelector('.reset-antd') as HTMLElement).style.display = style;
    // (document.querySelector('.site-layout-background') as HTMLElement).style.margin =
    //   location.pathname === '/editor' ? '0px' : '16px';
    // document.body.className = location.pathname.replace(/\//g, '_');
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
  return (elementRef: string, meta?: any, comp?: string, form?: string) => {
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
      if (!elementRef || !meta) {
        // 如果没有传入关键参数
        return setMetaState({
          fetching: false,
          metadata: null,
        });
      }
      if (metaCache[elementRef]) {
        // 如果存在缓存
        return setMetaState({
          fetching: false,
          metadata: metaCache[elementRef],
        });
      }
      const metaUrl = isLocal ? `${getDllApi()}${elementRef}.json` : meta;
      getCompMeta(metaUrl).then(async (metaFromRemote) => {
        const {
          propFormConfig: { customFormRef },
        } = metaFromRemote;

        const compUrl = isLocal ? `${getDllApi() + elementRef}.js` : comp;
        const formUrl = isLocal ? `${getDllApi() + customFormRef}.js` : form;

        await Promise.all([
          // LoadScript({ src: `http://127.0.0.1:22110/zxj/main.js` }),
          // 加载组件实例
          LoadScript({ src: `${compUrl}` }),
          // // 加载组件的表单实例
          LoadScript({ src: `${formUrl}` }),
        ]);

        metaCache[elementRef] = metaFromRemote;

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
    }, [elementRef, meta]);

    return metaState;
  };
})();

const useActions = () => {
  const [actions, setActions] = useState<ActionType[]>([]);
  useEffect(() => {
    async function request() {
      const { code, data } = await getAllActions();
      if (code === 0) {
        setActions(data);
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

  return (elementRef: string, formUrl: string) => {
    const [metaState, setMetaState] = useState<{ fetching: boolean; metadata?: any }>({
      fetching: false,
      metadata: metaCache[elementRef],
    });
    useEffect(() => {
      if (!formUrl || metaCache[elementRef]) return;
      async function request() {
        // getActionsByTypes // 简单版本管理，没有调用此接口
        setMetaState({ fetching: true });
        const path = isLocal ? `${getDllApi()}/${elementRef}.js` : formUrl;
        await LoadScript({ src: path });

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
    }, [elementRef, formUrl]);

    return metaState;
  };
})();

export { useHideHeader, useWidgetMeta, useActionMeta, useActions };
