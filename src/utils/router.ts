// routerUtils.js
import { useLocation } from 'react-router-dom'

// 导航到指定路径
export const navigateTo = (path) => {
  window.location.href = path
}

// 获取 URL 参数
export const getUrlParams = () => {
  const location = useLocation()
  return new URLSearchParams(location.search)
}

// 获取指定参数的值
export const getUrlParam = (paramName) => {
  const params = getUrlParams()
  return params.get(paramName)
}
