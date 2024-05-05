import service from '@/utils/axios'
import { UserType } from '@/types/model'

export const fetchNotification = (UserInfo: UserType) => {
  return service.post(`/notifications/fetchNotification`, { TargetID: UserInfo.UserID })
  // return service.post(`/notifications/fetchNotification`, { TargetID:UserInfo.UserID })
}

export const markNotificationRead = (CommentID) => {
  return service.post(`notifications/${CommentID}/markAsRead`)
}
