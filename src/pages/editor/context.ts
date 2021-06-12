import React from 'react';
import { initState } from './index';
import { IAction, IState } from './types';

interface EditorContextType {
  state: IState;
  dispatch: (action: IAction) => any;
  setActionData: (data: any) => void;
  setDragContainerId: (id: string) => void;
  handleResize: (resize: string) => void;
  resizeContainerFn: () => void;
  getCurrentDsl: () => void;
  setCurrentDsl: (dsl: any) => void;
}

const EditorContext = React.createContext<EditorContextType>({
  state: initState,
  dispatch: () => {},
  setActionData: () => {},
  setDragContainerId: () => {},
  handleResize: () => {},
  resizeContainerFn: () => {},
  getCurrentDsl: () => {},
  setCurrentDsl: () => {},
});

export default EditorContext;
