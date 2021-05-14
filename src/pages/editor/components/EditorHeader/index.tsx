import { Button, Popover } from 'antd';
import React from 'react';
import {
  EditorHeaderContainer,
  PageItem,
  PageItemImg,
  PageItemName,
  PageList,
  PagePopover,
} from './index.style';

const EditorHeader: React.FC = () => {
  const content = (
    <PageList>
      <Button>创建新页面</Button>
      <PageItem>
        <PageItemImg>
          <span>1</span>
          <img src="" />
        </PageItemImg>
        <PageItemName>项目名称一</PageItemName>
      </PageItem>
    </PageList>
  );

  return (
    <EditorHeaderContainer>
      <PagePopover />
      <img src="https://static.guorou.net/course-static/22a23e8987c449708948925fab439ad3.svg" />
      <Button style={{ marginRight: '110px' }} type="text">
        返回
      </Button>
      <Popover overlayClassName="page-popover" trigger="click" content={content}>
        <Button>页面导航</Button>
      </Popover>
    </EditorHeaderContainer>
  );
};
export default EditorHeader;
