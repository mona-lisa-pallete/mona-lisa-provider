import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Select } from 'antd';
import React from 'react';
import { ActionFormBox } from './index.style';
import { ActionFormProps } from './types';
import { FormSubTitle } from '../../index.style';
import nzh from 'nzh';
import { useActionMeta, useActions } from '../../hooks';

function WithActionForm(props: { actionType: string; index: number }) {
  const { actionType, index } = props;

  const { fetching } = useActionMeta(actionType);
  const UI_DLL = (window as any)[actionType]?.default;
  if (fetching) {
    return <div>加载中..</div>;
  }
  if (!UI_DLL) {
    return null;
  }
  return (
    <Form.Item name={[index, 'data']}>
      <UI_DLL />
    </Form.Item>
  );
}

const ActionForm: React.FC<ActionFormProps> = () => {
  const actions = useActions();
  return (
    <>
      {/* <FormSubTitle>组件布局</FormSubTitle> */}
      {/* <Form.Item label="所处位置">
        <Form.Item noStyle name={['style', 'left']}>
          <Input
            style={{
              width: '135px',
              marginRight: '16px',
            }}
            type="number"
            suffix="X"
          />
        </Form.Item>
        <Form.Item noStyle name={['style', 'top']}>
          <Input
            style={{
              width: '135px',
            }}
            type="number"
            suffix="Y"
          />
        </Form.Item>
      </Form.Item> */}
      <FormSubTitle>交互配置</FormSubTitle>
      <Form.List name="action">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <ActionFormBox key={field.name}>
                <div className="dv-action-item">
                  <div className="dv-action-name">
                    <div>
                      <i className="iconicon_drag iconfont" />
                      交互{nzh.cn.encodeS(index + 1)}
                    </div>
                    <i
                      className="icon-delete iconfont"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </div>
                  <Form.Item name={[index, 'actionType']}>
                    <Select options={actions} />
                  </Form.Item>
                  <Form.Item
                    shouldUpdate={(prevValues, curValues) => {
                      return (
                        prevValues?.action[index]?.actionType !==
                        curValues?.action[index]?.actionType
                      );
                    }}
                    noStyle
                  >
                    {({ getFieldValue }) => {
                      const actionType = getFieldValue(['action', index, 'actionType']);
                      return <WithActionForm index={index} actionType={actionType} />;
                    }}
                  </Form.Item>
                </div>
              </ActionFormBox>
            ))}
            <Button
              htmlType="button"
              type="link"
              onClick={() => {
                add();
              }}
            >
              <PlusOutlined style={{ fontSize: '12px' }} />
              新增交互配置
            </Button>
          </>
        )}
      </Form.List>
    </>
  );
};

export default ActionForm;
