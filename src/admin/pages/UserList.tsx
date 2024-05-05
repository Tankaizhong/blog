import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Modal, Menu, Badge, message } from 'antd'
import { banUser, fetchUsers } from '@/admin/api/admin'
import UserForm from '../component/UserForm'
import { UserType } from '@/types/model'
import { AxiosResponse } from 'axios'
import moment from 'moment'
import { deleteUser } from '@/api/user'
import { showConfirm } from '@/utils/button'
import { exportToExcel } from '@/utils/excel'
import { fetchAndSetUsers } from '@/utils/user'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [showUserForm, setShowUserForm] = useState(false)
  const [userInfor, setUserInfo] = useState<UserType>({} as UserType)

  useEffect(() => {
    fetchAndSetUsers()
      .then((users) => {
        setUsers(users as any)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])
  const handleEdit = (userInfor) => {
    // console.log(userInfor)
    setShowUserForm(true)
    setUserInfo(userInfor)
  }
  const handleDelete = async (userInfor) => {
    await deleteUser(userInfor.UserID).then((res: AxiosResponse) => {
      if (res.success) {
        message.success('删除成功')
        fetchAndSetUsers()
          .then((users) => {
            setUsers(users as any)
          })
          .catch((error) => {
            console.error('Error fetching users:', error)
          })
      }
    })
  }

  const handleBan = (record: UserType) => {
    banUser(record.UserID)
      .then((res) => {
        message.success(res.message)
        fetchAndSetUsers().then((users) => {
          setUsers(users as any)
        })
      })
      .catch((error) => {
        console.error('封禁用户失败:', error)
      })
  }
  const columns = [
    {
      title: '用户名',
      dataIndex: 'Username',
      key: 'Username',
    },
    {
      title: '登录次数',
      dataIndex: 'LoginCount',
      key: 'LoginCount',
    },
    {
      title: 'Status',
      key: 'Status',
      render: (text, record: UserType) => (
        <Badge
          status={record.Status === 'active' ? 'success' : 'error'}
          text={record.Status === 'active' ? '正常' : '异常'}
        />
      ),
    },
    {
      title: '最后登录时间',
      dataIndex: 'LastLoginTime',
      key: 'LastLoginTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record: UserType) => (
        <Space size="middle">
          <a style={{ color: '#468dc8' }} onClick={() => handleEdit(record)}>
            编辑
          </a>
          <a style={{ color: 'red' }} onClick={() => showConfirm(() => handleDelete(record))}>
            删除
          </a>
          {record.Status === 'active' ? (
            <a style={{ color: 'red' }} onClick={() => showConfirm(() => handleBan(record))}>
              封禁
            </a>
          ) : (
            <a style={{ color: 'green' }} onClick={() => showConfirm(() => handleBan(record))}>
              解封
            </a>
          )}
        </Space>
      ),
    },
  ]
  const handleExport = () => {
    const { PassWord, ...data } = users
    console.log(users, columns)
    exportToExcel(columns, users, 'users.xlsx')
  }
  return (
    <>
      <div style={{ display: 'flex' }}>
        {/*左上添加用户*/}
        <Button onClick={() => setShowUserForm(true)}>添加用户</Button>
        <Modal
          title={userInfor.hasOwnProperty('UserID') ? '编辑用户' : '添加用户'}
          open={showUserForm}
          onCancel={() => setShowUserForm(false)}
          footer={null}
        >
          <UserForm userInfor={userInfor} onClose={() => setShowUserForm(false)} />
        </Modal>
        <Button onClick={handleExport}>导出为 Excel</Button>
      </div>
      <Table
        columns={columns.map((column) => ({
          ...column,
          align: 'center',
        }))}
        dataSource={users}
        rowKey="UserID"
      />
    </>
  )
}

export default UserList
