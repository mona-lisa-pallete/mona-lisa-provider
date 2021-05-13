import React from 'react';
import { PlaceholderImgDiv } from './index.style';
import logoImg from '@/assets/img/common/placeholder-img.png';

const PlaceholderImg: React.FC = () => {
  return (
    <PlaceholderImgDiv>
      <img src={logoImg} alt="" />
      内容加载中…
    </PlaceholderImgDiv>
  );
};
export default PlaceholderImg;
