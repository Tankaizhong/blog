import service from '@/utils/axios'

export const fetchUsers = () => {
  return service.post('/admin/users')
}

export const createUser = (userInfo) => {
  return service.post('/admin/createUser', { userInfo })
}
/**
 * 模糊信息查询用户
 * @param userInfo
 */
export const getUserInfo = (userInfo) => {
  // console.log(userInfo)
  return service.post('/admin/getUserInfo', { userInfo })
}

export const checkAdminAPI = () => {
  return service.get('/admin/checkSuperAdmin')
}

export const fetchBlogStats = () => {
  return service.get('/admin/fetchBlogStats')
}
