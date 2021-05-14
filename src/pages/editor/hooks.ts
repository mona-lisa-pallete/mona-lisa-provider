import { useEffect } from 'react';

const useHideHeader = () => {
  useEffect(() => {
    // window.onload = () => {
    // document.querySelector('aside')!.style.display = 'none';
    // (document.querySelector('.reset-antd') as HTMLElement).style.display = 'none';
    // (document.querySelector('.site-layout-background') as HTMLElement).style.margin = '0px';
    // };
  }, []);
};

export { useHideHeader };
