import React from 'react';
import { PageHeaderContainer, PageHeaderTitle, TitleIcon } from './index.style';
import { PageHeaderProps } from './types';

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { title, children } = props;
  return (
    <PageHeaderContainer>
      <PageHeaderTitle>
        <TitleIcon />
        {title}
      </PageHeaderTitle>
      {children}
    </PageHeaderContainer>
  );
};

export default PageHeader;
