import React from 'react';
import { DvContainerProps } from './types';

const DvContainer: React.FC<DvContainerProps> = (props) => {
  return <div>{props.children}</div>;
};

export default DvContainer;
