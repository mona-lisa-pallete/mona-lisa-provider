import PageHeader from '@/components/PageHeader';
import { Button, Form, Input, Menu, message, Modal } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { MenuBtn, ProjectContainer, ProjectListContainer, ProjectMain } from './index.style';
import { QueryFilter, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import ProjectItem from './components/ProjectItem';
import { useHistory } from 'react-router';
import ConfirmModal from '@/components/ConfirmModal';
import {
  addProject,
  delProject,
  getProjects,
  getProjectUsers,
  setProject,
} from '@/services/project';
import { ProjectItem as ProjectItemType } from '@/services/project/schema';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const Project: React.FC = () => {
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState<ProjectItemType[]>([]);
  const [query, setQuery] = useState({
    name: '',
    createUserName: '',
  });
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [user, setUsers] = useState<Array<{ label: string; value: string }>>([]);
  const [projectId, setProjectId] = useState<string | number>('');

  const editProject = (id: string | number, name: string) => {
    setModalVisible(true);
    setProjectId(id);
    form.setFieldsValue({
      name,
    });
  };

  const handleDelProject = (id: string | number) => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '删除之后暂时无法找回，是否确认删除？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      async onOk() {
        const res = await delProject(id);
        if (res.code === 0) {
          message.success('删除成功');
        }
      },
    });
  };

  const menu = (item: ProjectItemType) => {
    return (
      <MenuBtn>
        <Menu.Item
          key="del"
          onClick={(e) => {
            e.domEvent.stopPropagation();
            handleDelProject(item.id);
          }}
        >
          删除项目
        </Menu.Item>
        <Menu.Item
          key="edit"
          onClick={(e) => {
            e.domEvent.stopPropagation();
            editProject(item.id, item.name);
          }}
        >
          编辑项目
        </Menu.Item>
      </MenuBtn>
    );
  };

  const handleModalVisible = () => {
    form.resetFields();
    setProjectId('');
    setModalVisible(true);
  };

  const submitProject = () => {
    form.submit();
  };

  const addProjectData = async (values: any) => {
    setConfirmLoading(true);
    const res = await addProject({
      name: values.name,
    });
    if (res.code === 0) {
      message.success('创建成功');
      setConfirmLoading(false);
      setModalVisible(false);
      getData();
    }
  };

  const setProjectData = async (values: any) => {
    setConfirmLoading(true);
    const res = await setProject(projectId, {
      name: values.name,
    });
    if (res.code === 0) {
      message.success('修改成功');
      setConfirmLoading(false);
      setModalVisible(false);
      getData();
    }
  };

  const handleProjectData = (values: any) => {
    const isEdit = !!projectId;
    if (isEdit) {
      setProjectData(values);
    } else {
      addProjectData(values);
    }
  };

  const goToPage = (projectRouteId: number) => {
    // @ts-ignore 是有query这个参数的，但是umi没有声明
    history.push({
      pathname: `/page`,
      query: {
        projectId: `${projectRouteId}`,
      },
    });
  };

  const getData = useCallback(async () => {
    const res = await getProjects(query);
    setData(res.data.list);
  }, [query]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    const getUsersData = async () => {
      const res = await getProjectUsers();
      if (res.code === 0) {
        setUsers(
          res.data.map((i) => {
            return {
              label: i,
              value: i,
            };
          }),
        );
      }
    };
    getUsersData();
  }, []);

  return (
    <ProjectContainer>
      <PageHeader title="项目列表">
        <Button type="primary" onClick={handleModalVisible}>
          创建项目
        </Button>
      </PageHeader>
      <ProjectMain>
        <QueryFilter<{
          name: string;
          createUserName: string;
        }>
          onFinish={async (values) => {
            setQuery(values);
          }}
          onReset={() => {
            setQuery({
              name: '',
              createUserName: '',
            });
          }}
          labelAlign="left"
        >
          <ProFormText name="name" label="项目名称" />
          <ProFormSelect
            fieldProps={{
              filterOption: true,
              showSearch: true,
            }}
            options={user}
            name="creater"
            label="创建人"
          />
        </QueryFilter>
        <ProjectListContainer>
          {data.map((i) => {
            return (
              <ProjectItem
                name={i.name}
                createTime={moment(i.createTime).format('YYYY-MM-DD HH:MM:SS')}
                createUserName={i.createUserName}
                onClick={() => {
                  goToPage(i.id);
                }}
                actionRender={menu(i)}
              />
            );
          })}
        </ProjectListContainer>
      </ProjectMain>
      <ConfirmModal
        onOk={submitProject}
        visible={modalVisible}
        confirmLoading={confirmLoading}
        onChangeVisible={setModalVisible}
        title={projectId ? '编辑项目' : '创建项目'}
      >
        <Form onFinish={handleProjectData} form={form} colon layout="vertical">
          <Form.Item
            rules={[
              {
                required: true,
                message: '请输入项目名称',
              },
            ]}
            label="项目名称:"
            name="name"
          >
            <Input maxLength={20} />
          </Form.Item>
        </Form>
      </ConfirmModal>
    </ProjectContainer>
  );
};

export default Project;
