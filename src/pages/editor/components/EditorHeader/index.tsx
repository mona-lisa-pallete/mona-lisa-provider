import { Button, Popover, Modal, Input, message } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
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

const EditorHeader: React.FC = () => {
  const [expendVal, setExpendVal] = useState(false);
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
  // const [pageName, setPageName] = useState(state.pageName);

  useEffect(() => {
    setValue(JSON.stringify(state.dsl));
  }, [state.dsl]);

  const back = () => {
    history.push({
      pathname: '/page',
      query: {
        projectId: query.projectId,
      },
    });
  };
  const handleAddPage = async () => {
    if (query.type === 'edit') {
      return Promise.resolve(query.pageId);
    } else {
      const page = await save(state.dsl);
      setPageId(page!);
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
    const dslData = typeof dsl === 'string' ? JSON.parse(dsl) : dsl;
    const res = await addPreviewPage({
      dsl: dslData,
      page: pageId,
    });
    if (res.code === 0) {
      // message.success('保存成功');
      window.open(res.data.url);
    }
  };

  const save = async (dsl: string | DSL = state.dsl) => {
    if (!state.pageName) {
      message.warning('请输入页面名称');
      return;
    }
    setSaveLoading(true);
    const dslData = typeof dsl === 'string' ? JSON.parse(dsl) : dsl;
    const res = await addPage({
      dsl: dslData,
      page: pageId,
      name: state.pageName,
      projectId: parseInt(query.projectId, 10),
    });
    setSaveLoading(false);
    if (res.code === 0) {
      setPageId(res.data.page);
      history.replace({
        pathname: '/editor',
        query: {
          ...query,
          type: 'edit',
          pageId: res.data.page,
        },
      });
      message.success('保存成功');
      return Promise.resolve(res.data.page);
    } else {
      return Promise.reject();
    }
  };

  const online = async () => {
    await updatePage(query.pageId, {
      action: 'online',
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
          <PagePopoverBtn>
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
        <i className="icon-edit iconfont" />
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
          保存 |
          <Popover overlayClassName="table-action-menu" content={menu}>
            <i className="icon-more iconfont" />
          </Popover>
        </SaveBtn>
        {/* <Button
          style={{
            marginRight: '10px',
            display: 'inline-flex',
            alignItems: 'center',
          }}
          onClick={() => {
            save();
          }}
        >
          保存 | <i className="icon-more iconfont" />
        </Button> */}
        <Button
          type="primary"
          onClick={async () => {
            await save();
            await online();
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
