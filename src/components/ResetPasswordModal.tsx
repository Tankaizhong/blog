import React, { useState } from 'react'
import { Modal, Form, Input, Button, message, Flex } from 'antd'
import { resetPasswordRequest, resetPassword, verifyCode } from '@/api/user' // 假设有发送邮件和重置密码的 API

const ResetPasswordModal = ({ onCancel, open }) => {
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 用于控制当前步骤，1表示邮箱，2表示验证码，3表示密码
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')

  const handleResetPassword = async (values) => {
    setLoading(true)
    try {
      if (step === 1) {
        // 发送重置密码邮件
        await resetPasswordRequest(values).then(() => {
          setEmail(values.Email)
          setStep(2) // 切换到验证码的步骤
          message.success('验证码已发送，请查收邮箱。')
        })
      } else if (step === 2) {
        // 验证验证码
        await verifyCode({ Email: email, Code: values.Code }).then(() => {
          message.success('验证码验证成功。')
          setCode(values.Code)
          setStep(3) // 切换到密码设置的步骤
        })
      } else if (step === 3) {
        // 重置密码
        await resetPassword({ Email: email, Code: code, Password: values.Password })
        message.success('密码重置成功。')
        onCancel() // 关闭 Modal
        //帮我重置状态
        resetVal()
      }
    } catch (error) {
      console.error('操作失败：', error)
    } finally {
      setLoading(false)
    }
  }
  //重置状态
  const resetVal = () => {
    setStep(1)
    setEmail('')
    setCode('')
  }

  return (
    <Modal title="重置密码" open={open} onCancel={onCancel} footer={null}>
      <Form onFinish={handleResetPassword}>
        {step === 1 && (
          <Form.Item
            name="Email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入您的邮箱地址！' },
              { type: 'email', message: '请输入有效的邮箱地址！' },
            ]}
          >
            <Input placeholder="请输入您的邮箱地址" />
          </Form.Item>
        )}

        {step === 2 && (
          <Flex>
            <Form.Item
              name="Code"
              label="验证码"
              rules={[{ required: true, message: '请输入验证码！' }]}
            >
              <Input placeholder="请输入收到的验证码" />
              {/*    返回上一步*/}
            </Form.Item>
          </Flex>
        )}

        {step === 3 && (
          <Flex vertical={true}>
            <Form.Item
              name="Password"
              label="新密码"
              rules={[{ required: true, message: '请输入您的新密码！' }]}
            >
              <Input.Password placeholder="请输入您的新密码" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="确认密码"
              dependencies={['Password']}
              rules={[
                { required: true, message: '请再次输入您的新密码！' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('Password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('两次输入的密码不一致！'))
                  },
                }),
              ]}
            >
              <Input.Password placeholder="请再次输入您的新密码" />
            </Form.Item>
          </Flex>
        )}

        <Form.Item>
          <Flex justify="space-around">
            {step == 2 ? <Button onClick={() => setStep(1)}>返回上一步</Button> : null}
            <Button type="primary" htmlType="submit" loading={loading}>
              {step === 1 ? '发送验证码' : step === 2 ? '验证验证码' : '确认重置'}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ResetPasswordModal
