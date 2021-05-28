import { MaterialType } from '@/pages/material-manage/types';

export interface ViewerItem {
  url: string;
  type: MaterialType;
  id: number;
}

export interface ViewerProps {
  data: ViewerItem[];
  visible: boolean;
  selected?: number;
  onClose?: () => void;
  onChangeName?: (name: string, id: number) => void;
  viewerRef?: any;
  onRemove?: (id: number) => PromiseLike<void>;
  noRemove?: boolean;
  type?: 'primary' | 'simple';
}
