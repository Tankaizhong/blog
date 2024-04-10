//使用路由
import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '@/router/index'
import { IRoute } from '@/types'
import '@/styles/app.less'

function App() {
  function renderRoues(routes: IRoute) {
    // console.log('路由处理')
  }

  routes.forEach((item) => renderRoues(item))
  const route = useRoutes(routes)
  // console.log(routes)
  return (
    <div className="app-content">
      <Suspense fallback={<div>loading...</div>}>{route}</Suspense>
    </div>
  )
}

export default App
