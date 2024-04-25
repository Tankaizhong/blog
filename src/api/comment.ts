//点赞
import service from '@/utils/axios'
import { CommentType } from '@/types/model'

export const addComments = (Comment: CommentType) => {
  // console.log(Comment)
  return service.post(`/comments/addComments`, { Comment })
}

export const getCommentsByPostID = (PostID) => {
  // console.log(PostID)
  return service.get(`/comments/getCommentsByPostID`, { params: { PostID: PostID } })
}

//管理员获得全部评论
export const getAllComments = () => {
  return service.get(`/comments/getAllComments`)
}
//删除评论
export const deleteComment = (CommentID) => {
  console.log(CommentID)
  return service.post(`/comments/deleteComment`, { CommentID })
}
