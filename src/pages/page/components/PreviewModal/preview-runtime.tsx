import React from 'react';
import { LayoutRenderer } from '../layout-renderer';

const eventHandler = (eventConfig) => {
  const eventRes = {};
  if (!eventConfig) return eventRes;
  Object.keys(eventConfig).forEach((eventKey) => {
    eventRes[eventKey] = () => {
      // console.log('asdasdsd');
    };
  });
  return eventRes;
};

const componentRenderer = (dslState: any) => (item: any) => {
  const {
    dsl: { action },
  } = dslState;
  console.log(action);
  const { layoutNodeItem, contentChild } = item;
  const { contentProp, style, elementRef } = layoutNodeItem;
  const { event } = contentProp;
  const W = window?.[elementRef]?.default || 'div';
  // console.log(item);
  return (
    <W style={style} key={item.treeNodePath.join('_')} {...contentProp} {...eventHandler(event)}>
      {contentChild}
    </W>
  );
};

export const PreviewRuntime = ({ dslState }) => {
  return (
    <LayoutRenderer
      dsl={dslState?.dsl}
      componentRenderer={componentRenderer(dslState)}
      // RootRender={(child) => (
      //   <DropStageContainer onStageClick={onStageClick} style={pageStyle}>
      //     {hasNode ? child : <div>请从左边拖入组件</div>}
      //   </DropStageContainer>
      // )}
    />
  );
};
