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
        selectedContainerId: action.payload.containerId,
      };
    case ActionType.SetFormData:
      return {
        ...state,
        formData: action.payload.data,
      };
    case ActionType.SetPageData:
      return {
        ...state,
        dsl: action.payload.dsl,
      };
    case ActionType.SetComponentMeta:
      return {
        ...state,
        selectedElementMeta: action.payload.meta,
      };
    case ActionType.SetPageName:
      return {
        ...state,
        pageName: action.payload.name,
      };
    case ActionType.SetComponentData:
      return {
        ...state,
        componentData: action.payload.componentData,
      };
    case ActionType.SetResize:
      return {
        ...state,
        resize: action.payload.resize,
      };
    case ActionType.SetMaterials:
      return {
        ...state,
        materials: action.payload.materials,
      };
    default:
      return state;
  }
};

export default reducer;
