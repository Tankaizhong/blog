import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Upload, message, Image } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import '@/styles/user-profile.less' // 引入自定义样式文件
import { getStorage, saveStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import { UserType } from '@/types/model'
import { updateUser, uploadAvatar } from '@/api/user'

const UserProfileEdit = () => {
  const [form] = Form.useForm()
  const [avatar, setAvatar] = useState<any>(null) // 存储上传的头像
  const [userInfo, setUserInfo] = useState<UserType>(null) // 存储用户信息

  useEffect(() => {
    // 从本地存储中获取用户信息
    const storedUserInfo = getStorage(LOCAL_STORAGE_NAME)
    if (storedUserInfo) {
      setUserInfo(storedUserInfo)
    }
  }, [avatar])

  const onFinish = (values: any) => {
    console.log('Received values:', values)
    // 这里可以调用后端接口保存用户信息
    updateUser(values).then((res) => {
      // 更新用户信息
      const storedUserInfo = getStorage(LOCAL_STORAGE_NAME)
      if (storedUserInfo) {
        setUserInfo({ ...storedUserInfo, ...values })
        saveStorage(LOCAL_STORAGE_NAME, { ...storedUserInfo, ...values })
      }
    })
    message.success('保存成功')
  }

  // 头像上传前的校验
  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式的图片！')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片必须小于 2MB！')
    }
    return isJpgOrPng && isLt2M
  }

  const [avatarBlob, setAvatarBlob] = useState<Blob>(null) // 存储头像的Blob对象
  const handleChange = async (info: any) => {
    if (info.file.status === 'uploading') {
      // 设置头像
      try {
        // 获取上传头像的文件对象
        const avatarFile = info.file.originFileObj
        // 创建 FormData 对象
        const formData = new FormData()
        formData.append('file', avatarFile)
        // 调用后端接口上传头像
        const response = await uploadAvatar(formData).then((res) => {
          // 更新用户信息
          const storedUserInfo = getStorage(LOCAL_STORAGE_NAME)
          if (storedUserInfo) {
            setUserInfo({ ...storedUserInfo, Avatar: res.imageUrl })
            saveStorage(LOCAL_STORAGE_NAME, { ...storedUserInfo, Avatar: res.imageUrl })
          }
        })
        console.log('Avatar uploaded:', response)
        // 这里可以处理上传头像成功后的逻辑，比如更新用户信息等
      } catch (error) {
        console.error('Error uploading avatar:', error)
        // 这里可以处理上传头像失败后的逻辑，比如显示错误提示信息等
      }
    }
    console.log(info.file.status)
  }

  return (
    <div className="user-profile-edit-container">
      {userInfo && (
        <Upload
          beforeUpload={beforeUpload}
          onChange={handleChange}
          accept=".jpg,.jpeg,.png"
          fileList={avatar ? [avatar] : []}
          showUploadList={false}
        >
          <Image
            className="avatar-preview"
            src={userInfo.Avatar ? userInfo.Avatar : avatar}
            alt="avatar"
          />
          <br />
          <Button icon={<UploadOutlined />}>更换头像</Button>
        </Upload>
      )}
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {userInfo && (
          <>
            <Form.Item name="Username" label="用户名" initialValue={userInfo.Username}>
              <Input />
            </Form.Item>
            <Form.Item name="Nickname" label="昵称" initialValue={userInfo.Nickname}>
              <Input />
            </Form.Item>
            <Form.Item name="Email" label="邮箱" initialValue={userInfo.Email}>
              <Input />
            </Form.Item>
            <Form.Item name="Birthday" label="生日" initialValue={userInfo.Birthday}>
              <Input type="date" />
            </Form.Item>
            <Form.Item
              rules={[
                { required: false, message: '请输入年龄' },
                {
                  validator: (_, value) => {
                    if (value >= 0 && value <= 60) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('年龄必须在0到60岁之间'))
                  },
                },
              ]}
              name="Age"
              label="年龄"
              initialValue={userInfo.Age}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item name="PhoneNumber" label="手机号" initialValue={userInfo.PhoneNumber}>
              <Input />
            </Form.Item>
          </>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default UserProfileEdit
