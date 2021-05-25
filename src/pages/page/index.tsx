import PageHeader from '@/components/PageHeader';
import { Button, Form, Image, Radio, Select, Tag } from 'antd';
import React, { useState } from 'react';
import {
  CopyForm,
  PageAction,
  PageContainer,
  PageDetail,
  PageImg,
  PageInfo,
  PageMain,
  PageName,
  PageTag,
} from './index.style';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import PlaceholderImg from '@/components/PlaceholderImg';
import PreviewModal from './components/PreviewModal/';
import ConfirmModal from '@/components/ConfirmModal';

interface PageItem {
  id: number;
  url: string;
}

const Page: React.FC = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [modelVisible, setModelVisible] = useState(false);

  const columns: Array<ProColumns<PageItem>> = [
    {
      dataIndex: 'id',
      width: 48,
      title: 'ID',
      hideInSearch: true,
    },
    {
      title: '落地页',
      dataIndex: 'title',
      formItemProps: {
        label: '页面名称',
        colon: false,
      },
      render(_, record) {
        return (
          <PageInfo>
            <PageImg>
              <Image
                src={record.url}
                preview={false}
                className="page-img"
                placeholder={<PlaceholderImg />}
              />
            </PageImg>
            <PageDetail>
              <PageName>果肉名师倾心整理,语数英知识点点一语数英知识点点语数一</PageName>
              <PageAction>
                <Button type="link" style={{ marginRight: '40px' }}>
                  <i className="iconicon-copy iconfont" />
                  复制链接
                </Button>
                <Button type="link">
                  <i className="iconicon-copy iconfont" />
                  复制小程序路径
                </Button>
              </PageAction>
            </PageDetail>
          </PageInfo>
        );
      },
    },
    {
      title: '页面类型',
      dataIndex: 'state',
      hideInSearch: true,
      render() {
        return (
          <PageTag>
            <Tag className="mini" color="#F1F8EB">
              小程序
            </Tag>
            <Tag className="h5" color="#EAF4FF">
              H5
            </Tag>
          </PageTag>
        );
      },
    },
    {
      title: '创建人',
      dataIndex: 'created_at',
      valueType: 'select',
      formItemProps: {
        colon: false,
      },
      fieldProps: {
        placeholder: '请输入创建人',
        mode: 'multiple',
        maxTagCount: 'responsive',
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      hideInSearch: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '最近修改人',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '最近修改时间',
      dataIndex: 'created_at',
      hideInSearch: true,
      valueType: 'dateRange',
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      hideInSearch: true,
      width: 260,
      render() {
        return (
          <>
            <Button type="link" onClick={goToEdit}>
              编辑
            </Button>
            <Button
              type="link"
              onClick={() => {
                setPreviewVisible(true);
              }}
            >
              预览
            </Button>
            <Button
              type="link"
              onClick={() => {
                setModelVisible(true);
              }}
            >
              复制
            </Button>
            <Button type="link">删除</Button>
          </>
        );
      },
    },
  ];

  const getData = async () => {};

  const copyPage = () => {};

  const goToEdit = () => {
    window.open(`/davinciprovider/editor?pageId=${2}`);
  };

  return (
    <PageContainer>
      <PageHeader title="页面列表">
        <Button type="primary">创建页面</Button>
      </PageHeader>
      <PageMain>
        <ProTable<PageItem>
          bordered
          dataSource={[{ id: 1, url: '' }]}
          columns={columns}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          request={getData}
          form={{
            labelAlign: 'left',
          }}
          pagination={{
            pageSize: 10,
          }}
          options={false}
        />
      </PageMain>
      <PreviewModal
        onChange={() => {
          setPreviewVisible(false);
        }}
        visible={previewVisible}
      />
      <ConfirmModal onChangeVisible={setModelVisible} visible={modelVisible} onOk={copyPage}>
        <CopyForm colon layout="vertical">
          <Form.Item label="页面类型">
            <Radio.Group>
              <Radio value={1}>当前项目</Radio>
              <Radio value={2}>其他项目</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Select />
          </Form.Item>
          <Form.Item>
            <Radio.Group>
              <Radio value={1}>H5</Radio>
              <Radio value={2}>小程序</Radio>
              <Radio value={3}>H5&小程序</Radio>
            </Radio.Group>
          </Form.Item>
        </CopyForm>
      </ConfirmModal>
    </PageContainer>
  );
};

export default Page;
