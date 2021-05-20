import { Button, Popover, Modal, Input } from 'antd';
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

const { confirm } = Modal;

const EditorHeader: React.FC = () => {
  const [expendVal, setExpendVal] = useState(false);
  const location: any = useLocation();
  const { state } = useContext(EditorContext);
  const [value, setValue] = useState(() => {
    return JSON.stringify(state.dsl);
  });
  const query = location.query as { dev: string };

  useEffect(() => {
    setValue(JSON.stringify(state.dsl));
  }, [state.dsl]);

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
    console.log(val);
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
              confirm({
                title: 'Do you Want to delete these items?',
                content: (
                  <Input.TextArea
                    style={{
                      height: '500px',
                    }}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    value={value}
                  />
                ),
                onOk() {
                  console.log('OK');
                },
                onCancel() {
                  console.log('Cancel');
                },
              });
            }}
          >
            dsl
          </Button>
        )}
        <Button
          style={{
            marginRight: '10px',
          }}
        >
          预览
        </Button>
        <Button type="primary">保存</Button>
      </ActionBox>
    </EditorHeaderContainer>
  );
};
export default EditorHeader;
