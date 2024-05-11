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
//获取所有文章按分类
export const fetchAllPostGroupByCategory = () => {
  return service.get(`/admin/fetchAllPostGroupByCategory`)
}

//封禁用户
export const banUser = (UserID) => {
  return service.get(`/admin/banUser?UserID=${UserID}`)
}

//解封评论
export const unblockComment = (CommentID) => {
  console.log(CommentID)
  return service.get(`/comments/unblockComment?CommentID=${CommentID}`)
}
