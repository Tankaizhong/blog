import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Modal, Menu } from 'antd'
import { fetchUsers } from '@/admin/api/admin'
import UserForm from '../component/UserForm'
import { User } from '@/types/model'
import { AxiosResponse } from 'axios'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [showUserForm, setShowUserForm] = useState(false)
  const [userInfor, setUserInfo] = useState<User>({} as User)

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        // console.log(response,'111111111111')
        const usersWithKeys = response.map((user) => ({
          ...user,
          key: user.UserID, // 使用 UserID 作为唯一键
        }))
        setUsers(usersWithKeys)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])
  const handleEdit = (userInfor) => {
    console.log(userInfor)
    setShowUserForm(true)
    setUserInfo(userInfor)
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'UserID',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'Username',
      key: 'Username',
    },
    {
      title: '登陆次数',
      dataIndex: 'LoginCount',
      key: 'LoginCount',
    },
    {
      title: '最后登陆时间',
      dataIndex: 'LastLoginTime',
      key: 'LastLoginTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ]
  return (
    <>
      <div style={{ display: 'flex' }}>
        {/*左上添加用户*/}
        <Menu mode="vertical" style={{ marginRight: '20px' }}>
          <Menu.Item key="1" onClick={() => setShowUserForm(true)}>
            添加用户
          </Menu.Item>
          {/* 其他菜单项 */}
        </Menu>
        <Modal
          title={userInfor.hasOwnProperty('UserID') ? '编辑用户' : '添加用户'}
          open={showUserForm}
          onCancel={() => setShowUserForm(false)}
          footer={null}
        >
          <UserForm userInfor={userInfor} onClose={() => setShowUserForm(false)} />
        </Modal>
      </div>
      <Table columns={columns} dataSource={users} />
    </>
  )
}

export default UserList
