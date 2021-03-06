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
import { getMaterialCreator } from '@/services/user';

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
    createTime: string[];
  }) => {
    let beginTime;
    let endTime;
    if (params.createTime && params.createTime.length > 0) {
      beginTime = params.createTime[0];
      endTime = params.createTime[1];
    }
    const res = await getMaterials({
      ...params,
      page: params.current || 1,
      limit: params.pageSize || 10,
      materialType: MaterialType.File,
      beginTime,
      endTime,
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
      width: 500,
      title: '????????????',
    },
    {
      dataIndex: 'createUserName',
      title: '?????????',
      width: 100,
      formItemProps: {
        colon: false,
      },
      fieldProps: {
        placeholder: '??????????????????',
        filterOption: true,
        showSearch: true,
      },
      valueType: 'select',
      async request() {
        const res = await getMaterialCreator();
        if (res.code === 0) {
          return res.data.map((i) => {
            return {
              label: i,
              value: i,
            };
          });
        } else {
          return [];
        }
      },
    },
    {
      dataIndex: 'createTime',
      title: '????????????',
      formItemProps: {
        colon: false,
      },
      valueType: 'dateRange',
      render(_, item) {
        return moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '??????',
      valueType: 'option',
      hideInSearch: true,
      width: 300,
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
              ??????
            </Button>
            <Button
              type="link"
              onClick={() => {
                handleChangeName(item.materialName, item.id);
              }}
            >
              ????????????
            </Button>
            <Button
              type="link"
              onClick={() => {
                downloadFile(item.ossUrl, item.materialName);
              }}
            >
              ??????
            </Button>
            <Button
              type="text"
              onClick={() => {
                confirm({
                  title: '??????',
                  icon: <ExclamationCircleOutlined />,
                  content: '??????????????????????????????????????????????????????',
                  okText: '??????',
                  okType: 'danger',
                  cancelText: '??????',
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
              ??????
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
