import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Viewer from './viewer';
import { getScrollWidth } from '@/utils/common';
import { ViewerProps } from './types';

const ViewerModal: React.FC<ViewerProps> = (props) => {
  const { visible } = props;
  const dom = useRef<any>();

  useEffect(() => {
    const app = document.body;
    if (visible) {
      const div = document.createElement('div');
      dom.current = div;
      app.appendChild(div);
      app.style.height = '100vh';
      app.style.width = `calc(100vw - ${getScrollWidth()}px)`;
      app.style.overflow = 'hidden';
      // eslint-disable-next-line react/no-render-return-value
      ReactDOM.render(<Viewer {...props} />, div);
    } else if (dom.current && !visible) {
      app.style.height = '';
      app.style.overflow = '';
      app.style.width = '';
      app.removeChild(dom.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return null;
};
export default ViewerModal;
