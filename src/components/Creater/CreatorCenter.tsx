import React, { useEffect, useState } from 'react'
import { Layout, Typography, Row, Col, Statistic, Button, Table, message, Modal } from 'antd'
import '@/styles/publish-post.less'
import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import { useHistory } from 'react-router-dom'
//使用路由
import { fetchCurrentPostList } from '@/api/user'

import { navigateTo } from '@/utils/router'
import { deletePostByPostID } from '@/api/posts'
import { PostType } from '@/types/model'

const { Content } = Layout
const { Title } = Typography

const PublishPost = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [articles, setArticles] = useState([]) // 假设已发布文章的数据格式为数组

  const fetchUser = async () => {
    try {
      const userData = await fetchCurrentPostList() // 调用获取用户文章列表的 API 函数
      const articlesWithKeys = userData.data.map((article, index) => ({
        ...article,
        key: article.PostID.toString(), // 使用 PostID 作为 key
      }))
      setArticles(articlesWithKeys) // 将获取到的文章列表数据设置到状态中
      const stats = calculatePostStats(articlesWithKeys)
      setStats(stats)
    } catch (error) {
      console.error('获取用户文章列表失败', error)
    }
  }
  // useTokenCheck();
  useEffect(() => {
    // 在组件加载时调用获取用户文章列表的函数
    fetchUser()
      .then(() => {
        console.log('用户文章列表获取成功')
      })
      .catch((error) => {
        console.error('获取用户文章列表失败', error)
      })
  }, []) // 传入空数组作为第二个参数，表示只在组件加载时执行一次
  const [deleting, setDeleting] = useState(false)
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
  // 删除文章
  const handleConfirmDelete = async (post) => {
    // 显示加载状态
    setDeleting(true)
    console.log(post)
    // 根据文章 ID 删除文章，并更新已发布文章列表
    await deletePostByPostID(post.PostID)
      .then(() => {
        message.success('文章删除成功!')
        setArticles(articles.filter((article) => article.PostID !== post.PostID))
        setConfirmDeleteVisible(false)
      })
      .catch((error) => {
        // 删除失败后的操作
        // 隐藏确认对话框
        setConfirmDeleteVisible(false)
        // 取消加载状态
        setDeleting(false)
        // 处理删除失败的情况
        console.error('删除失败:', error)
      })
  }

  const handleCancelDelete = () => {
    // 隐藏确认对话框
    setConfirmDeleteVisible(false)
  }
  // 处理点击删除按钮事件
  const handleDeleteClick = () => {
    setConfirmDeleteVisible(true)
  }
  const columns = [
    {
      title: '标题',
      dataIndex: 'Title',
      key: 'Title',
      align: 'center', // 文本居中对齐
    },
    {
      title: '阅读数',
      dataIndex: 'Views',
      key: 'Views',
      align: 'center', // 文本居中对齐
    },
    {
      title: '点赞数',
      dataIndex: 'Likes',
      key: 'Likes',
      align: 'center', // 文本居中对齐
    },
    {
      title: '评论数',
      dataIndex: 'Replies',
      key: 'Replies',
      align: 'center', // 文本居中对齐
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center', // 文本居中对齐
      render: (text, record: PostType) => (
        <>
          <Button type="link" onClick={handleDeleteClick}>
            删除
          </Button>
          <Modal
            title="确认删除"
            open={confirmDeleteVisible}
            onOk={() => handleConfirmDelete(record)}
            onCancel={handleCancelDelete}
            confirmLoading={deleting}
            okText="确认" // 修改确认按钮文字为中文
            cancelText="取消" // 修改取消按钮文字为中文
          >
            确定要删除吗？
          </Modal>
        </>
      ),
    },
  ]

  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
  })

  const calculatePostStats = (posts) => {
    let totalPosts = posts.length
    let totalViews = 0
    let totalLikes = 0
    let totalComments = 0
    posts.forEach((post) => {
      totalViews += post.Views || 0
      totalLikes += post.Likes || 0
      // 假设每篇文章的评论数存储在 "Replies" 属性中
      totalComments += post.Replies || 0
    })
    return {
      totalPosts,
      totalViews,
      totalLikes,
      totalComments,
    }
  }

  return (
    <Layout className="publish-post-layout">
      <Content className="publish-post-content">
        <Title level={4}>发布文章</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Statistic title="文章展示数" value={stats.totalPosts} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic title="文章阅读数" value={stats.totalViews} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic title="文章点赞数" value={stats.totalLikes} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic title="文章评论数" value={stats.totalComments} />
          </Col>
        </Row>
        {/* 这里放置发布文章的表单或者其他内容 */}
        {/*<Button type="primary" onClick={handleSubmit}>发布文章</Button>*/}
        <Table dataSource={articles} columns={columns} pagination={false} />
      </Content>
    </Layout>
  )
}

export default PublishPost
