//路由模块
import { IRoute } from '@/types'
import { lazy } from 'react'
import NotFound from '@/pages/NotFound/Nofound'
import { Navigate } from 'react-router-dom'
const routes: IRoute[] = [
  {
    path: '*',
    name: 'NotFound',
    element: <Navigate to="/home/all" />,
  },
]

export default routes
