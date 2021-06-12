/* eslint-disable no-case-declarations */
import { IAction, IState, ActionType } from './types';
import { changeElement, changeElementStyleById } from './utils';

const reducer: React.Reducer<IState, IAction> = (state, action) => {
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
    case ActionType.SetOldDslStr:
      return {
        ...state,
        oldDslStr: action.payload.dslStr,
      };
    case ActionType.ChangeElementStyle:
      const elementContent = changeElementStyleById(
        state.selectedElementId!,
        state.dsl.content,
        action.payload.data,
      );
      return { ...state, dsl: { content: elementContent, action: state.dsl.action } };
    case ActionType.ChangeElement:
      const content = changeElement(
        state.dsl.content,
        state.selectedElementId!,
        action.payload.data,
      );
      return { ...state, dsl: { content, action: state.dsl.action } };
    case ActionType.ChangeOldPageName:
      return { ...state, oldPageName: action.payload.name };
    default:
      return state;
  }
};

export default reducer;
