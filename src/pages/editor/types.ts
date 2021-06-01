import {
  IAddComponentAction,
  IMoveComponentAction,
  IInsetComponentAction,
  IInsetBoxComponentAction,
  IUpdateComponentAction,
  ISetSelectedRefAction,
  ISetFormData,
  ISetPageData,
  ISetComponentMeta,
  ISetPageName,
} from './action';

import { CSSProperties } from 'react';

export const DSLActionType = {
  openPage: 'openPage',
  openH5: 'openH5',
  openMini: 'openMini',
  toast: 'toast',
  openModal: 'openModal',
};

interface DSLAction {
  /** 行为 ID, 由后台自动生成 */
  [actionId: string]: {
    /** 行为类型 */
    actionType: keyof typeof DSLActionType;
    /** 行为名称 */
    actionLabel: string;
    /** 行为代码, 只有自定义行为时才会有 */
    actionCode?: string;
    actionProp?: { [key: string]: any };
  };
}

interface ContentProp {
  /** 属性的键值对，由平台定义，文档: TODO */
  [key: string]: any;
  style?: CSSProperties;
  event?: { [key: string]: string[] };
}

export interface DSLContent {
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

export interface DSL {
  /** DSL 的布局内容 */
  content: DSLContent[];
  /** DSL 的行为 */
  action?: DSLAction;
}

export interface IState {
  dsl: DSL;
  selectedElementRef: undefined | string;
  selectedElementId: undefined | string;
  formData: any;
  selectedElementMeta: undefined | any;
  selectedContainerId: undefined | string;
  pageName: string;
}

export type IAction =
  | IAddComponentAction
  | IMoveComponentAction
  | IInsetComponentAction
  | IInsetBoxComponentAction
  | IUpdateComponentAction
  | ISetSelectedRefAction
  | ISetFormData
  | ISetPageData
  | ISetComponentMeta
  | ISetPageName;

export enum ActionType {
  AddComponent = 'ADD_COMPONENT',
  MoveComponent = 'MOVE_COMPONENT',
  InsetComponent = 'INSET_COMPONENT',
  InsetBoxComponentAction = 'INSET_BOX_COMPONENT',
  UpdateComponent = 'UPDATE_COMPONENT',
  SetSelectedRef = 'SET_SELECTED_REF',
  SetFormData = 'SET_FORM_DATA',
  SetPageData = 'SET_PAGE_DATA',
  SetComponentMeta = 'SET_COMPONENT_META',
  SetPageName = 'SET_PAGE_NAME',
}
