import { IAction, IState, ActionType } from './types';

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
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
    case ActionType.SetPageData:
      console.log(action.payload.dsl);

      return {
        ...state,
        dsl: action.payload.dsl,
      };
    default:
      return state;
  }
};

export default reducer;
