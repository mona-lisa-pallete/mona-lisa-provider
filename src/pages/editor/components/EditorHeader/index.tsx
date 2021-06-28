import { Button, Popover, Modal, Input, message } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActionBox,
  BackBtn,
  CreatePageBtn,
  EditorHeaderContainer,
  PageItem,
  PageItemImg,
  PageItemName,
  PageList,
  PageNameBox,
  PagePopover,
  PagePopoverBtn,
  PageHeaderCol,
  SaveBtn,
} from './index.style';
import { useHistory, useLocation } from 'umi';
import EditorContext from '../../context';
import { addPage, addPreviewPage } from '@/services/editor';
import { ActionType, DSL } from '../../types';
import { updatePage } from '@/services/page';
import { PagePopoverStyle, TableActionMenu } from '@/pages/page/index.style';
import PageSettingModal from '@/pages/page/components/PageSettingModal';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { addMaterials } from '@/services/material';

interface EditorHeaderProps {
  onPreview: (url: string) => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = (props) => {
  const [expendVal, setExpendVal] = useState(false);
  const [pageNameTip, setPageNameTip] = useState(false);
  const location: any = useLocation();
  const { state, dispatch } = useContext(EditorContext);
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const query = location.query as {
    dev: string;
    pageId: string;
    projectId: string;
    type: 'edit' | 'add';
  };
  const [settingVisible, setSettingVisible] = useState(false);
  const history = useHistory();
  const [pageId, setPageId] = useState(query.pageId);
  const [saveLoading, setSaveLoading] = useState(false);
  const { onPreview } = props;
  const [inputVisible, setInputVisible] = useState(false);
  const InputRef = useRef<any>(null);

  const { confirm } = Modal;

  useEffect(() => {
    setValue(JSON.stringify(state.dsl));
  }, [state.dsl]);

  useEffect(() => {
    if (inputVisible && pageNameTip) {
      setPageNameTip(false);
    }
  }, [inputVisible, pageNameTip]);

  const back = () => {
    if (state.oldDslStr !== JSON.stringify(state.dsl) || state.pageName !== state.oldPageName) {
      confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '请确保你的页面改动已保存，否则会丢失未保存内容',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        centered: true,
        async onOk() {
          // @ts-ignore
          history.push({
            pathname: '/page',
            query: {
              projectId: query.projectId,
            },
          });
        },
      });
      return;
    }
    // @ts-ignore
    history.push({
      pathname: '/page',
      query: {
        projectId: query.projectId,
      },
    });
  };

  const handleAddPage = async (title?: string) => {
    if (!title) {
      setPageNameTip(true);
      message.warning({
        content: '请输入页面名称',
        className: 'page-message',
      });
      return Promise.reject();
    } else if (title !== state.pageName) {
      dispatch({
        type: ActionType.SetPageName,
        payload: {
          name: title,
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    if (query.type === 'edit') {
      return Promise.resolve(query.pageId);
    } else {
      const { page } = await save(state.dsl, title);
      setPageId(page!);
      // @ts-ignore
      history.replace({
        pathname: '/editor',
        query: {
          ...query,
          type: 'edit',
          pageId: page,
        },
      });
      return Promise.resolve(page!);
    }
  };

  const TextArea = (
    <Input.TextArea
      value={value}
      style={{
        height: '400px',
      }}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );

  const preview = async (dsl: any) => {
    // const dslData = typeof dsl === 'string' ? JSON.parse(dsl) : dsl;
    // const res = await addPreviewPage({
    //   dsl: dslData,
    //   page: pageId,
    // });
    // if (res.code === 0) {
    //   // message.success('保存成功');
    //   onPreview(res.data.url);
    //   // window.open(res.data.url);
    // }
    const { webUrl } = await save();
    onPreview(webUrl);
  };

  const save = async (dsl: string | DSL = state.dsl, pageName?: string) => {
    if (!state.pageName && !pageName) {
      setPageNameTip(true);
      message.warning({
        content: '请输入页面名称',
        className: 'page-message',
      });
      return Promise.reject();
    }
    setSaveLoading(true);
    const dslData = typeof dsl === 'string' ? JSON.parse(dsl) : dsl;
    const res = await addPage({
      dsl: dslData,
      page: query.type === 'edit' ? pageId : '',
      name: pageName || state.pageName,
      projectId: parseInt(query.projectId, 10),
    });
    addMaterialsData();
    setSaveLoading(false);
    if (res.code === 0) {
      setPageId(res.data.page);
      if (query.type === 'add') {
        setSettingVisible(true);
      }
      dispatch({
        type: ActionType.SetOldDslStr,
        payload: {
          dslStr: JSON.stringify(state.dsl),
        },
      });
      dispatch({
        type: ActionType.ChangeOldPageName,
        payload: {
          name: pageName || state.pageName,
        },
      });
      // @ts-ignore
      history.replace({
        pathname: '/editor',
        query: {
          ...query,
          type: 'edit',
          pageId: res.data.page,
        },
      });
      message.success({
        content: `${pageName || state.pageName}保存成功`,
        className: 'page-message',
      });
      return Promise.resolve(res.data);
    } else {
      return Promise.reject();
    }
  };

  const online = async (page: string) => {
    await updatePage(page, {
      action: 'online',
    });
    addMaterialsData();
  };

  const addMaterialsData = async () => {
    await addMaterials({
      materials: state.materials,
    });
  };

  const content = (
    <PageList>
      <CreatePageBtn>
        <i
          className="icon-plus iconfont"
          style={{
            marginRight: '6px',
          }}
        />
        创建新页面
      </CreatePageBtn>
      <PageItem>
        <PageItemImg>
          <span>1</span>
          <img src="" />
        </PageItemImg>
        <PageItemName>项目名称一</PageItemName>
      </PageItem>
      <PageItem>
        <PageItemImg>
          <span>1</span>
          <img src="" />
        </PageItemImg>
        <PageItemName>项目名称一</PageItemName>
      </PageItem>
      <PageItem>
        <PageItemImg>
          <span>1</span>
          <img src="" />
        </PageItemImg>
        <PageItemName>项目名称一</PageItemName>
      </PageItem>
    </PageList>
  );

  const handleIcon = (val: boolean) => {
    setExpendVal(val);
  };

  const menu = (
    <TableActionMenu>
      <Button
        type="text"
        onClick={(e) => {
          setSettingVisible(true);
          e.stopPropagation();
        }}
      >
        页面设置
      </Button>
    </TableActionMenu>
  );

  return (
    <EditorHeaderContainer>
      <PagePopover />
      <PageHeaderCol>
        <img src="https://static.guorou.net/course-static/22a23e8987c449708948925fab439ad3.svg" />
        <BackBtn style={{ marginRight: '110px' }} type="text" onClick={back}>
          <i className="icon-left iconfont" />
          返回
        </BackBtn>
        <Popover
          onVisibleChange={handleIcon}
          overlayClassName="page-popover"
          trigger="click"
          content={content}
        >
          <PagePopoverBtn style={{ display: 'none' }}>
            <i
              className="icon-navigation iconfont"
              style={{
                marginRight: '8px',
              }}
            />
            <span
              style={{
                marginRight: '8px',
              }}
            >
              页面导航
            </span>
            <i
              style={{
                transform: expendVal ? 'rotate(180deg)' : 'none',
                display: 'inline-block',
                transition: '.3s',
              }}
              className="icon-down1 iconfont"
            />
          </PagePopoverBtn>
        </Popover>
      </PageHeaderCol>
      <PageNameBox>
        <Input
          bordered={false}
          value={state.pageName}
          style={{
            width: '200px',
            textAlign: 'center',
            display: inputVisible ? 'inline-block' : 'none',
          }}
          ref={InputRef}
          onBlur={(e) => {
            if (!e.target.value.trim()) {
              message.warning('请输入页面名称');
              setPageNameTip(true);
            }
            setInputVisible(false);
          }}
          maxLength={30}
          onChange={(e) => {
            dispatch({
              type: ActionType.SetPageName,
              payload: {
                name: e.target.value,
              },
            });
          }}
        />
        {!inputVisible && (
          <div className={pageNameTip ? 'tip-flush' : ''}>
            {state.pageName}
            <i
              onClick={() => {
                setInputVisible(true);
                setTimeout(() => {
                  InputRef.current!.focus({
                    cursor: 'start',
                  });
                }, 200);
              }}
              style={{
                marginLeft: '10px',
                cursor: 'pointer',
              }}
              className="icon-edit iconfont"
            />
          </div>
        )}
      </PageNameBox>
      <ActionBox>
        {query.dev && (
          <Button
            style={{
              marginRight: '10px',
            }}
            onClick={() => {
              setVisible(true);
            }}
          >
            dsl
          </Button>
        )}
        <Button
          style={{
            marginRight: '10px',
          }}
          onClick={() => {
            preview(state.dsl);
          }}
        >
          预览
        </Button>
        <SaveBtn
          onClick={() => {
            save();
          }}
          loading={saveLoading}
        >
          保存&nbsp;&nbsp;|
          <Popover overlayClassName="table-action-menu" content={menu}>
            <i
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="icon-more iconfont"
            />
          </Popover>
        </SaveBtn>
        <Button
          type="primary"
          onClick={async () => {
            const { page } = await save();
            setPageId(page!);
            await online(page);
          }}
        >
          保存并上线
        </Button>
      </ActionBox>
      <Modal
        title="dsl"
        visible={visible}
        onOk={() => {
          preview(value);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        footer={
          <div>
            <Button
              onClick={() => {
                setVisible(false);
              }}
            >
              取消
            </Button>
            <Button
              onClick={() => {
                save(value);
              }}
            >
              保存
            </Button>
            <Button
              onClick={() => {
                preview(value);
              }}
            >
              预览
            </Button>
          </div>
        }
      >
        {TextArea}
      </Modal>
      <PagePopoverStyle />
      <PageSettingModal
        onlineVal={false}
        visible={settingVisible}
        onChangeVisible={(val: boolean) => {
          setSettingVisible(val);
        }}
        id={pageId}
        beforeSave={handleAddPage}
      />
    </EditorHeaderContainer>
  );
};
export default EditorHeader;
