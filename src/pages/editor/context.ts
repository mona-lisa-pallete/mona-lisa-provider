import React from 'react';
import { initState } from './index';
import { IAction, IState } from './types';

interface EditorContextType {
  state: IState;
  dispatch: (action: IAction) => any;
  setActionData: (data: any) => void;
}

const EditorContext = React.createContext<EditorContextType>({
  state: initState,
  dispatch: () => {},
  setActionData: () => {},
});

export default EditorContext;
