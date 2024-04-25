import service from '@/utils/axios'
import { CategoryType } from '@/types/model'

// 添加分类
export const addCategory = (categoryData) => {
  return service.post('/category/addCategory', categoryData)
}

// 删除分类
export const deleteCategory = (categoryId) => {
  return service.post(`/category/deleteCategory/${categoryId}`)
}

// 获取所有分类
export const getAllCategories = () => {
  return service.get('/category/allCategories')
}

// 更新分类
export const updateCategory = (categoryDate: CategoryType) => {
  console.log(categoryDate)
  return service.post(`/category/updateCategory/${categoryDate.CategoryID}`, { categoryDate })
}
