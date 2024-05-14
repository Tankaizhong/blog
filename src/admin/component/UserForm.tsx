import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Upload, InputNumber, message, Select } from 'antd'
import { UserType } from '@/types/model'
import { updateUser, uploadAvatar, createUser, register, checkEmailExist } from '@/api/user'
import { getStorage, saveStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import { updateLocalUser } from '@/utils/user'
import { Validator } from 'antd/lib/form/utils'
interface UserFormProps {
  userInfo: UserType
  onClose: () => void
}
const { Option } = Select
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
      //创建用户,然后显示成功信息
      await register(values)
        .then((res) => {
          message.success('创建成功')
          onClose()
        })
        .catch((error) => {
          console.error('Error creating user:', error)
        })
    } else {
      // 更新用户信息
      const { Avatar, ...otherInfo } = values
      await updateUser(otherInfo)
        .then((res) => {
          //判断是否存储本地呢
          if (getStorage(LOCAL_STORAGE_NAME).UserID === res.user.UserID) {
            updateLocalUser(values)
          }
        })
        .catch((error) => {
          console.error('Error updating user info:', error)
        })

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
      //刷新界面onClose()
    }
    // console.log(values)
    if (isAdminLoggedIn()) {
      // 如果是管理员自己修改信息，则更新本地保存的用户信息
      updateLocalUser(values)
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

  //邮箱验证
  const validateEmail: Validator = async (_, value) => {
    // 检查邮箱格式
    if (value && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      throw new Error('请输入正确的邮箱格式')
    }
    console.log(value)
    // 检查邮箱是否已被注册
    if (value) {
      const res = await checkEmailExist(value) // 调用后端 API 检查邮箱是否已存在
      if (res.exist) {
        throw new Error('该邮箱已被注册')
      }
    }
  }

  //邮箱后缀选择
  const selectAfter = (
    <Select defaultValue="@qq.com">
      <Option value="@qq.com">@qq.com</Option>
      <Option value="@163.com">@163.com</Option>
      <Option value="@icloud.com">@icloud.com</Option>
    </Select>
  )

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
      <Form.Item
        name="Email"
        label="邮箱"
        rules={[{ required: true, message: '请输入邮箱' }, { validator: validateEmail }]}
      >
        <Input addonAfter={selectAfter} />
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
