import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Radio, Select } from 'antd';
import React from 'react';
import { ActionFormBox } from './index.style';
import { ActionType, PageType } from './types';
import { RadioGroup } from '../PageForm/index.style';

const ActionForm: React.FC = () => {
  return (
    <Form.List name="options">
      {(fields, { add }) =>
        fields.map((field, index) => (
          <div>
            <ActionFormBox>
              <div className="dv-action-item">
                <div className="dv-action-name">
                  <i className="iconicon_drag iconfont" />
                  交互一
                </div>
                <Form.Item>
                  <Select
                    options={[
                      {
                        label: 'toast提示',
                        value: ActionType.Toast,
                      },
                      {
                        label: '跳转链接',
                        value: ActionType.Page,
                      },
                      {
                        label: '调起弹窗',
                        value: ActionType.Modal,
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item>
                  <RadioGroup>
                    <Radio.Button value={PageType.WebPage}>跳转页面</Radio.Button>
                    <Radio.Button value={PageType.H5}>跳转H5</Radio.Button>
                    <Radio.Button value={PageType.Mini}>跳转小程序</Radio.Button>
                  </RadioGroup>
                </Form.Item>
                <Form.Item>
                  <Select />
                </Form.Item>
              </div>
              <Button
                type="link"
                style={{
                  padding: 0,
                }}
              >
                <PlusOutlined />
                新增交互配置
              </Button>
            </ActionFormBox>
            {index + 1 === fields.length && (
              <Button
                type="link"
                onClick={() => {
                  add();
                }}
              >
                <PlusOutlined style={{ fontSize: '12px' }} />
                新增交互配置
              </Button>
            )}
          </div>
        ))
      }
    </Form.List>
  );
};

export default ActionForm;
