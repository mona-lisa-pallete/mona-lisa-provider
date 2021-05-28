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
} from './index.style';
import { useLocation } from 'umi';
import EditorContext from '../../context';
import { addPage, addPreviewPage } from '@/services/editor';
import { DSL } from '../../types';

const EditorHeader: React.FC = () => {
  const [expendVal, setExpendVal] = useState(false);
  const location: any = useLocation();
  const { state } = useContext(EditorContext);
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const query = location.query as { dev: string; pageId: string };

  useEffect(() => {
    setValue(JSON.stringify(state.dsl));
  }, [state.dsl]);

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
      page: query.pageId,
    });
    if (res.code === 0) {
      // message.success('保存成功');
      window.open(res.data.url);
    }
  };

  const save = async (dsl: string | DSL = state.dsl) => {
    const dslData = typeof dsl === 'string' ? JSON.parse(dsl) : dsl;
    const res = await addPage({
      dsl: dslData,
      page: query.pageId,
      name: 'ffff',
    });
    if (res.code === 0) {
      message.success('保存成功');
    }
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

  return (
    <EditorHeaderContainer>
      <PagePopover />
      <PageHeaderCol>
        <img src="https://static.guorou.net/course-static/22a23e8987c449708948925fab439ad3.svg" />
        <BackBtn style={{ marginRight: '110px' }} type="text">
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
      <PageNameBox>项目名称一</PageNameBox>
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
        <Button
          type="primary"
          onClick={() => {
            save();
          }}
        >
          保存
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
    </EditorHeaderContainer>
  );
};
export default EditorHeader;
