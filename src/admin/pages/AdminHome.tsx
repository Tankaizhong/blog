import React, { useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import {
  DesktopOutlined,
  UserOutlined,
  AppstoreOutlined,
  MessageOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { Outlet } from 'react-router-dom'
const { Sider, Content } = Layout
import { navigateTo } from '@/utils/router'
import '../style/AdminHome.less'

const AdminHome = () => {
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const handleMenuClick = (e: MenuProps['onClick']) => {
    // console.log(e.key)
    navigateTo(`/admin/${e.key}`)
  }

  return (
    <Layout>
      <Sider collapsible={true} collapsed={collapsed} onCollapse={toggleCollapsed}>
        <Menu onClick={handleMenuClick} theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="dashBoard" icon={<DesktopOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="TagManager" icon={<DesktopOutlined />}>
            标签管理
          </Menu.Item>

          <Menu.Item key="CategoryManager" icon={<AppstoreOutlined />}>
            分类管理
          </Menu.Item>

          <Menu.Item key="CommentManager" icon={<MessageOutlined />}>
            评论管理
          </Menu.Item>

          <Menu.Item key="PostManager" icon={<FileTextOutlined />}>
            文章管理
          </Menu.Item>

          <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="用户管理">
            <Menu.Item key="users">用户列表</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content>
          <div className="sider-content">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminHome
