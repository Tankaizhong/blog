import React, { useEffect } from 'react'
import { Layout, Typography, Row, Col, Statistic } from 'antd'
import '@/styles/publish-post.less'
import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import { useHistory } from 'react-router-dom'
//使用路由
import { useRouter } from '@/utils/router'

const { Content } = Layout
const { Title } = Typography

const PublishPost = () => {
  // 模拟数据
  const articleViews = 1000
  const articleLikes = 500
  const articleComments = 200
  const { navigateTo } = useRouter()

  useEffect(() => {
    // 检查本地 token，这里假设使用 localStorage 存储
    const token = getStorage(LOCAL_STORAGE_NAME)

    // 如果没有 token，跳转到首页
    if (!token) {
      navigateTo('/')
    }
  }, [history])

  return (
    <Layout className="publish-post-layout">
      <Content className="publish-post-content">
        <Title level={4}>发布文章</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Statistic title="文章展示数" value={articleViews} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic title="文章阅读数" value={articleViews} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic title="文章点赞数" value={articleLikes} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic title="文章评论数" value={articleComments} />
          </Col>
        </Row>
        {/* 这里放置发布文章的表单或者其他内容 */}
      </Content>
    </Layout>
  )
}

export default PublishPost
