import {
  IAddComponentAction,
  IMoveComponentAction,
  IInsetComponentAction,
  IInsetBoxComponentAction,
  IUpdateComponentAction,
  ISetSelectedRefAction,
} from './action';

import { CSSProperties } from 'react';

interface DSLAction {
  /** 行为 ID, 由后台自动生成 */
  [actionId: string]: {
    /** 行为类型 */
    actionType: string;
    /** 行为名称 */
    actionLabel: string;
    /** 行为代码, 只有自定义行为时才会有 */
    actionCode?: string;
  };
}

interface ContentProp {
  /** 属性的键值对，由平台定义，文档: TODO */
  [key: string]: any;
  style?: CSSProperties;
}

interface DSLContent {
  /** Content 类型 */
  contentType: 'container' | 'element';
  /** Content 的属性，如生命周期、样式、行为等 */
  contentProp: ContentProp;
  /** Content 子内容，解析时递归解析 */
  contentChild?: DSLContent[];
  /** element 的唯一 id, 只有当 contentType = 'elememt' 时才会自动生成 */
  elementId?: string;
  /** element 的引用，一般与 dom 中的 elememt name 相同, 只有当 contentType = 'elememt' 时才会自动生成 */
  elementRef?: string;
}

interface DSL {
  /** DSL 的布局内容 */
  content: DSLContent[];
  /** DSL 的行为 */
  action: DSLAction;
}

export interface IState {
  componentList: any[];
  dsl: DSL;
  selectedElementRef: undefined | string;
}

export type IAction =
  | IAddComponentAction
  | IMoveComponentAction
  | IInsetComponentAction
  | IInsetBoxComponentAction
  | IUpdateComponentAction
  | ISetSelectedRefAction;

export enum ActionType {
  AddComponent = 'ADD_COMPONENT',
  MoveComponent = 'MOVE_COMPONENT',
  InsetComponent = 'INSET_COMPONENT',
  InsetBoxComponentAction = 'INSET_BOX_COMPONENT',
  UpdateComponent = 'UPDATE_COMPONENT',
  SetSelectedRef = 'SET_SELECTED_REF',
}
