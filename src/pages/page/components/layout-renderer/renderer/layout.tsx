import React, { ElementType } from 'react';
import { LayoutNodeItem, TreeNodePath } from '../types';

/**
 * LayoutWrapper 上下文
 */
export interface LayoutWrapperContext {
  /** 组件 ID */
  id: string;
  /** 组件 index */
  idx: number;
  /** 组件嵌套信息 */
  treeNodePath: TreeNodePath;
  /** 组件节点信息 */
  layoutNodeItem: LayoutNodeItem;
  /** 组件的 children */
  contentChild?: React.ElementType[];
}

export interface LayoutParserWrapper {
  /** 组件渲染器，由调用方实现 */
  componentRenderer?: (ctx: LayoutWrapperContext) => JSX.Element | null;
}

export interface LayoutRendererProps extends LayoutParserWrapper {
  dsl: any;
  layoutNode?: LayoutNodeItem[];
  RootRender?: (renderRes: React.ElementType[]) => JSX.Element;
}

/**
 * 布局渲染器
 */
const renderLayout = (
  layoutNode: LayoutNodeItem[],
  wrapper: LayoutParserWrapper,
  nestingDeep = 0,
  nextNestingInfo: TreeNodePath = [],
) => {
  const res: React.ElementType[] = [];
  if (Array.isArray(layoutNode)) {
    /**
     * 1. 记录元素的嵌套层次
     * 2. 必须切断与原型的连接
     */
    const treeNodePath: TreeNodePath = [...nextNestingInfo];
    for (let i = 0; i < layoutNode.length; i++) {
      const layoutNodeItem = layoutNode[i];

      /**
       * 重要策略，用于定位元素在画布中的位置
       */
      treeNodePath[nestingDeep] = i;

      const { id } = layoutNodeItem;
      const { componentRenderer } = wrapper;

      /** 必须切断与原型的连接 */
      const nextingInfoCtx = [...treeNodePath];
      const wrapperContext: LayoutWrapperContext = {
        id,
        idx: i,
        layoutNodeItem,
        treeNodePath: nextingInfoCtx,
      };
      // console.log(layoutNodeItem, wrapperContext);
      if (layoutNodeItem.contentChild) {
        /**
         * 递归获取子元素，通过嵌套层次来确定元素所在位置
         */
        const childOfContainer = renderLayout(
          layoutNodeItem.contentChild,
          wrapper,
          nestingDeep + 1,
          nextingInfoCtx,
        );
        let child;
        if (typeof componentRenderer === 'function') {
          wrapperContext.contentChild = childOfContainer;
          child = componentRenderer(wrapperContext);
        } else {
          child = childOfContainer;
        }

        // @ts-ignore
        res.push(child);
        // res.push(<Elem id={id} key={id}>{child}</Elem>);
      } else {
        const child: any = componentRenderer?.(wrapperContext);
        res.push(child);
      }
    }
  }
  return res;
};

// const mockLayoutData = [{ "widgetRef":"FlexLayout","wGroupType":"layout","label":"Flex 布局","acceptChildStrategy":{ "strategy":"blackList","blackList":[] },"id":"FtpH_iNb","_state":"active","propState":{ "labelColor":null,"columnCount":null },"body":[{ "label":"文本框","widgetRef":"FormInput","wGroupType":"formController","eventAttr":[{ "alias":"值改变事件","type":"onChange" },{ "alias":"鼠标移入事件","type":"onMouseIn" },{ "alias":"鼠标移除事件","type":"onMouseOut" }],"varAttr":[{ "alias":"实际值","attr":"realVal","type":"string" },{ "alias":"显示值","attr":"showVal","type":"string" }],"parentID":"FtpH_iNb","id":"TTIOFQ9S","_state":"active","propState":{ "field":null,"widgetCode":"FormInput.24","labelColor":null,"title":"文本框","unit":null,"realVal":null,"exp":null,"variable":null,"checkFixedRule":null,"checkCustomRule":null,"checkErrorTooltip":null,"eventRef":null } }] },{ "id":"temp-entity_1.5366455678315278","_state":"temp-entity" }];

/**
 * 布局渲染器
 */
const LayoutRenderer: React.FC<LayoutRendererProps> = (props) => {
  const { dsl, RootRender, componentRenderer } = props;
  const { content } = dsl;
  // const getActionByID = (aID) => {
  //   return action[aID];
  // };
  // console.log(JSON.stringify(layoutNode));
  const layoutRenderRes = renderLayout(content, {
    componentRenderer,
  });
  return typeof RootRender === 'function' ? (
    RootRender(layoutRenderRes)
  ) : (
    <div className="layout-parser-content">{layoutRenderRes}</div>
  );
};

export { LayoutRenderer };
