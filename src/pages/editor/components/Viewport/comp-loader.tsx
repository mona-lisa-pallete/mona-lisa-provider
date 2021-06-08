import React from 'react';
import { useWidgetMeta } from '../../hooks';

interface CompLoaderProps {
  elementRef: string;
  contentProps: any;
}

export const CompLoader: React.FC<CompLoaderProps> = ({ elementRef, contentProps }) => {
  // console.log(contentProps);
  const { fetching } = useWidgetMeta(elementRef);
  // console.log(window[elementRef]);
  // elementRef && React.createElement(elementRef, {})
  const Comp = window?.[elementRef]?.default || 'div';
  if (!window?.[elementRef]?.default) {
    return null;
  }
  return fetching ? <div>loading</div> : <Comp class="dv-item" {...contentProps} edit /> || '';
};
