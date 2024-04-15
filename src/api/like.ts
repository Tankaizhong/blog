//点赞
import service from '@/utils/axios'

export const addLike = (PostID: number) => {
  return service.post(`/like/addLike`, { PostID })
}

export const removeLike = (PostID: number) => {
  return service.post(`/like/removeLike`, { PostID })
}

//查询该用户是否点赞
export const fetchLikeStatus = (PostID) => {
  return service.post(`/like/checkLike`, { PostID })
}
