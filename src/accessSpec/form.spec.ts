import React from 'react';

/**
 * 达芬奇平台的业务组件的表单上下文
 */
export interface DavinciFormContext {
  /** 编辑状态中的组件实例的 props */
  editingEntityProps: any;
  /** 修改选中的组件实例的 prop的接口 */
  changeEntityProp: () => any;
  /** 达芬奇平台提供的 API */
  platformAPI: {
    upload: () => void;
  };
}

export type DavinciFormComp = React.ComponentType<DavinciFormContext>;
