import React, { useCallback } from 'react';
import { useWidgetMeta } from '../../hooks';

interface CompLoaderProps {
  elementRef: string;
  contentProps: any;
}

export const CompLoader: React.FC<CompLoaderProps> = ({ elementRef, contentProps }) => {
  const { fetching } = useWidgetMeta(elementRef);
  const Comp = (window as any)[elementRef]?.default || 'div';
  const elementRefFn = useCallback(() => {
    if (!(window as any)[elementRef]?.default) {
      return null;
    }
    return <Comp class="dv-item" {...contentProps} edit />;
  }, [elementRef, Comp, contentProps]);

  return fetching ? (
    <div style={{ fontSize: 16, textAlign: 'center', padding: 10 }}>loading</div>
  ) : (
    <> {elementRefFn()}</> || ''
  );
};
