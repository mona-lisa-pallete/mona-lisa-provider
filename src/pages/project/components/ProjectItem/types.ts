import { ReactElement } from 'react';

export interface ProjectItemProps {
  actionRender: ReactElement;
  name: string;
  createUserName: string;
  createTime: string;
  onClick: () => void;
}
