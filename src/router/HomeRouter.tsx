//路由模块
import {IRoute} from '@/types'
import Home from '@/pages/Home/Home'
import {Navigate} from 'react-router-dom'
import Login from "@/components/Login";
import Register from "@/components/Register";

const routes: IRoute[] = [
    //为空时重定位到home
    {
        path: '/',
        element: <Navigate to="/home"/>,
    },
    {
        path: '/home',
        name: 'NotFound',
        element: <Home/>,
    },
    {
        path: 'login',
        name: 'login',
        element: <Login/>
    }, {
        path: 'register',
        name: 'register',
        element: <Register/>
    }
]

export default routes
