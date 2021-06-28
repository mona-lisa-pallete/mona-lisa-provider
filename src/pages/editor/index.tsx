/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
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
import { IState, ActionType as ReducerActionType } from './types';
import { getComponents, getPage } from '@/services/editor';
import { useLocation } from 'react-router-dom';
import { groupBy, mergeWith } from 'lodash';
import PlatformUploadTool from '@/_components/PlatformUploadTool';
import PlatformColorPicker from '@/_components/PlatformColorPicker/';
import { changeElementActionById, delElementById, findElementById, getWidgetData } from './utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ComponentForm from './components/ComponentForm';
import PlatformUpload from '@/_components/PlatformUpload';
import PreviewModal from '../page/components/PreviewModal/';
import getPlatform from '@/utils/getPlaform';

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
  const [miniappUrl, setMiniappUrl] = useState('');
  const [previewType, setPreviewType] = useState('');

  useHideHeader(location);

  const seleComponent = allComponent.find((i) => i.ref === state.selectedElementRef);

  const { metadata: widgetMeta } = useWidgetMeta(
    state.selectedElementRef!,
    seleComponent?.compMetaUrl,
    seleComponent?.compUrl,
    seleComponent?.formUrl,
  );

  const handleComponentVal = (val: ComponentType) => {
    setComponentVal(val);
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

  useEffect(() => {
    let componentIsActive = true;
    const getData = async () => {
      const compData = await getComponentsData();
      const res = await getPage(query.pageId);
      if (!componentIsActive) return;
      oldPageName.current = res.data.name;
      if (res.data.miniappUrl) {
        setMiniappUrl(res.data.miniappUrl);
      }
      setPreviewType(getPlatform(res.data.platform));
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

  const setActionData = useCallback((data: any) => {
    actionForm.setFieldsValue(data);
  }, []);

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
  }, [state.selectedElementId]);

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
                <div style={{ height: 50 }} />
                {state.selectedElementRef && (
                  <Button className="del-btn" onClick={handleDelElement}>
                    <DelText>删除组件</DelText>
                  </Button>
                )}
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
            type={previewType as 'h5' | 'h5mini' | 'mini'}
            h5Url={h5Url}
            miniappUrl={miniappUrl}
            miniappCodeUrl={''}
          />
        </EditorMain>
      </DndProvider>
    </EditorContext.Provider>
  );
};

export default Editor;
