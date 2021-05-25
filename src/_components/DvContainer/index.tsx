import React from 'react';
import { DvContainerProps } from './types';

const DvContainer: React.FC<DvContainerProps> = (props) => {
  console.log(props.children);

  return <div style={props.style}>{props.children}</div>;
};

export default DvContainer;
