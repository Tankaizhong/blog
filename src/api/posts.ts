//生成fetchPostList的api

import service from '@/utils/axios'
import { Category, PostModel, TagModal } from '@/types/model'

export const fetchCategoriesList = () => {
  return service.get('/user/categoriesList')
}
//获取文章
export const fetchPostList = (CategoryID) => {
  return service.post('/posts/getTopPost', { CategoryID })
}
//获取指定文章
export const fetchPostByPostID = (postId) => {
  return service.get(`/posts/${postId}`)
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

//根据分类查询
export const fetchPostByCategory = (CategoryID) => {
  return service.post(`/posts/fetchPostByCategory`, { CategoryID })
}
export const fetchTags = (PostID: number) => {
  return service.get(`/posts/fetchTags`)
}
