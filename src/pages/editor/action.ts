import { CSSProperties } from 'react';
import { MaterialType } from '../material-manage/types';
import { ActionType, DSL } from './types';

export interface IAddComponentAction {
  type: ActionType.AddComponent;
  payload: {
    id: number;
    text: string;
    style: CSSProperties;
  };
}

export interface IMoveComponentAction {
  type: ActionType.MoveComponent;
  payload: {
    data: any[];
  };
}

export interface IInsetComponentAction {
  type: ActionType.InsetComponent;
  payload: {
    data: any[];
  };
}

export interface IInsetBoxComponentAction {
  type: ActionType.InsetBoxComponentAction;
  payload: {
    data: any[];
  };
}

export interface IUpdateComponentAction {
  type: ActionType.UpdateComponent;
  payload: {
    dsl: DSL;
  };
}

export interface ISetSelectedRefAction {
  type: ActionType.SetSelectedRef;
  payload: {
    ref: string | undefined;
    id: string | undefined;
    containerId: string | undefined;
  };
}

export interface ISetFormData {
  type: ActionType.SetFormData;
  payload: {
    data: any;
  };
}

export interface ISetPageData {
  type: ActionType.SetPageData;
  payload: {
    dsl: any;
  };
}

export interface ISetComponentMeta {
  type: ActionType.SetComponentMeta;
  payload: {
    meta: any;
  };
}

export interface ISetPageName {
  type: ActionType.SetPageName;
  payload: {
    name: string;
  };
}

export interface ISetComponentData {
  type: ActionType.SetComponentData;
  payload: {
    componentData: any[];
  };
}

export interface ISetResize {
  type: ActionType.SetResize;
  payload: {
    resize: string | number;
  };
}

export interface ISetMaterials {
  type: ActionType.SetMaterials;
  payload: {
    materials: Array<{ ossUrl: string; materialType: MaterialType }>;
  };
}

export interface ISetOldDslStr {
  type: ActionType.SetOldDslStr;
  payload: {
    dslStr: string;
  };
}
