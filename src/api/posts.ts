//生成fetchPostList的api

import service from '@/utils/axios'


export const fetchCategoriesList = () => {
  return service.get('/user/categoriesList')
}
//获取文章
export const fetchPostList = (CategoryID) => {
  return service.post('/posts/getPostByCategoryID', { CategoryID })
}
//获取指定文章
export const fetchPostByPostID = (postId) => {
  return service.get(`/posts/${postId}`)
}

//浏览量
export const addView = (PostID: number) => {
  return service.post(`/posts/view`, { PostID })
}
//抓取分类
export const fetchCategories = () => {
  return service.get(`/posts/fetchCategories`)
}

//发布文章
export const publishPost = (data) => {
  const post = {
    Content: data.content,
    Title: data.title,
    TagName: data.selectedTags,
    CategoryName: data.selectedCategory,
    Summary: data.summary,
  }
  return service.post(`/posts/publish`, post)
}

//根据分类查询
export const fetchPostByCategory = (CategoryID) => {
  return service.post(`/posts/fetchPostByCategory`, { CategoryID })
}
export const fetchTags = () => {
  return service.get(`/posts/fetchTags`)
}

//用户搜索
export const fetchPostByQuery = (Query: string) => {
  // console.log(Query)
  return service.post(`/posts/search`, { Query })
}

//热门文章
export const fetchHotPost = () => {
  // console.log(Query)
  return service.post(`/posts/fetchTopPost`)
}

//删除文章
export const deletePostByPostID = (PostID: number) => {
  // console.log(PostID)
  return service.post(`/posts/deletePost`, { PostID })
}
//查找所有文章
export const fetchAllPost = () => {
  return service.get(`/posts/fetchAllPost`)
}
