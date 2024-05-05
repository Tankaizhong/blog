//路由模块
import { IRoute } from '@/types'
import Home from '@/pages/Home/Home'
import { Navigate } from 'react-router-dom'
import Login from '@/components/Login'
import Register from '@/components/Register'
import CreatorCenter from '@/components/Creater/CreatorCenter'
import HomeContent from '@/pages/Home/HomeContent'
import WritePost from '@/pages/WritePost/WritePost'
import PostDetail from '@/pages/Post/PostDetail'
import PublishSuccess from '@/pages/PublishSuccess'
import Agreement from '@/pages/Agreement'
import { withAuth } from '@/HOC/withAuth'
import UserRankings from '@/pages/UserRankings'

const routes: IRoute[] = [
  //为空时重定位到home
  {
    path: '/',
    element: <Navigate to="/home/all" />,
  },
  {
    path: '/home',
    name: 'home',
    element: <Home />,
    children: [
      {
        path: 'creator',
        name: 'creator',
        element: withAuth(<CreatorCenter />), //路由鉴权
      },
      {
        path: 'publishSuccess',
        name: 'publishSuccess',
        element: <PublishSuccess />,
      },
      {
        path: 'all/:sharedState?/:query?',
        name: 'HomeContent',
        element: <HomeContent />,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    element: <Login />,
  },
  {
    path: '/register',
    name: 'register',
    element: <Register />,
  },
  {
    path: '/draft',
    name: 'draft',
    element: <WritePost />,
  },
  //用户排行
  {
    path: '/user/all',
    name: 'user',
    element: <UserRankings />,
  },
  {
    path: '/post/:PostID',
    name: 'post',
    element: <PostDetail />,
  },
  {
    path: '/agreement',
    name: 'agreement',
    element: <Agreement />,
  },
]

export default routes
