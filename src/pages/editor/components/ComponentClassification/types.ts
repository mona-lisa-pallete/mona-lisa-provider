export interface ComponentClassificationItem<Y> {
  type: Y;
}

export interface ComponentClassificationProps<T> {
  value: T;
  data: Array<ComponentClassificationItem<T>>;
}
