import React from 'react';
import { Title, TitleIcon } from './index.style';
import { IconTitleProps } from './types';

const IconTitle: React.FC<IconTitleProps> = (props) => {
  const { iconStyle } = props;
  return (
    <Title>
      <TitleIcon style={iconStyle} />
      {props.children}
    </Title>
  );
};
export default IconTitle;
