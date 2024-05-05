import { Navigate } from 'react-router-dom'
import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import { UserType } from '@/types/model'
// 高阶组件，用于进行权限控制
export const withAuth = (Component) => {
  const isAuthenticated = getStorage(LOCAL_STORAGE_NAME) ? true : false
  return isAuthenticated ? Component : <Navigate to="/" />
}
export const withAdminAuth = (Component) => {
  const userInfo: UserType = getStorage(LOCAL_STORAGE_NAME)
  return userInfo?.Admin ? Component : <Navigate to="/" />
}
