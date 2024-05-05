import axios from 'axios'
import { API_BASE_URL } from '@/config'
import { message } from 'antd'
import { getToken } from '@/utils/token'

const token = getToken()

// create an axios instance
const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // request timeout
})

let timer
const routesRequiringToken = [
  '/user/postList',
  '/user/updateUserInfor',
  '/user/uploadAvatar',
  '/posts/publish',
  '/posts/update',
  '/posts/like',
  '/posts/find',
  '/posts/deletePost',
  '/like',
]
// 自定义的匹配函数，用于模糊匹配路径
const fuzzyMatch = (path, pattern) => {
  // 使用正则表达式来进行模糊匹配
  const regex = new RegExp(pattern.replace(/\//g, '\\/').replace(/\*/g, '.*'))
  return regex.test(path)
}

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    // 检查是否需要 token 的路径模糊匹配
    const needsToken = routesRequiringToken.some((pattern) => fuzzyMatch(config.url, pattern))
    // if (needsToken && !token) {
    //     // 这里你可以根据实际需求选择抛出错误或者重定向到登录页面
    //     // 抛出错误
    //     message.error('请先登录');
    //     return Promise.reject('请先登录');
    //     // 或者重定向到登录页面
    //     // window.location.href = '/login';
    // }

    if (token) {
      config.headers['Authorization'] = token // 如果需要 token 并且存在 token，则在请求头中添加 Authorization 字段
    }
    return config
  },
  (error) => {
    message.error('bed request')
    Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // console.log(response.data)
    return response.data
  },
  (err) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (err.response) {
        const { status, data } = err.response
        switch (status) {
          case 401:
            message.error((data && data.message) || '登录信息过期或未授权，请重新登录！')
            break

          default:
            message.error(data.message || `连接错误 ${status}！`)
            break
        }
      } else {
        console.log(err.message)
        // message.error(err.message)
      }
    }, 200) // 200 毫秒内重复报错则只提示一次！

    return Promise.reject(err)
  }
)

export default service
