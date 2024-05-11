import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import '@/styles/login.less'
import { UserType } from '@/types/model'
import { login } from '@/api/user'
import Register from '@/components/Register'
import { saveStorage } from '@/utils/storage'
import { ResponseLogin } from '@/types'
import { LOCAL_STORAGE_NAME } from '@/config'
import ForgotPasswordModal from '@/components/ForgotPasswordModal'

const Login: React.FC = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const [loading, setLoading] = useState(false)
  // 控制当前显示的是登录还是注册
  const [isRegister, setIsRegister] = useState(false)

  useEffect(() => {}, [isRegister])

  const handleLogin = async (values: any) => {
    setLoading(true)
    const { Username, Password }: UserType = values
    try {
      const res = (await login({ Username, Password } as any)) as ResponseLogin
      setLoading(false)
      saveStorage(LOCAL_STORAGE_NAME, res.result)
      onCloseModal()
    } catch (error) {
      console.error('登录失败:', error)
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    setLoading(true)
    setIsRegister(false)
  }

  const onFinish = isRegister ? handleRegister : handleLogin

  const onFinishFailed = (errorInfo: any) => {
    console.log('失败:', errorInfo)
  }

  const [modalVisible, setModalVisible] = useState(false)

  const handleForgotPassword = () => {
    setModalVisible(true) // 显示弹窗
  }

  return (
    <div className="login-container">
      {isRegister ? (
        <Register onFinish={onFinish} onFinishFailed={onFinishFailed} />
      ) : (
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item name="Username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item name="Password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" onClick={handleForgotPassword}>
              忘记密码
            </a>
            <ForgotPasswordModal visible={modalVisible} onClose={() => setModalVisible(false)} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}

export default Login
