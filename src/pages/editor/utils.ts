import { merge } from 'lodash';
import { evaluate } from 'mathjs';
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

export {
  conversionActionData,
  findElementById,
  changeElementStyleById,
  delElementById,
  resizeStyleById,
  changeElementActionById,
  reizeElementStyle,
};
