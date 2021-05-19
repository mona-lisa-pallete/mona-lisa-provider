import React, { useEffect, useReducer, useState } from 'react';
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
import DvImageForm from '@/_components/DvImage/form';
import ActionForm from './components/ActionForm';
import { IState } from './types';

const { TabPane } = Tabs;

export const initState: IState = {
  componentList: [],
  dsl: {
    content: [
      {
        contentType: 'container',
        contentProp: {
          style: {
            position: 'relative',
          },
        },
        contentChild: [
          {
            contentType: 'element',
            contentProp: {
              style: {
                position: 'absolute',
                left: '20px',
                top: '30px',
                width: '300px',
              },
              onClick: ['bca84122a2a498e30300bce50b2ca490'],
              url:
                'https://static.guorou.net/upload_collection/202125/3d6dbc359b7181614943756062.png',
            },
            elementId: '1',
            elementRef: 'DvImage',
          },
        ],
      },
    ],
    action: {
      bca84122a2a498e30300bce50b2ca490: {
        actionLabel: '打开新页面',
        actionType: 'openPage',
      },
    },
  },
  selectedElementRef: undefined,
};

const Editor: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [componentVal, setComponentVal] = useState(ComponentType.Picture);

  useHideHeader();

  const handleComponentVal = (val: ComponentType) => {
    setComponentVal(val);
  };

  const handleData = (changeVal, allVal) => {
    console.log(changeVal, allVal);
  };

  useEffect(() => {
    console.log(state.selectedElementRef);
  }, [state.selectedElementRef]);

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
              <TabPane tab="组件配置" key="2">
                <DvImageForm onChange={handleData} data={{}}>
                  <ActionForm />
                </DvImageForm>
              </TabPane>
              <TabPane tab="页面交互" key="3" />
            </Tabs>
          </EditorConfig>
        </EditorMain>
      </DndProvider>
    </EditorContext.Provider>
  );
};

export default Editor;
