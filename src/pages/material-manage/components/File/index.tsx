import { getMaterials } from '@/services/material';
import { IGetMaterialsResponseList } from '@/services/material/schema';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Modal } from 'antd';
import moment from 'moment';
import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { MaterialType } from '../../types';
import { FileContainer } from './index.style';
import { FileMaterialProps, FileRef, MIME } from './types';
import download from 'downloadjs';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const File = (props: FileMaterialProps, ref: React.Ref<FileRef>) => {
  const { onChangeName, onDelMaterial, onPreview } = props;
  const [list, setList] = useState<IGetMaterialsResponseList[]>([]);
  const tableRef = useRef<ActionType>();

  useImperativeHandle(ref, () => {
    return {
      reload() {
        return tableRef.current?.reload;
      },
    };
  });

  const downloadFile = (url: string, name: string) => {
    const x = new XMLHttpRequest();
    x.open('GET', url, true);
    x.responseType = 'blob';
    const fileType = url.substring(url.lastIndexOf('.') + 1);
    const mimeType = MIME[fileType];
    x.onload = function (e: any) {
      download(e.target.response, `${name}.${fileType}`, mimeType);
    };
    x.send();
  };

  const handleChangeName = (name: string, id: number) => {
    onChangeName(name, id);
  };

  const getData = async (params: {
    pageSize?: number | undefined;
    current?: number | undefined;
    keyword?: string | undefined;
  }) => {
    const res = await getMaterials({
      ...params,
      page: params.current || 1,
      limit: params.pageSize || 10,
      materialType: MaterialType.File,
    });
    setList(res.data.list);
    return {
      data: res.data.list,
      success: true,
      total: res.data.totalCount,
    };
  };

  const columns: Array<ProColumns<IGetMaterialsResponseList>> = [
    {
      dataIndex: 'materialName',
      width: 48,
      title: '文档名称',
      hideInSearch: true,
    },
    {
      dataIndex: 'createUserName',
      width: 120,
      title: '创建人',
    },
    {
      dataIndex: 'createTime',
      width: 120,
      title: '创建时间',
      renderText(text) {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      valueType: 'option',
      hideInSearch: true,
      width: 260,
      render(_, item, index) {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                const data = list.map((i) => {
                  return {
                    url: i.ossUrl,
                    type: item.materialType,
                    id: i.id,
                  };
                });
                onPreview(index, data, true);
              }}
            >
              预览
            </Button>
            <Button
              type="link"
              onClick={() => {
                handleChangeName(item.materialName, item.id);
              }}
            >
              修改名称
            </Button>
            <Button
              type="link"
              onClick={() => {
                downloadFile(item.ossUrl, item.materialName);
              }}
            >
              下载
            </Button>
            <Button
              type="text"
              onClick={() => {
                confirm({
                  title: '提示',
                  icon: <ExclamationCircleOutlined />,
                  content: '删除之后暂时无法找回，是否确认删除？',
                  okText: '确认',
                  okType: 'danger',
                  cancelText: '取消',
                  centered: true,
                  async onOk() {
                    await onDelMaterial(item.id);
                    tableRef.current?.reload();
                    // const res = await delMaterial(id);
                    // if (res.code === 0) {
                    //   const list = await getImageData();
                    //   resolve(list);
                    // }
                  },
                });
                // handlePageStatus(item.page, 'offline');
              }}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <FileContainer>
      <ProTable<IGetMaterialsResponseList>
        bordered
        actionRef={tableRef}
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
    </FileContainer>
  );
};
export default forwardRef(File);