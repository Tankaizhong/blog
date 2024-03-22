//生成fetchPostList的api

import service from '@/utils/axios'
export const fetchPostList = () => {
  return service.get('/posts')
}
export const fetchCategoriesList = ()=>{
  return service.get('/user/categoriesList')
}