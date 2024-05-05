import { IRoute } from '@/types'
import { Navigate } from 'react-router-dom'
import AdminHome from '@/admin/pages/AdminHome'
import UserList from '@/admin/pages/UserList'
import UserForm from '@/admin/component/UserForm'
import Dashboard from '@/admin/pages/Dashboard'
import TagManager from '@/admin/pages/TagManager'
import CategoryManager from '@/admin/pages/CategoryManager'
import CommentManager from '@/admin/pages/CommentManager'
import { withAdminAuth } from '@/HOC/withAuth'
import PostManager from '@/admin/pages/PostManager'
const routes: IRoute[] = [
  {
    path: '/admin',
    element: withAdminAuth(<AdminHome />),
    children: [
      {
        path: 'users',
        element: <UserList />,
      },
      {
        path: 'dashBoard',
        element: <Dashboard />,
      },
      {
        path: 'TagManager',
        element: <TagManager />,
      },
      {
        path: 'CategoryManager',
        element: <CategoryManager />,
      },
      {
        path: 'CommentManager',
        element: <CommentManager />,
      },
      {
        path: 'PostManager',
        element: <PostManager />,
      },
    ],
  },
]
export default routes
