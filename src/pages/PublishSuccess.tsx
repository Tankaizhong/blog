// PublishSuccess.jsx
import React from 'react'
import { Result, Button } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import '@/styles/publish-success.less'
import { navigateTo, useRouter } from '@/utils/router' // 引入样式文件

const PublishSuccess = () => {
  const goHome = () => {
    navigateTo('/home/all')
  }
  return (
    <div className="publish-success-container">
      <Result
        icon={<SmileOutlined />}
        title="文章发布成功"
        extra={
          <Button key="back" onClick={goHome}>
            返回首页
          </Button>
        }
      />
    </div>
  )
}

export default PublishSuccess
