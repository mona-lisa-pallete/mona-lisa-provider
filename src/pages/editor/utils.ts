import { merge } from 'lodash';
import { CSSProperties } from 'styled-components';
import { DSLContent } from './types';

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
      }
    });
  });
  return contentData;
};

export { conversionActionData, findElementById, changeElementStyleById };
