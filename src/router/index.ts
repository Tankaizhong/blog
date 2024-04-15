//整合路由
import NotFoundRouter from '@/router/NotFoundRouter'
import HomeRouter from '@/router/HomeRouter'
import AdminRouter from '@/router/AdminRouter'

const routes = [
  ...HomeRouter,
  ...NotFoundRouter,
  ...AdminRouter,
  //其他路由
]

export default routes
