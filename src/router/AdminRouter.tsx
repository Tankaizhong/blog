import { IRoute } from '@/types'
import { Navigate } from 'react-router-dom'
import AdminHome from '@/admin/pages/AdminHome'
import UserList from '@/admin/pages/UserList'
import UserForm from '@/admin/component/UserForm'
import Dashboard from '@/admin/pages/Dashboard'
import TagManager from '@/admin/pages/TagManager'
import CategoryManager from '@/admin/pages/CategoryManager'
import CommentManager from '@/admin/pages/CommentManager'
const routes: IRoute[] = [
  {
    path: '/admin',
    element: <AdminHome />,
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
    ],
  },
]
export default routes
