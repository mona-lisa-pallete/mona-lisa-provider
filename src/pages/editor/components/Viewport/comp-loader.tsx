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
  return fetching ? <div>loading</div> : <Comp {...contentProps} edit /> || '';
};
