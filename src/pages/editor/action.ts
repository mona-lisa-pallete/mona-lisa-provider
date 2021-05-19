import { CSSProperties } from 'react';
import { ActionType } from './types';

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
    data: any[];
  };
}

export interface ISetSelectedRefAction {
  type: ActionType.SetSelectedRef;
  payload: {
    ref: string;
  };
}
