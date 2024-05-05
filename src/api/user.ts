import service from '@/utils/axios'
import type { UserType } from '@/types/model'
//登陆接口
export const login = (data: UserType) => {
  return service.post('/user/login', data)
}
//注册接口
export const register = (data: UserType) => {
  return service.post('/user/register', {
    ...data,
    Password: data.Password ? data.Password : data.Username,
  })
}
//获取当前用户文章(本地token读取)
export const fetchCurrentPostList = (UserID) => {
  return service.post('/user/postList', { UserID })
}

/**
 * 上传头像
 * @param formData
 */
export const uploadAvatar = (formData) => {
  return service.post('/user/uploadAvatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // 设置请求头为 multipart/form-data
    },
  })
}

export const updateUser = (updateInfor) => {
  return service.post('/user/updateUserInfor', { updateInfor })
}

//当前用户
export const fetchUserPost = () => {
  return service.get('/user/postList')
}
//删除用户
export const deleteUser = (UserID) => {
  return service.post('/user/deleteUser', { UserID })
}
//用户排行
export const getUserRankings = () => {
  return service.get('/user/rankings')
}
