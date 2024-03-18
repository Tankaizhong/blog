//使用路由
import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from '@/router/index'
import { IRoute } from '@/types'

function App() {
  function renderRoues(routes: IRoute) {
    console.log('路由处理')
  }

  routes.forEach((item) => renderRoues(item))
  const route = useRoutes(routes)
  console.log(routes)
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>{route}</Suspense>
    </>
  )
}

export default App
