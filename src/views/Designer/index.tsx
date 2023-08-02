// noinspection SpellCheckingInspection

import React from 'react';
import { Button, Layout, Space, theme } from 'antd';
import {
  DisconnectOutlined,
  PlusOutlined,
  RedoOutlined,
  SyncOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import DesignerGraph from './components/DesignerGraph';
import MutateTable from './components/MutateTableModal';

const { Content, Header } = Layout;

const Designer: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Layout>
        <Header style={{ padding: '0 15px', background: colorBgContainer }}>
          <Space direction={'horizontal'}>
            <Space.Compact direction={'horizontal'}>
              <Button>
                <DisconnectOutlined />
                链接数据库
              </Button>
              <Button>
                <SyncOutlined />
                同步数据库
              </Button>
            </Space.Compact>
            <Space.Compact direction={'horizontal'}>
              <Button>
                <UndoOutlined />
                撤销
              </Button>
              <Button>
                <RedoOutlined />
                重做
              </Button>
            </Space.Compact>
            <Space.Compact>
              <MutateTable
                isNew={true}
                trigger={
                  <Button>
                    <PlusOutlined />
                    新建表
                  </Button>
                }
              />
            </Space.Compact>
          </Space>
        </Header>
        <Content
          style={{
            // 64: Header高度
            minHeight: window.innerHeight - 64,
            background: colorBgContainer,
          }}
        >
          <DesignerGraph />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Designer;
