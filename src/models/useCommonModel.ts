import { useState } from 'react';

export default function useAuthModel() {
  const [uploadWindow, setUploadWindow] = useState<Window | null>();

  const setUploadNewWindow = () => {
    if (uploadWindow) {
      uploadWindow.focus();
      return;
    }
    const top = Math.ceil(window.screen.height / 2) - 300;
    const left = Math.ceil(window.screen.width / 2) - 200;
    const newW = window.open(
      '/davinciprovider/material-manage/upload',
      'newwindow',
      `height=600, width=400, top=${top}, left=${left}, toolbar=no, menubar=no, resizable=no,location=no, status=no, fullscreen=no`,
    );
    newW!.onbeforeunload = () => {
      setUploadWindow(null);
      return '你确定要离开吗';
    };
    newW!.onclose = () => {
      setUploadWindow(null);
    };
    setUploadWindow(newW);
  };

  return {
    uploadWindow,
    setUploadNewWindow,
  };
}
