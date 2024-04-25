import { Navigate } from 'react-router-dom'
import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
// 高阶组件，用于进行权限控制
export const withAuth = (Component) => {
  const isAuthenticated = getStorage(LOCAL_STORAGE_NAME) ? true : false
  return isAuthenticated ? Component : <Navigate to="/" />
}
