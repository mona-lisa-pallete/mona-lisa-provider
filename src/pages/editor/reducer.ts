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
    case ActionType.UpdateComponent:
      return { ...state, dsl: action.payload.dsl };
    case ActionType.SetSelectedRef:
      return {
        ...state,
        selectedElementRef: action.payload.ref,
        selectedElementId: action.payload.id,
      };
    case ActionType.SetFormData:
      return {
        ...state,
        formData: action.payload.data,
      };
    default:
      return state;
  }
};

export default reducer;
