import service from '@/utils/axios'
import type { User } from '@/types/model'
//登陆接口
export const login = (data: User) => {
  return service.post('/user/login', data)
}
//注册接口
export const register = (data: User) => {
  return service.post('/user/register', data)
}
//获取当前用户文章
export const fetchCurrentPostList = () => {
  return service.get('/user/postList')
}
