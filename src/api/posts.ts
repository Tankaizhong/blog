//生成fetchPostList的api
import axios from 'axios'
import service from '@/utils/axios'
export const fetchPostList = () => {
  return service.get('/posts')
}
