import React from 'react';
import ComponentItem from '../ComponentItem';
import { Test } from './index.style';

const ComponentList: React.FC = () => {
  return (
    <div
      style={{
        display: 'inline-block',
        verticalAlign: 'top',
      }}
    >
      <ComponentItem name="pic">图片</ComponentItem>
      <ComponentItem name="btn">按钮</ComponentItem>
      <Test className="fffff">ffffffffffffff</Test>
    </div>
  );
};
export default ComponentList;
