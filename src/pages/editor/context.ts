import React from 'react';
import { initState } from './index';
import { IAction, IState } from './types';

interface EditorContextType {
  state: IState;
  dispatch: (action: IAction) => any;
}

const EditorContext = React.createContext<EditorContextType>({
  state: initState,
  dispatch: () => {},
});

export default EditorContext;
