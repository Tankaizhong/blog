//生成fetchPostList的api

import service from '@/utils/axios'

export const fetchCategoriesList = () => {
  return service.get('/user/categoriesList')
}
//获取文章
export const fetchPostList = () => {
  return service.get('/posts/getTopPost')
}
//获取指定文章
export const fetchPostByPostID = (postId) => {
  return service.get(`/posts/${postId}`)
}
//点赞
export const addLike = (PostID: number) => {
  return service.post(`/posts/like`, { PostID })
}
//浏览量
export const addView = (PostID: number) => {
  return service.post(`/posts/view`, { PostID })
}
//
export const fetchCategories = (PostID: number) => {
  return service.get(`/posts/fetchCategories`)
}

export const fetchTags = (PostID: number) => {
  return service.get(`/posts/fetchTags`)
}
