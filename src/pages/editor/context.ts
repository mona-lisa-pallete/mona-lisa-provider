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
}

const EditorContext = React.createContext<EditorContextType>({
  state: initState,
  dispatch: () => {},
  setActionData: () => {},
  setDragContainerId: () => {},
  getDslIsSave: () => false,
  handleResize: () => {},
  resizeContainerFn: () => {},
});

export default EditorContext;
