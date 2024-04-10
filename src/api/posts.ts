//生成fetchPostList的api

import service from '@/utils/axios'
import { Category, PostModel, TagModal } from '@/types/model'

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

//发布文章
export const publishPost = (data) => {
  // console.log(data)
  const post = {
    Content: data.content,
    Title: data.title,
    TagName: data.selectedTags,
    CategoryName: data.selectedCategory,
  }
  console.log(post)
  return service.post(`/posts/publish`, post)
}

export const fetchTags = (PostID: number) => {
  return service.get(`/posts/fetchTags`)
}
