import { merge } from 'lodash';
import { CSSProperties } from 'styled-components';
import { DSLAction, DSLContent } from './types';

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
      if (i.elementId === id) {
        contentData[index].contentChild?.splice(childItemIndex, 1);
        if (contentData[index].contentChild?.length === 0) {
          contentData.splice(index, 1);
        }
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

export {
  conversionActionData,
  findElementById,
  changeElementStyleById,
  delElementById,
  resizeStyleById,
};
