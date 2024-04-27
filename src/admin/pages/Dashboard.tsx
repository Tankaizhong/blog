import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Flex } from 'antd'
import { fetchBlogStats } from '@/admin/api/admin'
import CategoryArticleStatistics from '@/admin/component/CategoryArticleStatistics'
import TopTenVisitedArticles from '@/admin/component/TopTenVisitedArticles'

const Dashboard = () => {
  const [blogStats, setBlogStats] = useState(null)

  useEffect(() => {
    // 在组件加载时获取博客统计信息
    fetchBlogStats().then((data) => {
      // console.log(data)
      setBlogStats(data)
    })
  }, [])

  return (
    <div>
      <h1>后台首页</h1>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="文章数">{blogStats && blogStats.postCount}</Card>
        </Col>
        <Col span={6}>
          <Card title="浏览量">{blogStats && blogStats.totalViews}</Card>
        </Col>
        <Col span={6}>
          <Card title="用户数">{blogStats && blogStats.userCount}</Card>
        </Col>
        <Col span={6}>
          <Card title="评论数">{blogStats && blogStats.commentCount}</Card>
        </Col>
      </Row>
      <Flex gap="middle" horizontal>
        <CategoryArticleStatistics />
        <TopTenVisitedArticles />
      </Flex>
    </div>
  )
}

export default Dashboard
