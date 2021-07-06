import React from 'react';
import { Button, Modal } from 'antd';
import IconTitle from '../IconTitle';
import { ConfirmModalFooter, ConfirmModalGlobalStyle } from './index.style';
import { ConfirmModalProps } from './types';

const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
  const {
    footerRender = (
      <ConfirmModalFooter>
        <Button
          onClick={() => {
            handleVisible(false);
          }}
        >
          取消
        </Button>
        <Button
          onClick={() => {
            onOk();
          }}
          type="primary"
        >
          确定
        </Button>
      </ConfirmModalFooter>
    ),
    onChangeVisible,
    visible,
    onOk,
    children,
    confirmLoading = false,
    width = 400,
    title = '',
    forceRender = false,
  } = props;

  const handleVisible = (val: boolean) => {
    onChangeVisible(val);
  };

  return (
    <Modal
      wrapClassName="confirm-modal"
      visible={visible}
      footer={footerRender}
      onCancel={() => {
        handleVisible(false);
      }}
      centered
      width={width}
      confirmLoading={confirmLoading}
      forceRender={forceRender}
      maskClosable={false}
      title={
        <IconTitle
          iconStyle={{
            height: '22px',
            width: '4px',
            borderRadius: '0 100px 100px 0px',
            marginRight: '15px',
          }}
        >
          {title}
        </IconTitle>
      }
    >
      <ConfirmModalGlobalStyle />
      {children}
    </Modal>
  );
};

export default ConfirmModal;
