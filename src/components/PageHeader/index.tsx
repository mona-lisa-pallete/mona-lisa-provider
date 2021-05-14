import React from 'react';
import { PageHeaderContainer } from './index.style';
import { PageHeaderProps } from './types';
import IconTitle from '../IconTitle/';

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { title, children } = props;
  return (
    <PageHeaderContainer>
      <IconTitle>{title}</IconTitle>
      {children}
    </PageHeaderContainer>
  );
};

export default PageHeader;
