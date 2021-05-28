import React from 'react';
import { DvImageProps } from './types';
import './index.less';

const DvImage: React.FC<DvImageProps> = (props) => {
  const { contentProps } = props;

  const { url } = contentProps;
  return <img className="dv-image" src={url} />;
};

export default DvImage;
