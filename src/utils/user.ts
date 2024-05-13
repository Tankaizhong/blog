//更新本地用户
import { UserType } from '@/types/model'
import { getStorage, saveStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import { fetchUsers } from '@/admin/api/admin'
import moment from 'moment'
//更新本地用户
export const updateLocalUser = (user: UserType) => {
  const oldUser: UserType = getStorage(LOCAL_STORAGE_NAME)
  console.log('oldUser', user, oldUser)
  //将新旧信息合并
  const newUser = {
    ...getStorage(LOCAL_STORAGE_NAME),
    ...user,
  }
  saveStorage(LOCAL_STORAGE_NAME, newUser)
}
//加工用户列表数据
export const fetchAndSetUsers = () => {
  return fetchUsers() // 这里应该是调用后台接口的函数，这里使用 fetchUsers() 只是示例
    .then((response) => {
      const usersWithKeys = response.map((user) => ({
        ...user,
        key: user.UserID,
        LastLoginTime: user.LastLoginTime
          ? moment(user.LastLoginTime).format('YYYY 年 MM 月 DD 日 HH:mm')
          : '——————',
      }))
      return usersWithKeys
    })
    .catch((error) => {
      console.error('Error fetching users:', error)
      throw error
    })
}

//判断用户是否是第一次登陆
export const isFirstTimeUser = () => {
  // 检查本地存储中是否已经存储了用户登录信息
  const userInfo: UserType = getStorage(LOCAL_STORAGE_NAME)
  if (!userInfo) {
    return false
  }
  // 如果用户登录信息不存在，则表示是第一次登录
  if (!userInfo.Email) {
    return true
  } else {
    return false
  }
}
