import PageHeader from '@/components/PageHeader';
import { Button, Image, Tag } from 'antd';
import React, { useState } from 'react';
import {
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

interface PageItem {
  id: number;
  url: string;
}

const Page: React.FC = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
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
      render() {
        return (
          <>
            <Button
              onClick={() => {
                setPreviewVisible(true);
              }}
            >
              预览
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <PageHeader title="页面列表">
        <Button type="primary">创建项目</Button>
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
    </PageContainer>
  );
};

export default Page;
