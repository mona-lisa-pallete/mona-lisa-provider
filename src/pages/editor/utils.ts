import { merge, mergeWith } from 'lodash';
import { CSSProperties } from 'styled-components';
import { DSL, DSLAction, DSLContent } from './types';
import { LoadScript } from './load-stuff';
import { getDllApi } from '@/utils/host';

const conversionActionData = () => {};

const findElementById = (id: string, content: DSLContent[]) => {
  let element: DSLContent;
  content.forEach((e) => {
    if (e.elementId === id) {
      element = e;
      return;
    }
    e.contentChild?.forEach((i) => {
      if (i.elementId === id) {
        element = i;
      }
    });
  });
  return element!;
};

const changeElementStyleById = (id: string, content: DSLContent[], data: CSSProperties) => {
  const contentData: DSLContent[] = JSON.parse(JSON.stringify(content));
  contentData.forEach((e, index) => {
    let style = contentData[index].contentProp?.style;
    if (e.elementId === id && style) {
      style = merge(style, data);
    }
    e.contentChild?.forEach((i, childItem) => {
      let childStyle = contentData[index].contentChild?.[childItem].contentProp?.style;
      if (i.elementId === id && childStyle) {
        childStyle = merge(childStyle, data);
        // contentData[index].contentChild![childItem].contentProp.style = data;
      } else if (i.elementId === id && !childStyle) {
        contentData[index].contentChild![childItem].contentProp = {
          ...contentData[index].contentChild?.[childItem].contentProp,
          style: data,
        };
      }
    });
  });
  return contentData;
};

const delElementById = (id: string, content: DSLContent[], action: DSLAction) => {
  const contentData: DSLContent[] = JSON.parse(JSON.stringify(content));
  contentData.forEach((e, index) => {
    e.contentChild?.forEach((i, childItemIndex) => {
      if (i.elementId === id && isDragTarget(i.elementRef!)) {
        contentData[index].contentChild?.splice(childItemIndex, 1);
        if (contentData[index].contentChild?.length === 0) {
          contentData.splice(index, 1);
        }
      } else if (i.elementId === id && !isDragTarget(i.elementRef!)) {
        contentData.splice(index, 1);
      }
    });
  });
  const actionData = JSON.parse(JSON.stringify(action));
  if (actionData[id]) {
    delete actionData[id];
  }
  return { content: contentData, action: actionData };
};

const resizeStyleById = (containerId: string, content: DSLContent[]) => {
  const contentData: DSLContent[] = JSON.parse(JSON.stringify(content));
  contentData.forEach((e) => {
    if (e.elementId === containerId) {
      //
    }
  });
};

const changeElementActionById = (id: string, content: DSLContent[], action: any) => {
  const contentData: DSLContent[] = JSON.parse(JSON.stringify(content));

  contentData.forEach((e, index) => {
    e.contentChild?.forEach((i, childItem) => {
      const event = contentData[index].contentChild?.[childItem].contentProp?.event;
      if (i.elementId === id && event) {
        contentData[index].contentChild[childItem].contentProp.event = { ...action };
        // contentData[index].contentChild![childItem].contentProp.style = data;
      } else if (i.elementId === id && !event) {
        contentData[index].contentChild![childItem].contentProp = {
          ...contentData[index].contentChild![childItem].contentProp,
          event: {
            ...action,
          },
        };
      }
    });
  });
  return contentData;
};

const reizeElementStyle = (
  content: DSLContent[],
  id: string,
  style: CSSProperties,
): DSLContent[] | undefined => {
  const contentCopy: DSLContent[] = JSON.parse(JSON.stringify(content));
  const list = contentCopy.map((i) => {
    if (i.contentChild && i.contentChild.length) {
      if (i.elementId === id) {
        i.contentProp.style = merge(i.contentProp.style, style);
        return i;
      }
      i.contentChild.forEach((childItem, index) => {
        if (id === childItem.elementId) {
          i.contentChild![index].contentProp.style = merge(
            i.contentChild![index].contentProp.style,
            style,
          );
        }
      });
    }
    return i!;
  });
  return list!;
};

const getScript = (url: string) => {
  return () => {
    return LoadScript({ src: url });
  };
};

const getWidgetData = (
  refNames: Array<{ compUrl: string; formUrl: string; compMetaUrl: string; name: string }>,
) => {
  const isLocal = window.location.host.includes('localhost');
  const fetchData = [];
  refNames.forEach((i) => {
    const compMetaUrl = isLocal ? `${getDllApi()}${i.name}.json` : i.compMetaUrl;
    const formUrl = isLocal ? `${getDllApi() + i.name}.js` : i.formUrl;
    const compUrl = isLocal ? `${getDllApi() + i.name}.js` : i.compUrl;

    fetchData.push(getScript(compMetaUrl)());
    fetchData.push(getScript(formUrl)());
    fetchData.push(getScript(compUrl)());
  });
  Promise.all(fetchData);
  // console.log(fetchData, 'fetchData');
};

const isDragTarget = (elementRef: string) => {
  return ['DvButton', 'DvText'].includes(elementRef);
};

const changeElement = (
  content: DSL['content'],
  id: string,
  data: any,
): DSLContent[] | undefined => {
  const contentData: DSL['content'] = JSON.parse(JSON.stringify(content));
  const list = contentData.map((i) => {
    if (i.contentChild && i.contentChild.length) {
      i.contentChild.forEach((childItem, index) => {
        if (id === childItem.elementId) {
          // TODO 这里的merge方法建议使用 immutable 库。
          // 这里对于数组会进行合并而不是替换，尝试 mergeWith API
          i.contentChild![index].contentProp = mergeWith(
            i.contentChild![index].contentProp,
            data,
            (a, b) => (Array.isArray(b) ? b : undefined),
          );
        }
      });
    }
    return i!;
  });
  return list!;
};

export {
  conversionActionData,
  findElementById,
  changeElementStyleById,
  delElementById,
  resizeStyleById,
  changeElementActionById,
  reizeElementStyle,
  getWidgetData,
  isDragTarget,
  changeElement,
};
