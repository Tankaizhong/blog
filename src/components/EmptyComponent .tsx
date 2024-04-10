import React from 'react'
import { Empty } from 'antd'
import '@/styles/empty-component.less'

const EmptyComponent = () => {
  return (
    <div className="empty-wrapper">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据" />
    </div>
  )
}

export default EmptyComponent
