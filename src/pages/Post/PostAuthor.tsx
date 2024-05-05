import React, { useState, useEffect } from 'react'
import { Avatar, Typography, Divider, Statistic, Flex, Space } from 'antd'
import { fetchCurrentPostList } from '@/api/user' // 导入获取用户文章和总阅读数的 API 函数
import '@/styles/post-author.less'
import { calculatePostStats } from '@/utils/dataProcess'

const { Title, Text } = Typography

const PostAuthor = ({ author }) => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
  })

  const fetchUserData = async () => {
    try {
      const articles = await fetchCurrentPostList(author.UserID) // 调用获取用户文章的 API 函数
      const stats = calculatePostStats(articles.data)
      setStats(stats)
    } catch (error) {
      console.error('获取用户文章数失败', error)
    }
  }

  // 使用 useEffect 钩子获取用户文章数
  useEffect(() => {
    fetchUserData().then((res) => {
      console.log('获取作者文章数成功')
    }) // 调用获取用户文章数的函数
  }, [author.UserID]) // 在用户 ID 改变时重新获取文章数

  return (
    <div className="post-detail-sider">
      {/* 用户头像 */}
      <Flex align="center" justify="space-around">
        <Space>
          <div className="author">
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              shape="circle"
              src={author.Avatar}
            />
          </div>
          <div className="post-author">
            {/* 用户昵称 */}
            <p>{author.Nickname}</p>
            {/* 用户邮箱 */}
            <p>Email: {author.Email}</p>
          </div>
        </Space>
      </Flex>
      <Divider />
      <Flex gap="middle" align="start" justify="space-around" horizontal="true">
        {/* 用户文章数 */}
        <Statistic title="文章数" value={stats.totalPosts} />
        {/* 作者文章总阅读数 */}
        <Statistic title="文章总阅读数" value={stats.totalViews} />
      </Flex>
    </div>
  )
}

export default PostAuthor
