import React from 'react';
import ComponentItem from '../ComponentItem';

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
    </div>
  );
};
export default ComponentList;
