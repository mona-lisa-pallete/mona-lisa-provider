import React from 'react';
import { initState } from './index';
import { IAction, IState } from './types';

interface EditorContextType {
  state: IState;
  dispatch: (action: IAction) => any;
  setActionData: (data: any) => void;
  setDragContainerId: (id: string) => void;
}

const EditorContext = React.createContext<EditorContextType>({
  state: initState,
  dispatch: () => {},
  setActionData: () => {},
  setDragContainerId: () => {},
});

export default EditorContext;
