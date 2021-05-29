import { ReactNode } from 'react';

export interface ConfirmModalProps {
  footerRender?: ReactNode;
  onChangeVisible: (visible: boolean) => void;
  visible: boolean;
  onOk: () => void;
  width?: number;
  confirmLoading?: boolean;
  title: string;
}
