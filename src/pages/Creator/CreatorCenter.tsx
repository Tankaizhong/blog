import React, { useEffect, useState } from 'react'
import {
  Layout,
  Typography,
  Row,
  Col,
  Statistic,
  Button,
  Table,
  message,
  Modal,
  Divider,
} from 'antd'
import '@/styles/publish-post.less'
import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import { useHistory } from 'react-router-dom'
//使用路由
import { fetchCurrentPostList } from '@/api/user'
import { navigateTo } from '@/utils/router'
import { deletePostByPostID } from '@/api/posts'
import { PostType, UserType } from '@/types/model'
import { calculatePostStats } from '@/utils/dataProcess'
import CountUp from 'react-countup'
const { Content } = Layout
const { Title } = Typography

const PublishPost = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const userInfo = getStorage(LOCAL_STORAGE_NAME) as UserType
  const [Post, setPost] = useState([]) // 假设已发布文章的数据格式为数组

  const fetchUser = async () => {
    try {
      const userData = await fetchCurrentPostList(userInfo.UserID) // 调用获取用户文章列表的 API 函数
      // console.log(userData.data)
      const articlesWithKeys = userData.data.map((post, index) => ({
        ...post,
        key: post.PostID.toString(), // 使用 PostID 作为 key
        Likes: post.Likes.length, // 将 Likes 数组的长度作为显示值
        Comments: post.Comments.length, // 将 Comments 数组的长度作为显示值
      }))
      setPost(articlesWithKeys) // 将获取到的文章列表数据设置到状态中
      const stats = calculatePostStats(articlesWithKeys)
      console.log(stats)
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
        // console.log('用户文章列表获取成功')
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
    // 根据文章 ID 删除文章，并更新已发布文章列表
    await deletePostByPostID(post.PostID)
      .then(() => {
        message.success('文章删除成功!')
        setPost(Post.filter((article) => article.PostID !== post.PostID))
        setConfirmDeleteVisible(false)
      })
      .catch((error) => {
        setConfirmDeleteVisible(false)
        setDeleting(false)
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
      dataIndex: 'Comments',
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

  const formatter = (value) => <CountUp end={value as number} separator="," />

  return (
    <Layout className="publish-post-layout">
      <Content className="publish-post-content creator-content">
        <span>数据概况</span>
        {/*分割线*/}
        <Divider />
        <Row className="statistic-show" gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="文章展示数"
              formatter={formatter}
              value={stats.totalPosts}
              align="center"
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic title="文章阅读数" value={stats.totalViews} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic title="文章点赞数" value={stats.totalLikes} />
          </Col>
          <Col>
            <Statistic title="文章评论数" value={stats.totalComments} />
          </Col>
        </Row>
      </Content>

      <div className="table-content creator-content">
        <Table dataSource={Post} columns={columns} pagination={false} />
      </div>
    </Layout>
  )
}

export default PublishPost
