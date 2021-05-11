import { IAction, IState, ActionType } from './types';

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ActionType.AddComponent:
      return { componentList: [...state.componentList, { child: [action.payload] }] };
    case ActionType.MoveComponent:
      return { componentList: [...action.payload.data] };
    case ActionType.InsetComponent:
      return { componentList: [...action.payload.data] };
    case ActionType.InsetBoxComponentAction:
      return { componentList: [...action.payload.data] };
    default:
      return state;
  }
};

export default reducer;