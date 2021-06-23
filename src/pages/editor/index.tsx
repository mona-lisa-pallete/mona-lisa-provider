/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
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
import { Button, Form, Modal, Tabs } from 'antd';
import ActionForm from './components/ActionForm';
import { DSL, DSLContent, IState, ActionType as ReducerActionType } from './types';
import { getComponents, getPage } from '@/services/editor';
import { useLocation } from 'react-router-dom';
import { groupBy, merge, mergeWith } from 'lodash';
import { CSSProperties } from 'styled-components';
import PlatformUploadTool from '@/_components/PlatformUploadTool';
import PlatformColorPicker from '@/_components/PlatformColorPicker/';
import { changeElementActionById, delElementById, findElementById, getWidgetData } from './utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ComponentForm from './components/ComponentForm';
import PlatformUpload from '@/_components/PlatformUpload';
import PreviewModal from '../page/components/PreviewModal/';

const { TabPane } = Tabs;
const { confirm } = Modal;

const isDevEnv = process.env.NODE_ENV === 'development';

export const initState: IState = {
  dsl: {
    content: [],
    action: {},
  },
  selectedElementRef: undefined,
  selectedElementId: undefined,
  formData: {},
  selectedElementMeta: undefined,
  selectedContainerId: undefined,
  pageName: '',
  componentData: [],
  resize: undefined,
  materials: [],
  oldDslStr: '',
  oldPageName: '',
};

/**
 * 平台提供给接入方的组件或者组件编辑表单的上下文，包含 UI、选择器
 */
const PlatformContext = {
  ui: {
    UploadTool: PlatformUploadTool,
    ColorPicker: PlatformColorPicker,
    Upload: PlatformUpload,
  },
};

const CompPropEditorLoader = ({ widgetMeta, onChange, actionRender, initialValues, id }: any) => {
  const hasMeta = !!widgetMeta;
  const FormComp = hasMeta
    ? (window[widgetMeta.propFormConfig.customFormRef] as any)?.default || 'div'
    : 'div';
  return hasMeta ? (
    <FormComp
      onChange={onChange}
      initialValues={initialValues}
      platformCtx={PlatformContext}
      id={id}
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
  const [resizeVal, setResizeVal] = useState<any>({});
  const [actionForm] = Form.useForm();
  const resizeRef = useRef('');
  const dragContainerId = useRef('');
  const [observer, setObserver] = useState<any>();
  const oldDsl = useRef(JSON.stringify(state.dsl));
  const currentDsl = useRef<any>();
  const oldPageName = useRef(JSON.stringify(state.pageName));
  const [previewVisible, setPreviewVisible] = useState(false);
  const [h5Url, setH5Url] = useState('');

  useHideHeader(location);

  const seleComponent = allComponent.find((i) => i.ref === state.selectedElementRef);

  const { fetching: fetchingMeta, metadata: widgetMeta } = useWidgetMeta(
    state.selectedElementRef!,
    seleComponent?.compMetaUrl,
    seleComponent?.compUrl,
    seleComponent?.formUrl,
  );

  const handleComponentVal = (val: ComponentType) => {
    setComponentVal(val);
  };

  const changeElement = (
    content: DSL['content'],
    id: string,
    data: any,
  ): DSLContent[] | undefined => {
    const contentData: DSL['content'] = JSON.parse(JSON.stringify(content));
    const list = contentData.map((i) => {
      if (i.contentChild && i.contentChild.length) {
        i.contentChild.forEach((childItem, index) => {
          if (id === childItem.elementId) {
            // TODO 这里的merge方法建议使用 immutable 库。
            // 这里对于数组会进行合并而不是替换，尝试 mergeWith API
            i.contentChild![index].contentProp = mergeWith(
              i.contentChild![index].contentProp,
              data,
              (a, b) => (Array.isArray(b) ? b : undefined),
            );
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
    const contentCopy: DSLContent[] = JSON.parse(JSON.stringify(content));
    const list = contentCopy.map((i) => {
      if (i.contentChild && i.contentChild.length) {
        if (i.elementId === id) {
          i.contentProp.style = merge(i.contentProp.style, style);
          return i;
        }
        i.contentChild.forEach((childItem, index) => {
          if (id === childItem.elementId) {
            i.contentChild![index].contentProp.style = merge(
              i.contentChild![index].contentProp.style,
              style,
            );
            console.log(
              i.contentChild![index].contentProp.style,
              'i.contentChild![index].contentProp.style',
            );
          }
        });
      }
      return i!;
    });
    return list!;
  };

  const handleData = useCallback(
    (allVal: any) => {
      const data = { ...state.formData.contentProp, ...allVal };

      if (state.selectedElementId) {
        dispatch({
          type: ReducerActionType.ChangeElement,
          payload: {
            data,
          },
        });
      }
    },
    [state],
  );

  const handleActionData = (val: any) => {
    if (!val) {
      return;
    }
    const actionData = JSON.parse(JSON.stringify(val));
    const list =
      actionData?.action?.filter(
        (i: any) => !!i?.actionType && !!i.data && Object.keys(i.data).length,
      ) || undefined;
    if (list.length) {
      const onClickData: string[] = list.map((i: any, index: number) => {
        return state.selectedElementId! + index;
      });
      const obj: any = {};
      onClickData.forEach((i, index) => {
        obj[i] = {
          actionType: list[index]?.actionType,
          actionProp: {
            ...list[index].data,
          },
        };
      });
      const content = changeElementActionById(state.selectedElementId!, state.dsl.content, {
        onClick: onClickData,
      });
      dispatch({
        type: ReducerActionType.UpdateComponent,
        payload: {
          dsl: {
            content,
            action: mergeWith(state.dsl.action, obj),
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
          content: content!,
        },
      },
    });
  };

  useEffect(() => {
    let componentIsActive = true;
    const getData = async () => {
      const compData = await getComponentsData();
      const res = await getPage(query.pageId);
      if (!componentIsActive) return;
      oldPageName.current = res.data.name;
      dispatch({
        type: ReducerActionType.SetOldDslStr,
        payload: {
          dslStr: JSON.stringify(res.data.dsl),
        },
      });
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
      dispatch({
        type: ReducerActionType.ChangeOldPageName,
        payload: {
          name: res.data.name,
        },
      });
      const elementRefList: Array<{
        compUrl: string;
        formUrl: string;
        compMetaUrl: string;
        name: string;
      }> = [];
      res.data.dsl?.content?.forEach((i) => {
        if (i?.contentChild) {
          i.contentChild.forEach((child) => {
            const compItemData = compData.find((compItem) => compItem.ref === child.elementRef);
            elementRefList.push({
              name: child.elementRef!,
              compUrl: compItemData!.compUrl!,
              formUrl: compItemData!.formUrl!,
              compMetaUrl: compItemData!.compMetaUrl!,
            });
          });
        }
      });
      getWidgetData(elementRefList);
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
    } else {
      getComponentsData();
    }
    return () => {
      componentIsActive = false;
    };
  }, []);

  const getComponentsData = useCallback(async () => {
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
    return Promise.resolve(res.data);
  }, []);

  // useDebounce(
  //   () => {
  //     console.log(observer, resizeRef.current);
  //     if (!observer || !resizeRef.current) {
  //       return;
  //     }
  //     console.log(2);
  //     const isAddContainer = document.getElementById(dragContainerId.current);
  //     if (isAddContainer) {
  //       let height = 0;
  //       const childDom: any[] = [];
  //       let childNodes = isAddContainer.querySelectorAll('.drag-item-container');
  //       childNodes = [...childNodes].map((i) => i.firstElementChild);

  //       childNodes.forEach((childNode) => {
  //         childDom.push({
  //           top: (childNode as HTMLDivElement).getBoundingClientRect().top,
  //           bottom: (childNode as HTMLDivElement).getBoundingClientRect().bottom,
  //         });
  //       });
  //       const childDomTop = childDom.map((childNode) => childNode.top);
  //       const childDomBottom = childDom.map((childNode) => childNode.bottom);
  //       const minTop = Math.min(...childDomTop);
  //       const maxBottom = Math.max(...childDomBottom);
  //       height = evaluate(`${maxBottom}-${minTop}`);
  //       console.log(3);

  //       if (height) {
  //         const list = changeElementStyle(state.dsl.content, state.selectedContainerId!, {
  //           height,
  //         });
  //         dispatch({
  //           type: ReducerActionType.UpdateComponent,
  //           payload: {
  //             dsl: {
  //               content: list!,
  //               action: state.dsl.action,
  //             },
  //           },
  //         });
  //         resizeRef.current = '';
  //       }
  //     }
  //   },
  //   200,
  //   [observer],
  // );

  // // 监听dsl并改变当前容器高度
  // useEffect(() => {
  //   if (resizeRef.current) {
  //     return;
  //   }
  //   if (state.selectedContainerId) {
  //     const element: DSLContent = state.dsl?.content?.find(
  //       (i: any) => i.elementId === state.selectedContainerId,
  //     );
  //     setTimeout(() => {
  //       const containerDom = document.getElementById(state.selectedContainerId!);
  //       const childDom = element?.contentChild.map((i) => {
  //         const dom = document.getElementById(`${i.elementId}`);
  //         return {
  //           top: dom!.getBoundingClientRect().top,
  //           bottom: dom!.getBoundingClientRect().bottom,
  //         };
  //       });
  //       if (childDom?.length) {
  //         const childDomTop = childDom.map((i) => i.top);
  //         const childDomBottom = childDom.map((i) => i.bottom);
  //         const minTop = Math.min(...childDomTop);
  //         const maxBottom = Math.max(...childDomBottom);
  //         const height = evaluate(`${maxBottom}-${minTop}`);
  //         const containerDomH = containerDom.getBoundingClientRect().height;
  //         if (containerDom && containerDomH === height) {
  //           console.log('无需调整');
  //           return;
  //         }
  //         const container = findElementById(state.selectedContainerId!, state.dsl.content);
  //         const topStyle = container.contentChild?.map((i) => i.contentProp?.style?.top);
  //         const minTopStyle = Math.min(...(topStyle as []));
  //         console.log(minTopStyle, 'minTopStyleminTopStyle');

  //         const content = reizeElementStyle(
  //           state.dsl.content,
  //           state.selectedContainerId!,
  //           {
  //             height,
  //           },
  //           0,
  //         );
  //         dispatch({
  //           type: ReducerActionType.UpdateComponent,
  //           payload: {
  //             dsl: {
  //               content: content!,
  //               action: state.dsl.action,
  //             },
  //           },
  //         });
  //         resizeRef.current = true;
  //       }
  //     }, 500);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state.resize, state.dsl.content]);

  // const resizeContainer = useCallback(() => {
  //   console.log('resizeContainer');

  //   const targetNode = document.querySelector('.viewport-box');

  //   const o = new MutationObserver((mutationsList) => {
  //     mutationsList.forEach((i) => {
  //       if (i.addedNodes?.[0]?.className?.includes('inset-box')) {
  //         return;
  //       }
  //       if (i.removedNodes?.[0]?.className?.includes('inset-box')) {
  //         return;
  //       }
  //       // console.log(i);
  //       setObserver(i);
  //     });
  //   });

  //   // if (state.selectedContainerId && state.resize) {
  //   const config = { childList: true, subtree: true };
  //   o.observe(targetNode!, config);
  //   // }
  //   return () => {
  //     setObserver(null);
  //     o.disconnect();
  //     resizeRef.current = '';
  //   };
  // }, [resizeVal]);

  // useLayoutEffect(() => {
  //   resizeContainer();
  // }, [resizeContainer]);

  // 根据当前的elementId来动态修改action表单
  useEffect(() => {
    if (!state.selectedElementId) {
      return;
    }
    const element = findElementById(state.selectedElementId, state.dsl.content);
    if (element?.contentProp?.event?.onClick) {
      const list = element?.contentProp?.event?.onClick.slice();
      const actionArr: any[] = [];

      list.forEach((i) => {
        const actionData = state.dsl.action?.[i];
        if (actionData) {
          actionArr.push({
            actionType: actionData.actionType,
            data: actionData.actionProp,
          });
        }
        // const { action } = state.dsl.action;
      });
      setActionData({
        action: actionArr,
      });
    } else {
      setActionData({
        action: [],
      });
    }
  }, [state.selectedElementId, state.dsl]);

  const handleDelElement = () => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '删除之后暂时无法找回，是否确认删除？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      async onOk() {
        const { content, action } = delElementById(
          state.selectedElementId!,
          state.dsl.content,
          state.dsl.action!,
        );
        dispatch({
          type: ReducerActionType.SetSelectedRef,
          payload: {
            id: undefined,
            containerId: state.selectedContainerId,
            ref: undefined,
          },
        });
        dispatch({
          type: ReducerActionType.UpdateComponent,
          payload: {
            dsl: {
              content,
              action,
            },
          },
        });
        resizeContainerFn();
      },
    });
  };

  const setActionData = (data: any) => {
    actionForm.setFieldsValue(data);
  };

  const setDragContainerId = (id: string) => {
    dragContainerId.current = id;
  };

  const handleResize = (str: string) => {
    resizeRef.current = str;
    setResizeVal(new Date().getTime());
  };

  const resizeContainerFn = () => {
    resizeRef.current = '111';
    setObserver(new Date().getTime());
  };

  const getCurrentDsl = () => {
    return currentDsl.current;
  };

  const setCurrentDsl = (dsl: any) => {
    currentDsl.current = dsl;
  };

  return (
    <EditorContext.Provider
      value={{
        dispatch,
        state,
        setActionData,
        setDragContainerId,
        handleResize,
        resizeContainerFn,
        getCurrentDsl,
        setCurrentDsl,
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <EditorHeader
          onPreview={(url) => {
            setH5Url(url);
            setPreviewVisible(true);
          }}
        />
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
              <TabPane
                style={{
                  height: 'calc(100vh - 120px)',
                  overflow: 'auto',
                }}
                tab={<div style={{ padding: '0 20px' }}>组件配置</div>}
                key="2"
              >
                {isDevEnv && state.selectedElementId && `组件ID：${state.selectedElementId}`}
                {widgetMeta && state.selectedContainerId && state.selectedElementId && (
                  <ComponentForm
                    initialValues={state.formData}
                    onChange={handleData}
                    widgetMeta={widgetMeta}
                    id={state.selectedElementId}
                    PlatformContext={PlatformContext}
                  />
                )}
                <Form
                  style={{
                    display:
                      state.selectedElementRef && (widgetMeta as any)?.propFormConfig?.useActionForm
                        ? 'block'
                        : 'none',
                  }}
                  layout="vertical"
                  form={actionForm}
                  onValuesChange={(changedValues: any, values: any) => {
                    handleActionData(values);
                  }}
                >
                  <ActionForm pageData={[]} modalData={[]} />
                </Form>
                {state.selectedElementRef && (
                  <Button className="del-btn" onClick={handleDelElement}>
                    <DelText>删除组件</DelText>
                  </Button>
                )}
                {/* <Form
                  onValuesChange={(a, b) => {
                    console.log(a, b);
                  }}
                  initialValues={{
                    file: 'https://t7.baidu.com/it/u=4036010509,3445021118&fm=193&f=GIF',
                  }}
                >
                  <Form.Item name="file">
                    <PlatformUpload />
                  </Form.Item>
                </Form> */}
              </TabPane>
              <TabPane tab={<div style={{ padding: '0 20px' }}>页面交互</div>} key="3">
                敬请期待
              </TabPane>
            </Tabs>
          </EditorConfig>
          <PreviewModal
            visible={previewVisible}
            onChange={() => {
              setPreviewVisible(false);
            }}
            type="h5"
            h5Url={h5Url}
          />
        </EditorMain>
      </DndProvider>
    </EditorContext.Provider>
  );
};

export default Editor;
