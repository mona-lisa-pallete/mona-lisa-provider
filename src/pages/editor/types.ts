import {
  IAddComponentAction,
  IMoveComponentAction,
  IInsetComponentAction,
  IInsetBoxComponentAction,
} from './action';

export interface IState {
  componentList: any[];
}

export type IAction =
  | IAddComponentAction
  | IMoveComponentAction
  | IInsetComponentAction
  | IInsetBoxComponentAction;

export enum ActionType {
  AddComponent = 'ADD_COMPONENT',
  MoveComponent = 'MOVE_COMPONENT',
  InsetComponent = 'INSET_COMPONENT',
  InsetBoxComponentAction = 'INSET_BOX_COMPONENT',
}
