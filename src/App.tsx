//使用路由
import React, { Suspense } from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import routes from '@/router/index'
import '@/styles/app.less'
import webSocket from '@/utils/webSocket'
import { WEB_SOCKET_URL } from '@/config'
// 创建 WebSocketConfig 对象

function App() {
  const route = useRoutes(routes)
  //redis服务
  return (
    <div className="app-content">
      <Suspense fallback={<div>loading...</div>}>{route}</Suspense>
    </div>
  )
}

export default App
