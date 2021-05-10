import React, { useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ComponentList from './components/ComponentList';
import ViewportBox from './components/Viewport/';
import EditorContext from './context';
import reducer from './reducer';

export const initState = {
  componentList: [],
};

const Editor: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <EditorContext.Provider value={{ dispatch, state }}>
      <DndProvider backend={HTML5Backend}>
        <ComponentList />
        <ViewportBox />
      </DndProvider>
    </EditorContext.Provider>
  );
};
export default Editor;
