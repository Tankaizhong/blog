//路由模块
import { IRoute } from '@/types'
import { lazy } from 'react'
import NotFound from '@/pages/NotFound/Nofound'

const routes: IRoute[] = [
  {
    path: '*',
    name: 'NotFound',
    element: <NotFound />,
  },
]

export default routes
