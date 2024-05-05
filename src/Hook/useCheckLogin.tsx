import { useEffect } from 'react'
import { getToken } from '@/utils/token'
import { LOCAL_STORAGE_NAME } from '@/config'

// 自定义 Hook：用于检查用户是否已登录
const useCheckLogin = () => {
  // 当用户已登录时返回 true，否则返回 false
  const isLoggedIn = !!getToken()

  // useEffect 用于检查用户登录状态
  useEffect(() => {
    if (!isLoggedIn) {
      // 在此可以添加一些处理逻辑，例如跳转到登录页面
      console.log('用户未登录')
    }
  }, [isLoggedIn]) // 当用户登录状态发生变化时重新运行效果

  // 返回用户登录状态
  return isLoggedIn
}

export default useCheckLogin
