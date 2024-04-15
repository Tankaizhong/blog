import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Modal, Upload, InputNumber, message } from 'antd'
import { User } from '@/types/model'
import { updateUser, uploadAvatar, createUser, register } from '@/api/user'

interface UserFormProps {
  userInfo: User
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
      await updateUser(values)
        .then((res) => {
          console.log('User info updated:', res)
          // 处理更新用户信息后的响应
        })
        .catch((error) => {
          console.error('Error updating user info:', error)
        })
      // 更新头像
      if (avatarFile) {
        const formData = new FormData()
        formData.append('avatar', avatarFile)
        await uploadAvatar(formData)
          .then((res) => {
            console.log('Avatar uploaded:', res)
            // 处理上传头像后的响应
          })
          .catch((error) => {
            console.error('Error uploading avatar:', error)
          })
      }
    }

    onClose()
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
