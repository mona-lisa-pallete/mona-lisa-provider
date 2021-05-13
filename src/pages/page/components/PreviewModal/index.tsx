import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Modal from './modal';
import { getScrollWidth } from '@/utils/common';

interface PreviewModalProp {
  onChange: () => void;
  visible: boolean;
}
const PreviewModal: React.FC<PreviewModalProp> = (props) => {
  const { visible } = props;
  const dom = useRef<any>();

  useEffect(() => {
    if (visible) {
      const div = document.createElement('div');
      dom.current = div;
      document.body.appendChild(div);
      document.body.style.height = '100vh';
      document.body.style.width = `calc(100vw - ${getScrollWidth()}px)`;
      document.body.style.overflow = 'hidden';
      ReactDOM.render(<Modal {...props} />, div);
    } else if (dom.current && !visible) {
      document.body.style.height = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      document.body.removeChild(dom.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return null;
};
export default PreviewModal;
