//整合路由
import NotFoundRouter from '@/router/NotFoundRouter'
import HomeRouter from '@/router/HomeRouter'

const routes = [
  ...HomeRouter,
  ...NotFoundRouter,
  //其他路由
]

export default routes
