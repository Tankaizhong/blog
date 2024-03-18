//路由模块
import { IRoute } from '@/types'
import Home from '@/pages/Home/Home'
import { Navigate } from 'react-router-dom'

const routes: IRoute[] = [
  //为空时重定位到home
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/home',
    name: 'NotFound',
    element: <Home />,
  },
]

export default routes
