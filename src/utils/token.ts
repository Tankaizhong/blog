import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'

export const getToken = () => {
  let token = ''
  const userInfo = getStorage(LOCAL_STORAGE_NAME)?.token
  if (userInfo) {
    token = userInfo
  }
  return token
}

//检查是否存在token
export const checkToken = () => {
  const token = getToken()
  return token ? true : false
}
