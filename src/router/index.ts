//整合路由
import NotFoundRouter from '@/router/NotFoundRouter'
import HomeRouter from '@/router/HomeRouter'
import AdminRouter from '@/router/AdminRouter'
import UserRouter from '@/router/UserRouter'

const routes = [
  ...HomeRouter,
  ...NotFoundRouter,
  ...AdminRouter,
  ...UserRouter,
  //其他路由
]

export default routes
