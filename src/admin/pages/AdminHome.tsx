import React, { useEffect, useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { DesktopOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons'
import { Outlet } from 'react-router-dom'

import { checkAdminAPI, getUserInfo } from '@/admin/api/admin' // 从后端获取用户信息的函数

const { Sider, Content } = Layout
import { useRouter } from '@/utils/router'
import Login from '@/components/Login'
import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { navigateTo } = useRouter()
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const handleMenuClick = (e: MenuProps['onClick']) => {
    console.log(e.key)
    navigateTo(`/admin/${e.key}`)
  }
  //判断超级管理员
  const [isAdmin, setIsAdmin] = useState(false)

  const [token, setToken] = useState(null)

  useEffect(() => {
    const Admin = getStorage(LOCAL_STORAGE_NAME)?.Admin
    // console.log(Admin)
    if (!Admin) navigateTo('/')
  })
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <div className="logo" />
        <Menu onClick={handleMenuClick} theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="dashBoard" icon={<DesktopOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="TagManager" icon={<DesktopOutlined />}>
            标签管理
          </Menu.Item>
          <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="用户管理">
            <Menu.Item key="users">用户列表</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" icon={<SettingOutlined />} title="Settings">
            <Menu.Item key="5">Privacy</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminDashboard
