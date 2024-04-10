import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'

export function getToken() {
  let token = ''
  const userInfo = getStorage(LOCAL_STORAGE_NAME)
  if (userInfo) {
    token = userInfo
  }

  return token
}
