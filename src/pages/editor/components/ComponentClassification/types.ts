import { ReactNode } from 'react';

export interface ComponentClassificationItem<Y> {
  type: Y;
  node: ReactNode | string | number;
}

export interface ComponentClassificationProps<T> {
  value: T;
  data: Array<ComponentClassificationItem<T>>;
  onChange: (val: T) => void;
  componentMap: {
    [key: string]: any[];
  };
}
