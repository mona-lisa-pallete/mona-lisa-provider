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
import { DelText, EditorConfig, EditorMain } from './index.style';
import { Button, Form, Tabs } from 'antd';
import ActionForm from './components/ActionForm';
import { DSL, DSLContent, IState, ActionType as ReducerActionType } from './types';
import { getComponents, getPage } from '@/services/editor';
import { useLocation } from 'react-router-dom';
import { groupBy, merge } from 'lodash';
import { CSSProperties } from 'styled-components';
import PlatformUploadTool from '@/_components/PlatformUploadTool';
import PlatformColorPicker from '@/_components/PlatformColorPicker/';
import { delElementById } from './utils';

const { TabPane } = Tabs;

export const initState: IState = {
  dsl: {
    content: [],
    action: {},
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
  selectedElementMeta: undefined,
  selectedContainerId: undefined,
  pageName: '',
  componentData: [],
};

/**
 * 平台提供给接入方的组件或者组件编辑表单的上下文，包含 UI、选择器
 */
const PlatformContext = {
  ui: {
    UploadTool: PlatformUploadTool,
    ColorPicker: PlatformColorPicker,
  },
};

const CompPropEditorLoader = ({ widgetMeta, onChange, actionRender, initialValues }: any) => {
  const hasMeta = !!widgetMeta;
  const FormComp = hasMeta
    ? window[widgetMeta.propFormConfig.customFormRef]?.default || 'div'
    : 'div';
  return hasMeta ? (
    <FormComp
      onChange={onChange}
      initialValues={initialValues}
      platformCtx={PlatformContext}
      actionRender={actionRender}
    />
  ) : null;
};

const Editor: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const [componentVal, setComponentVal] = useState(ComponentType.Picture);
  const location: any = useLocation();
  const { query } = location;
  const [componentMap, setComponentMap] = useState<{ [key: string]: any[] }>({});
  const [allComponent, setAllComponent] = useState<any[]>([]);
  const [containerVal, setContainerVal] = useState<any>({});

  useHideHeader(location);

  const seleComponent = allComponent.find((i) => i.ref === state.selectedElementRef);
  const selectedRefMeta = seleComponent?.componentMeta;
  const cdnUrl = seleComponent?.cdnPath;

  const { fetching: fetchingMeta, metadata: widgetMeta } = useWidgetMeta(
    state.selectedElementRef!,
    selectedRefMeta,
    cdnUrl,
  );

  useEffect(() => {
    if (widgetMeta) {
      dispatch({
        type: ReducerActionType.SetComponentMeta,
        payload: {
          meta: widgetMeta,
        },
      });
    }
  }, [widgetMeta]);

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
          if (id === childItem.elementId) {
            i.contentChild![index].contentProp = merge(i.contentChild![index].contentProp, data);
          }
        });
      }
      return i!;
    });
    return list!;
  };

  const changeElementStyle = (
    content: DSL['content'],
    id: string,
    style: CSSProperties,
  ): DSLContent[] | undefined => {
    const list = content.map((i) => {
      if (i.contentChild && i.contentChild.length) {
        let contentChild: DSLContent[] = [];
        i.contentChild.forEach((childItem, index) => {
          contentChild = i.contentChild!;
          if (id === childItem.elementId) {
            i.contentChild![index].contentProp.style = style;
          }
        });
        if (contentChild) {
          const heightArr: number[] = contentChild
            .filter((contentChildItem) => contentChildItem.contentProp?.style?.height)
            .map((contentChildItem) => contentChildItem!.contentProp!.style!.height) as number[];
          i.contentProp.style = {
            ...i.contentProp.style,
            height: Math.max(...heightArr!),
          };
          // const styleArr = contentChild.map)
        }
      }
      return i!;
    });
    return list!;
  };

  const handleData = (allVal: any) => {
    console.log(allVal);

    const data = { ...state.formData.contentProp, ...allVal };

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

  const handleElementStyle = (style: CSSProperties) => {
    const content = changeElementStyle(state.dsl.content, state.selectedElementId!, style);
    dispatch({
      type: ReducerActionType.UpdateComponent,
      payload: {
        dsl: {
          ...state.dsl,
          content,
        },
      },
    });
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
      dispatch({
        type: ReducerActionType.SetPageName,
        payload: {
          name: res.data.name,
        },
      });
      const elementRefData = res.data?.dsl?.content?.[0]?.contentChild?.[0];
      if (elementRefData) {
        dispatch({
          type: ReducerActionType.SetSelectedRef,
          payload: {
            id: elementRefData.elementId,
            ref: elementRefData.elementRef,
            containerId: res.data?.dsl?.content?.[0]?.elementId,
          },
        });
        dispatch({
          type: ReducerActionType.SetFormData,
          payload: {
            data: elementRefData.contentProp,
          },
        });
      }
    };
    if (query.pageId) {
      getData();
    }
  }, []);

  useEffect(() => {
    const getComponentsData = async () => {
      const res = await getComponents();
      const group = groupBy(res.data, 'componentMeta.classification');
      setComponentMap(group);
      setAllComponent(res.data);
      dispatch({
        type: ReducerActionType.SetComponentData,
        payload: {
          componentData: res.data,
        },
      });
    };
    getComponentsData();
  }, []);

  useEffect(() => {
    if (state.selectedContainerId && !state.selectedElementRef) {
      const element = state.dsl?.content?.find(
        (i: any) => i.elementId === state.selectedContainerId,
      );
      let height: string = element?.contentProp?.style?.height;
      if (height) {
        if (typeof height === 'string' && height.includes('px')) {
          height = height.replace('px', '');
        }
        // setContainerVal({
        //   height,
        // });
      }
    }
  }, [state.dsl?.content, state.selectedContainerId, state.selectedElementRef]);

  const handleDelElement = () => {
    const { content, action } = delElementById(
      state.selectedElementId!,
      state.dsl.content,
      state.dsl.action,
    );
    dispatch({
      type: ReducerActionType.UpdateComponent,
      payload: {
        dsl: {
          content,
          action,
        },
      },
    });
  };

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
              <TabPane tab="组件配置" key="2">
                {state.selectedElementId && '组件ID：'}
                {state.selectedElementId}
                {widgetMeta && state.selectedContainerId && state.selectedElementId && (
                  <CompPropEditorLoader
                    initialValues={state.formData}
                    onChange={handleData}
                    widgetMeta={widgetMeta}
                    onChangeStyle={handleElementStyle}
                  />
                )}
                {state.selectedElementRef && widgetMeta?.propFormConfig?.useActionForm && (
                  <Form
                    layout="vertical"
                    onValuesChange={(changedValues: any, values: any) => {
                      handleData(values);
                    }}
                  >
                    <ActionForm pageData={[]} modalData={[]} />
                  </Form>
                )}
                {state.selectedElementRef && (
                  <Button onClick={handleDelElement}>
                    <DelText>删除组件</DelText>
                  </Button>
                )}
              </TabPane>
              {/* <TabPane tab="页面交互" key="3" /> */}
            </Tabs>
          </EditorConfig>
        </EditorMain>
      </DndProvider>
    </EditorContext.Provider>
  );
};

export default Editor;
