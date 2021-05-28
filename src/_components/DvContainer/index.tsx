import React from 'react';
import { DvContainerProps } from './types';

const DvContainer: React.FC<DvContainerProps> = (props) => {
  return <div style={props.style}>{props.children}</div>;
};

export default DvContainer;
