//点赞
import service from '@/utils/axios'

export const addPostLike = (PostID: number) => {
  return service.post(`/like/addLike`, { PostID })
}

export const removePostLike = (PostID: number) => {
  return service.post(`/like/removeLike`, { PostID })
}

//查询该用户是否点赞
export const fetchLikeStatus = (PostID) => {
  return service.post(`/like/checkLike`, { PostID })
}

//评论点赞
export const addCommentLike = (CommentID: number) => {
  return service.post(`/like/addCommentLike`, { CommentID })
}

export const checkCommentLike = (CommentID: number) => {
  return service.post(`/like/checkCommentLike`, { CommentID })
}

//评论点赞总数
export const commentLikeCount = (CommentID: number) => {
  return service.get(`/comments/likeCount?CommentID=${CommentID}`)
}
export const removeCommentLike = (CommentID: number) => {
  return service.post(`/comments/removeLike`, { CommentID })
}
//获得点赞数
export const getLikeCount = (UserID: number) => {
  // console.log(UserID)
  return service.get(`/like/getLikeCount?UserID=${UserID}`)
}
