import React, { useReducer, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ViewportBox from './components/Viewport';
import EditorContext from './context';
import reducer from './reducer';
import ComponentClassification from './components/ComponentClassification';
import { useHideHeader } from './hooks';
import EditorHeader from './components/EditorHeader';
import { ComponentData, ComponentType } from './data';
import { EditorConfig, EditorMain } from './index.style';
import { Tabs } from 'antd';
import PageForm from './components/PageForm';

const { TabPane } = Tabs;

export const initState = {
  componentList: [],
};

const Editor: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [componentVal, setComponentVal] = useState(ComponentType.Picture);

  useHideHeader();

  const handleComponentVal = (val: ComponentType) => {
    setComponentVal(val);
  };

  return (
    <EditorContext.Provider value={{ dispatch, state }}>
      <DndProvider backend={HTML5Backend}>
        <EditorHeader />
        <EditorMain>
          <ComponentClassification
            onChange={handleComponentVal}
            value={componentVal}
            data={ComponentData}
          />
          <ViewportBox />
          <EditorConfig>
            <Tabs>
              <TabPane tab="页面设置" key="1">
                <PageForm />
              </TabPane>
              <TabPane tab="组件配置" key="2" />
              <TabPane tab="页面交互" key="3" />
            </Tabs>
          </EditorConfig>
        </EditorMain>
      </DndProvider>
    </EditorContext.Provider>
  );
};

export default Editor;
