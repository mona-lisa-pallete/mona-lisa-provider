/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ViewportBox from './components/Viewport';
import EditorContext from './context';
import reducer from './reducer';
import ComponentClassification from './components/ComponentClassification';
import { useHideHeader, useWidgetMeta } from './hooks';
import EditorHeader from './components/EditorHeader';
import { ComponentData, ComponentType } from './data';
import { EditorConfig, EditorMain } from './index.style';
import { Form, Tabs } from 'antd';
import PageForm from './components/PageForm';
// import DvImageForm from '@/_components/DvImage/form';
import ActionForm from './components/ActionForm';
import { DSL, DSLContent, IState, ActionType as ReducerActionType } from './types';
import { getComponents, getPage } from '@/services/editor';
import { useLocation } from 'react-router-dom';
import { groupBy } from 'lodash';

const { TabPane } = Tabs;

export const initState: IState = {
  dsl: {
    content: [],
    // content: [
    //   {
    //     contentType: 'container',
    //     contentProp: {
    //       style: {
    //         position: 'relative',
    //         width: '100%',
    //         height: '300px',
    //       },
    //     },
    //     contentChild: [
    //       {
    //         contentType: 'element',
    //         contentProp: {
    //           style: {
    //             position: 'absolute',
    //             left: '20px',
    //             top: '30px',
    //             width: '300px',
    //           },
    //           event: {
    //             onClick: ['bca84122a2a498e30300bce50b2ca490'],
    //             onBlur: ['2'],
    //           },
    //           url:
    //             'https://static.guorou.net/upload_collection/202125/3d6dbc359b7181614943756062.png',
    //         },
    //         elementId: '2',
    //         elementRef: 'DvImage',
    //       },
    //     ],
    //   },
    // ],
    // action: {
    //   bca84122a2a498e30300bce50b2ca490: {
    //     actionLabel: '打开新页面',
    //     actionType: 'openPage',
    //   },
    //   2: {
    //     actionLabel: '打开新页面',
    //     actionType: 'toast',
    //   },
    // },
  },
  selectedElementRef: undefined,
  selectedElementId: undefined,
  formData: {},
};

const CompPropEditorLoader = ({ widgetMeta, onChange, actionRender }: any) => {
  const hasMeta = !!widgetMeta;
  const FormComp = hasMeta
    ? window[widgetMeta.propFormConfig.customFormRef]?.default || 'div'
    : 'div';
  return hasMeta ? <FormComp onChange={onChange} actionRender={actionRender} /> : null;
};

const Editor: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [componentVal, setComponentVal] = useState(ComponentType.Picture);
  const location: any = useLocation();
  const { query } = location;
  const [componentMap, setComponentMap] = useState<{ [key: string]: any[] }>({});

  useHideHeader();

  const { fetching: fetchingMeta, metadata: widgetMeta } = useWidgetMeta(state.selectedElementRef);
  console.log(fetchingMeta, widgetMeta);

  const handleComponentVal = (val: ComponentType) => {
    setComponentVal(val);
  };

  const changeElement = (
    content: DSL['content'],
    id: string,
    data: any,
  ): DSLContent[] | undefined => {
    const list = content.map((i) => {
      if (i.contentChild && i.contentChild.length) {
        i.contentChild.forEach((childItem, index) => {
          i.contentChild![index].contentProp = data;
        });
      }
      return i!;
    });

    return list!;
  };

  const handleData = (changeVal: any, allVal: any) => {
    console.log(changeVal);

    if (changeVal?.action) {
      console.log(allVal);
      // return;
    }
    const data = { ...state.formData.contentProp, ...allVal };

    console.log(data, 'datadata');

    if (state.selectedElementId) {
      const content = changeElement(state.dsl.content, state.selectedElementId, data);
      dispatch({
        type: ReducerActionType.UpdateComponent,
        payload: {
          dsl: {
            ...state.dsl,
            content,
          },
        },
      });
    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getPage(query.pageId);
      dispatch({
        type: ReducerActionType.SetPageData,
        payload: {
          dsl: res.data.dsl,
        },
      });
    };
    if (query.pageId) {
      getData();
    }
  }, []);

  useEffect(() => {
    const getComponentsData = async () => {
      const res = await getComponents();
      const group = groupBy(res.data, 'componentMeta.classification');
      console.log(group);
      setComponentMap(group);
    };
    getComponentsData();
  }, []);

  return (
    <EditorContext.Provider value={{ dispatch, state }}>
      <DndProvider backend={HTML5Backend}>
        <EditorHeader />
        <EditorMain>
          <ComponentClassification
            componentMap={componentMap}
            onChange={handleComponentVal}
            value={componentVal}
            data={ComponentData}
          />
          <ViewportBox />
          <EditorConfig>
            <Tabs defaultActiveKey="2">
              <TabPane tab="页面设置" key="1">
                <PageForm />
              </TabPane>
              <TabPane tab="组件配置" key="2">
                <CompPropEditorLoader
                  data={state.formData}
                  onChange={handleData}
                  widgetMeta={widgetMeta}
                />
                {state.selectedElementRef && (
                  <Form layout="vertical" onValuesChange={handleData}>
                    <ActionForm pageData={[]} modalData={[]} />
                  </Form>
                )}
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
