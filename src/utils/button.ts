import React from 'react'
import { Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

const { confirm } = Modal
export const showConfirm = (fn) => {
  confirm({
    focusTriggerAfterClose: true, // 禁止关闭时自动聚焦触发元素
    title: '确定删除吗?',
    content: '不可撤销的操作',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      fn()
      console.log('OK')
    },
    onCancel() {
      console.log('Cancel')
    },
  })
}
