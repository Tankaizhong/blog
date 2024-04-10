// NotFound.jsx
import React from 'react'
import { Result, Button } from 'antd'
import { Link } from 'react-router-dom'
import '@/styles/not-found.less'

const NotFound = () => {
  return (
    <div className="not-found-container">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，页面不存在"
        extra={
          <Button type="primary">
            <Link to="/home">返回首页</Link>
          </Button>
        }
      />
    </div>
  )
}

export default NotFound
