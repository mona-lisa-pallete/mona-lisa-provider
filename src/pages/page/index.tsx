import PageHeader from '@/components/PageHeader';
import { Button, Image, message, Modal, Popover, Tag } from 'antd';
import React, { useRef, useState } from 'react';
import {
  PageAction,
  PageContainer,
  PageDetail,
  PageImg,
  PageInfo,
  PageMain,
  PageName,
  PageTag,
  Point,
  StatusContainer,
  TableActionMenu,
  PagePopoverStyle,
  TableActionCol,
} from './index.style';
import ProTable, { ActionType } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import PlaceholderImg from '@/components/PlaceholderImg';
import PreviewModal from './components/PreviewModal/';
// import ConfirmModal from '@/components/ConfirmModal';
import { delPage, getPages, getPageUsers, updatePage } from '@/services/page';
import { useLocation } from 'umi';
import { PageItem, PlatformType } from '@/services/page/schema';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageEdit } from './types';
import PageSettingModal from './components/PageSettingModal/';
import { useHideHeader } from '../editor/hooks';

const { confirm } = Modal;

const Page: React.FC = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  // const [modelVisible, setModelVisible] = useState(false);
  const location: any = useLocation();
  const { query } = location;
  const [settingVisible, setSettingVisible] = useState(false);
  const [pageId, setPageId] = useState('');
  const tableRef = useRef<ActionType>();

  useHideHeader(location);

  const columns: Array<ProColumns<PageItem>> = [
    {
      dataIndex: 'id',
      width: 48,
      title: 'ID',
      hideInSearch: true,
      fixed: 'left',
    },
    {
      title: '落地页',
      dataIndex: 'title',
      formItemProps: {
        label: '页面名称',
        colon: false,
      },
      fixed: 'left',
      width: 250,
      render(_, record) {
        return (
          <PageInfo>
            <PageImg>
              <Image
                src={record.thumbnailUrl}
                preview={false}
                className="page-img"
                placeholder={<PlaceholderImg />}
              />
            </PageImg>
            <PageDetail>
              <PageName>{record.name}</PageName>
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
      dataIndex: 'platform',
      width: 150,
      formItemProps: {
        label: '页面类型',
        colon: false,
      },
      valueType: 'select',
      valueEnum: {
        WEB: {
          text: 'H5',
        },
        MINIAPP: {
          text: '小程序',
        },
      },
      fieldProps: {
        mode: 'multiple',
        maxTagCount: 'responsive',
      },
      render(_, item) {
        return (
          <PageTag>
            {item.platform.map((p) => {
              let node;
              switch (p) {
                case PlatformType.MINIAPP:
                  node = (
                    <Tag className="mini" color="#F1F8EB">
                      小程序
                    </Tag>
                  );
                  break;
                case PlatformType.WEB:
                  node = (
                    <Tag className="h5" color="#EAF4FF">
                      H5
                    </Tag>
                  );
                  break;
                default:
                  break;
              }
              return node;
            })}
          </PageTag>
        );
      },
    },
    {
      title: '页面状态',
      dataIndex: 'status',
      width: 100,
      formItemProps: {
        label: '页面状态',
        colon: false,
      },
      valueType: 'select',
      valueEnum: {
        0: {
          text: '未上线',
        },
        1: {
          text: '已上线',
        },
      },
      render(_, item) {
        const statusName = item.status === 1 ? '已上线' : '未上线';
        return (
          <StatusContainer>
            <Point online={item.status === 1} />
            {statusName}
          </StatusContainer>
        );
      },
    },
    {
      title: '线上版本号',
      dataIndex: 'releaseVersion',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '上线/下线人',
      dataIndex: 'releaseUsername',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '上线/下线时间',
      dataIndex: 'releaseTime',
      hideInSearch: true,
      renderText(_, record) {
        return moment(record.releaseTime).format('YYYY-MM-DD HH:MM:SS');
      },
      width: 175,
    },
    {
      title: '编辑版本',
      dataIndex: 'editVersion',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
      valueType: 'select',
      width: 100,
      formItemProps: {
        colon: false,
      },
      fieldProps: {
        placeholder: '请输入创建人',
        filterOption: true,
        showSearch: true,
      },
      async request() {
        const res = await getPageUsers();
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
      title: '创建时间',
      width: 175,
      dataIndex: 'createTime',
      // valueType: 'dateRange',
      hideInSearch: true,
      renderText(_, record) {
        return moment(record.updateTime).format('YYYY-MM-DD HH:MM:SS');
      },
      // search: {
      //   transform: (value) => {
      //     return {
      //       startTime: value[0],
      //       endTime: value[1],
      //     };
      //   },
      // },
    },
    {
      title: '最近修改人',
      dataIndex: 'updateUserName',
      hideInSearch: true,
      width: 100,
    },
    {
      title: '最近修改时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
      width: 180,
      // valueType: 'dateRange',
      // search: {
      //   transform: (value) => {
      //     return {
      //       startTime: value[0],
      //       endTime: value[1],
      //     };
      //   },
      // },
      renderText(_, record) {
        return moment(record.updateTime).format('YYYY-MM-DD HH:MM:SS');
      },
    },
    {
      title: '操作',
      valueType: 'option',
      hideInSearch: true,
      width: 260,
      fixed: 'right',
      render(_, item) {
        const menu = (
          <TableActionMenu>
            <Button
              type="text"
              onClick={() => {
                copyPage(item.page);
                // setModelVisible(true);
              }}
            >
              复制
            </Button>
            <Button
              type="text"
              onClick={() => {
                setPageId(item.page);
                setSettingVisible(true);
              }}
            >
              设置
            </Button>
            <Button
              type="text"
              onClick={() => {
                handleDelPage(item.page);
              }}
            >
              删除
            </Button>
          </TableActionMenu>
        );
        return (
          <TableActionCol>
            <Button
              type="link"
              onClick={() => {
                goToEdit(item.page);
              }}
            >
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
            {item.status === 0 && (
              <Button
                type="link"
                onClick={() => {
                  handlePageStatus(item.page, 'online');
                }}
              >
                上线
              </Button>
            )}
            {item.status === 1 && (
              <Button
                type="link"
                onClick={() => {
                  handlePageStatus(item.page, 'offline');
                }}
              >
                下线
              </Button>
            )}
            <Popover overlayClassName="table-action-menu" content={menu}>
              <Button type="link">
                <i
                  style={{
                    color: '#1980FF',
                  }}
                  className="icon-more iconfont"
                />
              </Button>
            </Popover>
          </TableActionCol>
        );
      },
    },
  ];

  const getData = async (params: any = {}) => {
    const res = await getPages({
      ...params,
      projectId: query.projectId,
      currentPage: params.current,
      limit: params.pageSize,
      platform: params?.platform?.toString() || '',
    });
    return {
      data: res.data.list,
      success: true,
      total: res.data.totalCount,
    };
  };

  const handleDelPage = (id: string | number) => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '删除之后暂时无法找回，是否确认删除？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      async onOk() {
        const res = await delPage(id);
        if (res.code === 0) {
          message.success('删除成功');
          tableRef.current?.reload();
        }
      },
    });
  };

  const handlePageStatus = async (id: string | number, action: 'online' | 'offline') => {
    const res = await updatePage(id, { action });
    const actionMsg = {
      online: '上线成功',
      offline: '下线成功',
    };
    if (res.code === 0) {
      tableRef.current?.reload();
      message.success(actionMsg[action]);
    }
  };

  // useEffect(() => {
  //   const getUsersData = async () => {
  //     const res = await getPageUsers();
  //     if (res.code === 0) {
  //       setUsers(
  //         res.data.map((i) => {
  //           return {
  //             label: i,
  //             value: i,
  //           };
  //         }),
  //       );
  //     }
  //   };
  //   getUsersData();
  // }, []);

  const goToEdit = (page: string | number) => {
    window.open(
      `/davinciprovider/editor?pageId=${page}&type=${PageEdit.Edit}&projectId=${query.projectId}`,
    );
  };

  const addPage = () => {
    window.open(`/davinciprovider/editor?type=${PageEdit.Add}&projectId=${query.projectId}`);
  };

  const copyPage = (page: string | number) => {
    window.open(
      `/davinciprovider/editor?type=${PageEdit.Add}&pageId=${page}&projectId=${query.projectId}`,
    );
  };

  return (
    <PageContainer>
      <PagePopoverStyle />
      <PageHeader title="页面列表">
        <Button type="primary" onClick={addPage}>
          创建页面
        </Button>
      </PageHeader>
      <PageMain>
        <ProTable<PageItem>
          bordered
          actionRef={tableRef}
          columns={columns}
          rowKey="id"
          search={{
            labelWidth: 'auto',
          }}
          scroll={{ x: 'max-content' }}
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
        h5Url=""
        onChange={() => {
          setPreviewVisible(false);
        }}
        visible={previewVisible}
      />
      <PageSettingModal
        id={pageId}
        onChangeVisible={(val) => {
          setSettingVisible(val);
        }}
        visible={settingVisible}
      />
      {/* <ConfirmModal onChangeVisible={setModelVisible} visible={modelVisible} onOk={copyPage}>
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
      </ConfirmModal> */}
    </PageContainer>
  );
};

export default Page;
