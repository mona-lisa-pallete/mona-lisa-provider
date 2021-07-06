import PageHeader from '@/components/PageHeader';
import {
  Button,
  Image,
  message,
  Modal,
  Popover,
  Tag,
  Tooltip,
  Breadcrumb,
  PageHeader as AntdPageHeader,
  Menu,
} from 'antd';
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
  TableActionMenu,
  PagePopoverStyle,
  TableActionCol,
  Tips,
} from './index.style';
import ProTable, { ActionType } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import PlaceholderImg from '@/components/PlaceholderImg';
import PreviewModal from './components/PreviewModal/';
import ConfirmModal from '@/components/ConfirmModal';
import { delPage, getPages, getPageUsers, updatePage, getWxOnlineCode } from '@/services/page';
import { useLocation, Link } from 'umi';
import { PageActionType, PageItem, PlatformType } from '@/services/page/schema';
import moment from 'moment';
import { ExclamationCircleOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { PageEdit } from './types';
import PageSettingModal from './components/PageSettingModal/';
import { useHideHeader } from '../editor/hooks';
import copy from 'copy-to-clipboard';
import StatusTag from './components/StatusTag';
import { PageStatusType } from './components/StatusTag/types';
import { StatusTagStyle } from './components/StatusTag/index.style';
import getPlatform from '@/utils/getPlaform';
import CopyPageModal from './components/copyPageModal';

import './index.less';

const { confirm } = Modal;

const Page: React.FC = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const location: any = useLocation();
  const { query } = location;
  const [settingVisible, setSettingVisible] = useState(false);
  const [pageId, setPageId] = useState('');
  const tableRef = useRef<ActionType>();
  const [h5Url, setH5Url] = useState('');
  const [miniappCodeUrl, setMiniappCodeUrl] = useState('');
  const [miniappUrl, setMiniappUrl] = useState('');
  const [previewType, setPreviewType] = useState('h5');
  const [copyModalVisible, setCopyModalVisible] = useState(false);

  useHideHeader(location);

  const copyText = (text: string) => {
    copy(text);
    message.success('复制成功');
  };

  const handlePageAuditStatus = async (id: number | string, status: PageStatusType) => {
    let actionData: PageActionType;
    switch (status) {
      case PageStatusType.Audit:
        actionData = 'miniappAudit';
        break;
      case PageStatusType.Online:
        actionData = 'miniappOnline';
        break;
      default:
        actionData = 'miniappOnline';
        break;
    }
    const res = await updatePage(id, {
      action: actionData!,
    });
    if (res.code === 0) {
      tableRef.current?.reload();
    }
  };

  const getOnlineUrl = async (item: PageItem) => {
    try {
      const platform = getPlatform(item.platform);
      setPreviewType(platform);
      setH5Url(item.webUrl);
      if (platform.includes('mini')) {
        const {
          data: { cdnUrl },
        } = await getWxOnlineCode(item.page);
        setMiniappUrl(`pages/index/index?id=${item.page}`);
        setMiniappCodeUrl(cdnUrl);
      }
      setPreviewVisible(true);
    } catch {
      message.error('获取在线地址失败!');
    }
  };

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
      dataIndex: 'name',
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
                fallback={
                  'https://static-zy-com.oss-cn-hangzhou.aliyuncs.com/kbase/portallandingpage/assets/rc-upload-1624438481409-2.png'
                }
              />
            </PageImg>
            <PageDetail>
              <PageName>{record.name}</PageName>
              {record.releaseBatch && (
                <PageAction>
                  {record.platform.includes(PlatformType.WEB) && (
                    <Button
                      onClick={() => {
                        copyText(record.webUrl);
                      }}
                      type="link"
                      style={{ marginRight: '40px' }}
                    >
                      <i className="iconicon-copy iconfont" />
                      复制链接
                    </Button>
                  )}
                  {record.platform.includes(PlatformType.MINIAPP) && (
                    <Button
                      onClick={() => {
                        copyText(record.miniappUrl);
                      }}
                      type="link"
                    >
                      <i className="iconicon-copy iconfont" />
                      复制小程序路径
                    </Button>
                  )}
                </PageAction>
              )}
            </PageDetail>
          </PageInfo>
        );
      },
    },
    {
      title: '页面类型和状态',
      dataIndex: 'platform',
      width: 200,
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
      // fieldProps: {
      //   mode: 'multiple',
      //   maxTagCount: 'responsive',
      // },
      render(_, item) {
        const isEdit =
          item.miniappReleaseState !== PageStatusType.Offline &&
          item.miniappReleaseState !== PageStatusType.Online;
        return (
          <>
            {item.platform.includes('WEB') && (
              <PageTag>
                <Tag className="h5">H5</Tag>
                <StatusTag type={item.webReleaseState} />
              </PageTag>
            )}
            {item.platform.includes('MINIAPP') && (
              <PageTag>
                <Tag className="mini">小程序</Tag>
                <StatusTag
                  // edit={isEdit}
                  // onChangeStatus={(status) => {
                  //   handlePageAuditStatus(item.page, status);
                  // }}
                  type={item.miniappReleaseState}
                />
                <Tooltip
                  overlayClassName="page-tag-tooltip"
                  title={
                    <Tips>
                      小程序如果使用新组件需要上
                      <a href="https://mp.weixin.qq.com/" target="_blank" rel="noreferrer">
                        微信公众平台
                      </a>
                      ，手动上线并且等待审核通过
                    </Tips>
                  }
                >
                  <QuestionCircleOutlined />
                </Tooltip>
              </PageTag>
            )}
          </>
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
        offline: {
          text: '未上线',
        },
        online: {
          text: '已上线',
        },
      },
      hideInTable: true,
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
        return record.releaseTime ? moment(record.releaseTime).format('YYYY-MM-DD HH:mm:ss') : '';
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
        return moment(record.createTime).format('YYYY-MM-DD HH:mm:ss');
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
        return moment(record.updateTime).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      valueType: 'option',
      hideInSearch: true,
      width: 220,
      fixed: 'right',
      render(_, item) {
        const menu = (
          <TableActionMenu>
            <Button
              type="text"
              onClick={() => {
                // copyPage(item.page);
                setCopyModalVisible(true);
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
              disabled={!item.releaseBatch}
              onClick={() => {
                getOnlineUrl(item);
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
                  confirm({
                    title: '确认下线页面',
                    icon: <ExclamationCircleOutlined />,
                    content: '页面下线后，线上页面将会失效，无法进入。请谨慎操作！',
                    okText: '确认',
                    okType: 'primary',
                    cancelText: '取消',
                    centered: true,
                    async onOk() {
                      handlePageStatus(item.page, 'offline');
                    },
                  });
                }}
              >
                下线
              </Button>
            )}
            <Popover overlayClassName="table-action-menu" content={menu} placement="bottom">
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
    <>
      <AntdPageHeader title="达芬奇" className="page-header" />
      <div className="projects-container">
        <aside>
          <Menu selectedKeys={['1']}>
            <Menu.Item key={'1'}>落地页项目管理</Menu.Item>
            <Menu.Item key={'2'}>
              <Link to="/material-manage">素材管理</Link>
            </Menu.Item>
          </Menu>
        </aside>
        <div className="page-container">
          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="/davinciprovider/project">项目列表</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{query.projectTitle || '项目名称'}</Breadcrumb.Item>
          </Breadcrumb>
          <PageContainer>
            <PagePopoverStyle />
            <StatusTagStyle />
            <PageHeader title="页面列表">
              <Button
                type="primary"
                style={{
                  padding: '0 10px',
                }}
                onClick={addPage}
              >
                <PlusOutlined />
                创建页面
              </Button>
            </PageHeader>
            <PageMain>
              <ProTable<PageItem>
                bordered
                polling={5000}
                actionRef={tableRef}
                columns={columns}
                rowKey="id"
                search={{
                  labelWidth: 70,
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
              h5Url={h5Url}
              onChange={() => {
                setPreviewVisible(false);
              }}
              type={previewType as 'h5' | 'mini' | 'h5mini'}
              miniappCodeUrl={miniappCodeUrl}
              miniappUrl={miniappUrl}
              visible={previewVisible}
            />
            <PageSettingModal
              id={pageId}
              onChangeVisible={(val) => {
                setSettingVisible(val);
              }}
              visible={settingVisible}
            />
            {/* <FreedomDrag /> */}
            <CopyPageModal
              projectId={query.projectId}
              onChangeVisible={setCopyModalVisible}
              visible={copyModalVisible}
            ></CopyPageModal>
          </PageContainer>
        </div>
      </div>
    </>
  );
};

export default Page;
