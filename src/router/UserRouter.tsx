import { IRoute } from '@/types'
import CategoryManager from '@/admin/pages/CategoryManager'
import UserProfile from '@/pages/UserProfile'
import NotificationComponent from '@/pages/Notification'

const routes: IRoute[] = [
  {
    path: '/account/settings',
    element: <UserProfile />,
  },
  {
    path: '/account/notifications',
    element: <NotificationComponent />,
  },
]
export default routes
