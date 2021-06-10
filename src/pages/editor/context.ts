import React from 'react';
import { initState } from './index';
import { IAction, IState } from './types';

interface EditorContextType {
  state: IState;
  dispatch: (action: IAction) => any;
  setActionData: (data: any) => void;
  setDragContainerId: (id: string) => void;
  getDslIsSave: () => boolean;
  handleResize: (resize: string) => void;
  resizeContainerFn: () => void;
  addMaterialUrl: (material: { ossUrl: string; materialType: string }) => void;
}

const EditorContext = React.createContext<EditorContextType>({
  state: initState,
  dispatch: () => {},
  setActionData: () => {},
  setDragContainerId: () => {},
  getDslIsSave: () => false,
  handleResize: () => {},
  resizeContainerFn: () => {},
  addMaterialUrl: () => {},
});

export default EditorContext;
