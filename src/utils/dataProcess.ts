//数据处理
import { PostType } from '@/types/model'

export const calculatePostStats = (posts: PostType[]) => {
  let totalPosts = posts.length
  let totalViews = 0
  let totalLikes = 0
  let totalComments = 0
  console.log(posts)
  posts.forEach((post) => {
    totalViews += post.Views || 0
    totalLikes += post.Likes || 0
    // 假设每篇文章的评论数存储在 "Replies" 属性中
    totalComments += post.Comments || 0
  })
  return {
    totalPosts,
    totalViews,
    totalLikes,
    totalComments,
  }
}

//给数据添加id
export const addId = (data: any[]) => {
  return data.map((item, index) => {
    item.id = index
    return item
  })
}
