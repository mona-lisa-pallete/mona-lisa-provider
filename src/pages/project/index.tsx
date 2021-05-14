import PageHeader from '@/components/PageHeader';
import { Button, Form, Input, Menu } from 'antd';
import React, { useState } from 'react';
import { MenuBtn, ProjectContainer, ProjectListContainer, ProjectMain } from './index.style';
import { QueryFilter, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import ProjectItem from './components/ProjectItem';
import { useHistory } from 'react-router';
import ConfirmModal from '@/components/ConfirmModal';

const Project: React.FC = () => {
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);

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

  const submitProject = () => {};

  const goToPage = () => {
    history.push({
      pathname: `/page`,
      query: {
        projectId: '1',
      },
    });
  };

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
          company: string;
        }>
          onFinish={async (values) => {
            console.log(values.name);
          }}
          labelAlign="left"
        >
          <ProFormText name="name" label="项目名称" />
          <ProFormSelect name="creater" label="创建人" />
        </QueryFilter>
        <ProjectListContainer>
          <ProjectItem onClick={goToPage} actionRender={menu()} />
        </ProjectListContainer>
      </ProjectMain>
      <ConfirmModal onOk={submitProject} visible={modalVisible} onChangeVisible={setModalVisible}>
        <Form colon layout="vertical">
          <Form.Item label="项目名称:">
            <Input />
          </Form.Item>
        </Form>
      </ConfirmModal>
    </ProjectContainer>
  );
};

export default Project;
