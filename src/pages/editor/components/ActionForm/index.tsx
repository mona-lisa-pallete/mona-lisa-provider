import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Select } from 'antd';
import React from 'react';
import { ActionFormBox } from './index.style';
import { ActionFormProps, ActionType, PageType } from './types';
import { RadioGroup } from '../PageForm/index.style';

const { TextArea } = Input;

const ActionForm: React.FC<ActionFormProps> = (props) => {
  const { pageData = [], modalData = [] } = props;
  return (
    <Form.List name="action">
      {(fields, { add }) => (
        <>
          {fields.map((field, index) => (
            <ActionFormBox>
              <div className="dv-action-item">
                <div className="dv-action-name">
                  <i className="iconicon_drag iconfont" />
                  交互一
                </div>
                <Form.Item name={[index, 'actionType']}>
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
                <Form.Item
                  shouldUpdate={(prevValues, curValues) => {
                    return (
                      prevValues?.action[index]?.actionType !== curValues?.action[index]?.actionType
                    );
                  }}
                  noStyle
                >
                  {({ getFieldValue }) => {
                    const actionType = getFieldValue(['action', index, 'actionType']);
                    const isPage = actionType === ActionType.Page;
                    const isToast = actionType === ActionType.Toast;
                    const isModal = actionType === ActionType.Modal;
                    return (
                      <>
                        {isPage && (
                          <>
                            <Form.Item name={[index, 'pageType']}>
                              <RadioGroup>
                                <Radio.Button value={PageType.WebPage}>跳转页面</Radio.Button>
                                <Radio.Button value={PageType.H5}>跳转H5</Radio.Button>
                                <Radio.Button value={PageType.Mini}>跳转小程序</Radio.Button>
                              </RadioGroup>
                            </Form.Item>
                            <Form.Item
                              shouldUpdate={(prevValues, curValues) => {
                                return (
                                  prevValues?.action[index]?.pageType !==
                                  curValues?.action[index]?.pageType
                                );
                              }}
                            >
                              {() => {
                                const pageType = getFieldValue(['action', index, 'pageType']);
                                const isWebPage = pageType === PageType.WebPage;
                                const isH5 = pageType === PageType.H5;
                                const isMini = pageType === PageType.Mini;
                                return (
                                  <>
                                    {isWebPage && (
                                      <Form.Item name={[index, 'url']}>
                                        <Select>
                                          {pageData.map((i) => {
                                            return (
                                              <Select.Option value={i.value}>
                                                {i.name}
                                              </Select.Option>
                                            );
                                          })}
                                        </Select>
                                      </Form.Item>
                                    )}
                                    {isH5 && (
                                      <Form.Item name={[index, 'url']}>
                                        <TextArea />
                                      </Form.Item>
                                    )}
                                    {isMini && (
                                      <>
                                        <Form.Item name={[index, 'id']}>
                                          <Input />
                                        </Form.Item>
                                        <Form.Item name={[index, 'url']}>
                                          <Input />
                                        </Form.Item>
                                      </>
                                    )}
                                  </>
                                );
                              }}
                            </Form.Item>
                          </>
                        )}
                        {isToast && (
                          <Form.Item name={[index, 'toast']}>
                            <Input />
                          </Form.Item>
                        )}
                        {isModal && (
                          <Form.Item name={[index, 'modal']}>
                            <Select>
                              {modalData.map((i) => {
                                return <Select.Option value={i.value}>{i.name}</Select.Option>;
                              })}
                            </Select>
                          </Form.Item>
                        )}
                      </>
                    );
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
  );
};

export default ActionForm;
