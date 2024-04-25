import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Modal, Upload, InputNumber, message } from 'antd'
import { UserType } from '@/types/model'
import { updateUser, uploadAvatar, createUser, register } from '@/api/user'
import { getStorage, saveStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'

interface UserFormProps {
  userInfo: UserType
  onClose: () => void
}

const UserForm: React.FC<UserFormProps> = ({ userInfor, onClose }) => {
  const [form] = Form.useForm()
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  // 设置表单初始值为选定用户的信息
  useEffect(() => {
    form.setFieldsValue(userInfor)
    // console.log()
  }, [userInfor, form])

  const handleSubmit = async (values: any) => {
    if (!userInfor.hasOwnProperty('UserID')) {
      //创建用户
      await register(values)
    } else {
      // 更新用户信息
      const { Avatar, ...otherInfo } = values
      await updateUser(otherInfo)
        .then((res) => {
          // console.log('User info updated:', res)
          // 处理更新用户信息后的响应
        })
        .catch((error) => {
          console.error('Error updating user info:', error)
        })
      // console.log(avatarFile instanceof File,avatarFile)
      // 更新头像
      if (avatarFile instanceof File) {
        const formData = new FormData()
        formData.append('file', Avatar.file)
        await uploadAvatar(formData)
          .then((res) => {
            values.Avatar = res?.imageUrl
          })
          .catch((error) => {
            console.error('Error uploading avatar:', error)
          })
      }
    }
    console.log(values)
    if (isAdminLoggedIn()) {
      console.log(isAdminLoggedIn())
      // 如果是管理员自己修改信息，则更新本地保存的用户信息
      updateLocalUserInfo(values)
    }
    onClose()
  }

  const isAdminLoggedIn = () => {
    const savedUserInfo = getStorage(LOCAL_STORAGE_NAME)
    if (savedUserInfo) {
      return savedUserInfo.Username === 'root'
    }
    return false
  }
  // 更新本地保存的用户信息
  const updateLocalUserInfo = (userInfo: UserType) => {
    // 从本地存储中获取之前保存的用户信息
    const savedUserInfo = getStorage(LOCAL_STORAGE_NAME) as UserType & string

    if (savedUserInfo) {
      // 将新的用户信息与之前的信息合并
      const updatedUserInfo = { ...savedUserInfo, ...userInfo }
      // 将更新后的用户信息重新保存到本地存储中
      saveStorage(LOCAL_STORAGE_NAME, updatedUserInfo)
    }
  }

  const updateOtherInfo = async (values: any) => {
    // 在这里执行更新其他信息的逻辑，比如调用更新用户信息的 API
    await updateUser(values)
      .then((res) => {
        console.log('Other info updated:', res)
        // 处理更新其他信息后的响应
      })
      .catch((error) => {
        console.error('Error updating other info:', error)
      })
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="Username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="Nickname" label="昵称" rules={[{ required: true, message: '请输入昵称' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="Avatar" label="头像">
        <Upload
          fileList={avatarFile ? [{ uid: '1', name: avatarFile.name }] : []}
          beforeUpload={(file) => {
            setAvatarFile(file)
            return false // 阻止自动上传
          }}
          accept="image/*"
        >
          <Button>选择文件</Button>
        </Upload>
      </Form.Item>
      <Form.Item name="Birthday" label="生日">
        <Input type="date" />
      </Form.Item>
      <Form.Item
        name="Age"
        label="年龄"
        rules={[{ type: 'number', min: 1, message: '请输入有效的年龄' }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="PhoneNumber"
        label="电话号码"
        rules={[{ required: true, message: '请输入电话号码' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button onClick={onClose} style={{ marginLeft: 8 }}>
          取消
        </Button>
      </Form.Item>
    </Form>
  )
}

export default UserForm
