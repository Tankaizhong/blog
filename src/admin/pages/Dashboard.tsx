import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Flex, Divider } from 'antd'
import { fetchBlogStats } from '@/admin/api/admin'
import CategoryArticleStatistics from '@/admin/component/CategoryArticleStatistics'
import TopTenVisitedArticles from '@/admin/component/TopTenVisitedArticles'
import '../style/Dashboard.less'
import StatsRow from '@/admin/component/HighlightedStatCard'

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
    <div className="dashboard-content">
      {blogStats ? <StatsRow stats={blogStats} /> : <p>Loading......</p>}
      {/*分割线*/}
      <Flex gap="middle" direction="horizontal">
        <CategoryArticleStatistics />
        <TopTenVisitedArticles />
      </Flex>
    </div>
  )
}

export default Dashboard
