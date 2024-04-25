import service from '@/utils/axios'
import type { UserType } from '@/types/model'
//登陆接口
export const login = (data: UserType) => {
  return service.post('/user/login', data)
}
//注册接口
export const register = (data: UserType) => {
  console.log(data)
  return service.post('/user/register', { ...data, Password: data.Password })
}
//获取当前用户文章
export const fetchCurrentPostList = () => {
  return service.get('/user/postList')
}

/**
 * 上传头像
 * @param formData
 */
export const uploadAvatar = (formData) => {
  // console.log(formData)
  return service.post('/user/uploadAvatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // 设置请求头为 multipart/form-data
    },
  })
}

export const updateUser = (updateInfor) => {
  return service.post('/user/updateUserInfor', { updateInfor })
}
