import PageHeader from '@/components/PageHeader';
import { Button, Form, Input, Menu, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { MenuBtn, ProjectContainer, ProjectListContainer, ProjectMain } from './index.style';
import { QueryFilter, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import ProjectItem from './components/ProjectItem';
import { useHistory } from 'react-router';
import ConfirmModal from '@/components/ConfirmModal';
import { addProject, getProjects, getProjectUsers } from '@/services/project';
import { ProjectItem as ProjectItemType } from '@/services/project/schema';
import moment from 'moment';

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

  const menu = () => {
    return (
      <MenuBtn>
        <Menu.Item key="edit">删除</Menu.Item>
      </MenuBtn>
    );
  };

  const handleModalVisible = () => {
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
    }
  };

  const goToPage = (projectId: number) => {
    history.push({
      pathname: `/page`,
      query: {
        projectId: `${projectId}`,
      },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const res = await getProjects(query);
      setData(res.data.list);
    };
    getData();
  }, [query]);

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
                actionRender={menu()}
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
      >
        <Form onFinish={addProjectData} form={form} colon layout="vertical">
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
