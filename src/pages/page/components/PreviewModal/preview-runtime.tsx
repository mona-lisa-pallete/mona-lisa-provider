import React from 'react';
import { LayoutRenderer } from '../layout-renderer';
import './index.less';

const eventHandler = (eventConfig: { [key: string]: any }) => {
  const eventRes: { [key: string]: any } = {};
  if (!eventConfig) return eventRes;
  Object.keys(eventConfig).forEach((eventKey) => {
    eventRes[eventKey] = () => {
      // console.log('asdasdsd');
    };
  });
  return eventRes;
};

const componentRenderer = (editorState: any) => (item: any) => {
  const { dsl } = editorState;
  console.log(dsl);
  const { layoutNodeItem, contentChild } = item;
  const { contentProp, style, elementRef } = layoutNodeItem;
  const { event } = contentProp;
  const W = (window?.[elementRef] as any)?.default || 'div';
  // console.log(item);
  return (
    <W style={style} key={item.treeNodePath.join('_')} {...contentProp} {...eventHandler(event)}>
      {contentChild}
    </W>
  );
};

export const PreviewRuntime = ({ editorState }: any) => {
  return (
    <LayoutRenderer
      dsl={editorState?.dsl}
      componentRenderer={componentRenderer(editorState)}
      // RootRender={(child) => (
      //   <DropStageContainer onStageClick={onStageClick} style={pageStyle}>
      //     {hasNode ? child : <div>请从左边拖入组件</div>}
      //   </DropStageContainer>
      // )}
    />
  );
};
