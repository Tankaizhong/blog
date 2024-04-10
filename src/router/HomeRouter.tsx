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
import PublishSuccess from "@/pages/PublishSuccess";

const routes: IRoute[] = [
  //为空时重定位到home
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/home',
    name: 'home',
    element: <Home />,
    children: [
      {
        path: 'creator',
        name: 'creator',
        element: <CreatorCenter />,
      },
      {
        path: 'publishSuccess',
        name: 'publishSuccess',
        element: <PublishSuccess />,
      },
      {
        path: '',
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
  {
    path: '/post/:id',
    name: 'post',
    element: <PostDetail />,
  },
]

export default routes
