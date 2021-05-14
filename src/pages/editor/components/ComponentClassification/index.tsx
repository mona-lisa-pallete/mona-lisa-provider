import React, { useEffect } from 'react';
import {
  ComponentClassificationContainer,
  ComponentClassificationItem,
  ComponentClassificationList,
} from './index.style';
import { ComponentClassificationProps } from './types';

function ComponentClassification<T>(props: ComponentClassificationProps<T>) {
  const { value } = props;

  useEffect(() => {
    console.log(value);
  }, []);

  return (
    <ComponentClassificationContainer>
      <ComponentClassificationList>
        <ComponentClassificationItem>
          <i className="icon-pic iconfont" />
          图片
        </ComponentClassificationItem>
        <ComponentClassificationItem>
          <i className="icon-button iconfont" />
          按钮
        </ComponentClassificationItem>
        <ComponentClassificationItem>
          <i className="icon-Typography iconfont" />
          文本
        </ComponentClassificationItem>
        <ComponentClassificationItem>
          <i className="icon-Dialog iconfont" />
          弹窗
        </ComponentClassificationItem>
      </ComponentClassificationList>
    </ComponentClassificationContainer>
  );
}

export default ComponentClassification;
