// CommentSection.jsx

import React, { useEffect, useState } from 'react'
import { Form, Button, Divider, Typography, List, Input } from 'antd'
import UserComment from '@/components/UserComment'
import { CommentType, UserType } from '@/types/model'
import { addComments, getCommentsByPostID } from '@/api/comment'
import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import LoginModal from '@/components/LoginModal'

const { Title, Text } = Typography
const { TextArea } = Input
const PostComment = ({ PostID, isLoggedIn }) => {
  const [commentContent, setCommentContent] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    // 获取评论列表
    fetchComments()
  }, [PostID])
  const fetchComments = () => {
    getCommentsByPostID(PostID)
      .then((res) => {
        const processedComments = res?.map((comment) => ({
          ...comment,
          Likes: comment.Likes.length,
        }))
        setComments(processedComments || [])
      })
      .catch((error) => {
        console.error('获取评论失败:', error)
      })
  }

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value)
  }

  const handleSubmitComment = () => {
    const user = getStorage(LOCAL_STORAGE_NAME) as UserType
    const currentDate = new Date()
    const commentData: {
      Username: string
      Content: string
      UserID: number
      ParentCommentID: undefined
      Likes: number
      CommentDate: string
      PostID: any
      CommentID: number
    } = {
      CommentDate: currentDate.toISOString(),
      Content: commentContent,
      Likes: 0,
      ParentCommentID: undefined,
      PostID: PostID,
      CommentID: 0,
      UserID: user?.UserID || 0,
      Username: user?.Username || '',
    }

    addComments(commentData as CommentType)
      .then((newComment) => {
        setComments((prevComments) => [{ ...newComment, User: user }, ...prevComments])
        setCommentContent('')
      })
      .catch((error) => {
        console.error('提交评论失败:', error)
      })
  }

  //登陆 / 注册
  const handleCancel = () => {
    setVisible(false)
  }
  const [visible, setVisible] = useState(false)
  const handleLogin = () => {
    setVisible(true)
  }
  console.log(isLoggedIn)
  return (
    <div>
      <Divider />
      <Form.Item>
        <TextArea
          showCount
          rows={4}
          maxLength={100}
          value={commentContent}
          onChange={handleCommentChange}
          style={{ height: 120, resize: 'none' }}
        />
      </Form.Item>
      <Form.Item>
        {isLoggedIn ? (
          <Button type="primary" onClick={handleSubmitComment}>
            提交评论
          </Button>
        ) : (
          <Button danger onClick={handleLogin}>
            请登录后再评论
          </Button>
        )}
      </Form.Item>
      <Title level={3}>评论 {comments && comments.length}</Title>
      {comments && comments.length > 0 ? (
        <List
          itemLayout="horizontal"
          dataSource={comments.sort((a, b) => b.Likes - a.Likes)}
          renderItem={(comment: CommentType) => (
            <li>
              <UserComment comment={comment} />
            </li>
          )}
        />
      ) : (
        <div className="empty-comment-message">暂无评论</div>
      )}

      {/*  登陆*/}
      <LoginModal open={visible} onCancel={handleCancel} />
    </div>
  )
}

export default PostComment
