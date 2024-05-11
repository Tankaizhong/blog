import React from 'react'
import { Modal, Button } from 'antd'

const ForgotPasswordModal = ({ visible, onClose }) => {
  const handleOk = () => {
    // 这里可以添加联系管理员的逻辑，例如发送邮件或者提供管理员的联系方式
    onClose() // 关闭弹窗
  }

  const handleCancel = () => {
    onClose() // 关闭弹窗
  }

  return (
    <Modal
      title="联系管理员"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          确认
        </Button>,
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
      ]}
    >
      <p>请联系管理员进行密码重置。</p>
      <p>管理员邮箱：2534658839@qq.com</p>
    </Modal>
  )
}

export default ForgotPasswordModal
