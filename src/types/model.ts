export interface UserType {
  UserID?: number
  UserIP?: string
  Username: string
  Nickname?: string
  Password: string
  Email?: string
  Avatar?: string
  RegistrationTime?: Date
  Birthday?: Date
  Age?: number
  PhoneNumber?: string
  Admin: boolean
}

export interface PostType {
  PostID: number
  PostDate: Date
  UserID: number
  Title: string
  Content: string
  Likes: number
  Replies: number
  Views: number
}

export interface CommentType {
  CommentID: number
  CommentDate: Date
  Likes: number
  UserID: number
  PostID: number
  ParentCommentID: number | null
  Content: string
  createdAt?: number
  Username?: string
}

export interface CategoryType {
  CategoryID: number
  CategoryName: string
  CategoryAlias: string
  CategoryDescription: string
  ParentCategoryID: number | null
}

export interface TagType {
  TagID: number
  TagName: string
  TagAlias: string
  TagDescription: string
}

export interface PostCategoryType {
  PostID: number
  CategoryID: number
}

export interface PostTagType {
  PostID: number
  TagID: number
}

export interface NotificationType {
  NotificationID: number
  TargetType: 'Post' | 'Comment'
  TargetID: number
  Content: string
  IsRead: boolean
  User?: UserType
  createAt: string
}
