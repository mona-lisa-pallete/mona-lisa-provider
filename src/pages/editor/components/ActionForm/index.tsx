import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Select } from 'antd';
import React from 'react';
import { ActionFormBox } from './index.style';
import { ActionFormProps } from './types';
import { FormSubTitle } from '../../index.style';
import { useActionMeta, useActions } from '../../hooks';

import './action-form.less';

import nzh from 'nzh';

function WithActionForm(props: { actionType: string; index: number; formUrl: string }) {
  const { actionType, index, formUrl } = props;
  const { fetching } = useActionMeta(actionType, formUrl);
  const FormUIDll = (window as any)[`${actionType}Form`]?.default;

  if (fetching) {
    return <div>加载中..</div>;
  }
  if (!FormUIDll) {
    return null;
  }
  return (
    <Form.Item key={index} name={[index, 'data']}>
      <FormUIDll />
    </Form.Item>
  );
}

const ActionForm: React.FC<ActionFormProps> = () => {
  const actions = useActions();
  const actionOptions = actions.map((v) => ({
    label: v.label,
    value: v.type,
  }));
  return (
    <>
      <FormSubTitle>交互配置</FormSubTitle>
      <Form.List name="action">
        {(fields, { add, remove }, { errors }) => {
          return (
            <>
              {fields.map((field, index) => (
                <ActionFormBox key={field.name}>
                  <div className="dv-action-item">
                    <div className="dv-action-name">
                      <div>
                        <i className="iconicon_drag iconfont" /> 交互{nzh.cn.encodeS(index + 1)}
                      </div>
                      <i
                        className="icon-delete iconfont"
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </div>
                    <Form.Item name={[index, 'actionType']}>
                      <Select options={actionOptions} />
                    </Form.Item>
                    <Form.Item
                      shouldUpdate={(prevValues, curValues) => {
                        const sameType =
                          prevValues?.action[index]?.actionType ===
                          curValues?.action[index]?.actionType;
                        const preVal = prevValues?.action[index]?.data || {};
                        const nxtVal = curValues?.action[index]?.data || {};
                        const sameValue =
                          preVal.msg === nxtVal.msg &&
                          preVal.navigateType === nxtVal.navigateType &&
                          preVal.url === nxtVal.url;
                        // TODO: 这块后面需要抽象出来，不能每写一个动作都要加逻辑
                        return !sameType || !sameValue;
                      }}
                      noStyle
                    >
                      {({ getFieldValue }) => {
                        const actionType = getFieldValue(['action', index, 'actionType']);
                        if (!actionType) {
                          return;
                        }
                        const _index = actions.findIndex((v) => v.type === actionType);
                        return (
                          <WithActionForm
                            index={index}
                            formUrl={actions[_index]?.formUrl}
                            actionType={actionType}
                          />
                        );
                      }}
                    </Form.Item>
                  </div>
                </ActionFormBox>
              ))}
              <Form.Item>
                <Button
                  htmlType="button"
                  type="link"
                  onClick={() => {
                    add();
                  }}
                  style={{
                    padding: 0,
                    color: '#1980FF',
                    marginBottom: '50px',
                  }}
                >
                  <PlusOutlined style={{ fontSize: '12px' }} />
                  新增交互配置
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </>
  );
};

export default ActionForm;
