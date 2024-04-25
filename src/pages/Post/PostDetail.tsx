import React, { useEffect, useState } from 'react'
import {
  Card,
  Divider,
  Typography,
  List,
  Avatar,
  Form,
  Button,
  Input,
  Space,
  Statistic,
} from 'antd'
import { LikeOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons'
import { addView, fetchPostByPostID } from '@/api/posts'
import { addPostLike, removePostLike, fetchLikeStatus } from '@/api/like'
import { useParams } from 'react-router-dom'
import { CommentType, PostType, UserType } from '@/types/model'
import LikeButton from '@/components/LikeButton'
import { getStorage } from '@/utils/storage'
import { LOCAL_STORAGE_NAME } from '@/config'
import { UserValue } from '@/types'
import { addComments, getCommentsByPostID } from '@/api/comment'
import { AxiosResponse } from 'axios'
import UserComment from '@/components/UserComment'
import '@/styles/post-detail.less'

const { Title, Text } = Typography
const { TextArea } = Input
import ReactMarkdown from 'react-markdown'
import WebSocketClient from '@/utils/webSocket'

const PostDetail = () => {
  const [post, setPost] = useState<PostType | null>(null) // 文章详情
  const [comments, setComments] = useState<AxiosResponse<CommentType>>() // 文章评论
  const [commentContent, setCommentContent] = useState('') // 评论内容
  const { id: PostID } = useParams() // 使用 useParams 钩子获取 URL 参数 postId
  const [liked, setLiked] = useState(false)
  const [viewed, setViewed] = useState(false) // 添加一个状态来跟踪是否已经发送了浏览量增加的请求
  useEffect(() => {
    if (!viewed) {
      // 如果尚未发送过浏览量增加的请求，则发送请求
      fetchPostByPostID(PostID)
        .then((res: any) => {
          setPost(res)
          return addView(PostID) as Promise<any>
        })
        .then((res) => {})
      setViewed(true) // 标记为已发送浏览量增加的请求
      // console.log(PostID)
      getCommentsByPostID(PostID).then((res) => {
        const processedComments = res?.map((comment) => ({
          ...comment,
          Likes: comment.Likes.length, // 将Likes数组的长度作为点赞数量
          // User: comment.User.Username // 直接显示User对象中的Username字段
        }))
        // console.log(res)
        setComments(res as any)
      })
    }
    fetchLikeStatus(PostID).then((res: any) => {
      // console.log(res.liked, '1111111111111');
      setLiked(res.liked)
    })
  }, [PostID, liked, viewed]) // 在依赖项中加入 viewed
  const handleCommentChange = (e) => {
    setCommentContent(e.target.value)
  }

  //提交评论
  const handleSubmitComment = async () => {
    // 提交评论
    const user = getStorage(LOCAL_STORAGE_NAME) as UserType
    // console.log(commentContent, post?.PostID, user.UserID);
    // 获取当前时间
    const currentDate = new Date()
    // 构建评论对象
    const commentData: CommentType = {
      CommentDate: currentDate.toISOString(), // 使用 ISO 格式的日期字符串
      Content: commentContent, // 从组件状态中获取评论内容
      Likes: 0, // 默认点赞数为 0
      ParentCommentID: undefined, // 暂时不处理父评论
      PostID: post?.PostID || 0, // 如果存在 post 对象，则获取其 PostID，否则默认为 0
      UserID: user?.UserID || 0, // 如果存在 currentUser 对象，则获取其 UserID，否则默认为 0
      Username: user?.Username || '', // 如果存在 currentUser 对象，则获取其 Username，否则默认为空字符串
    } as CommentType

    await addComments(commentData)
      .then((newComment) => {
        //redis

        // 添加新评论到评论列表
        // console.log()
        setComments((prevComments) => [...prevComments, { ...newComment, User: user }])
        // 清空评论内容
        // console.log(newComment)
        setCommentContent('')
      })
      .catch((error) => {
        console.error('提交评论失败:', error)
        // 处理提交评论失败的情况
      })
    //清空
    setCommentContent('')
  }

  // console.log(post)
  //点赞
  const handleLikeClick = () => {
    if (liked) {
      removePostLike(PostID)
        .then(() => {
          setPost((prevPost: PostType) => ({
            ...prevPost,
            Likes: prevPost.Likes - 1,
          }))
          setLiked(false) // 取消点赞后更新 liked 状态
        })
        .catch((error) => {
          console.error('取消点赞失败', error)
        })
    } else {
      addPostLike(PostID)
        .then((response) => {
          // 更新文章的点赞数量
          setPost((prevPost: PostType) => ({
            ...prevPost,
            Likes: prevPost.Likes + 1,
          }))
          setLiked(true) // 点赞成功后更新 liked 状态
        })
        .catch((error) => {
          console.error('点赞失败', error)
          // 处理点赞失败的情况
        })
    }
  }
  return (
    <div>
      {post && (
        <Card>
          <Title level={2}>{post.Title}</Title>
          <ReactMarkdown>{post.Content}</ReactMarkdown>
          <Divider />
          <Space>
            <div onClick={handleLikeClick}>
              <Statistic
                title="点赞数"
                value={post.Likes}
                prefix={<LikeButton handleLiked={setLiked} liked={liked} />}
              />
            </div>
            <Statistic title="浏览数" value={post.Views} prefix={<EyeOutlined />} />
          </Space>
        </Card>
      )}
      <Divider />
      <Card>
        <Title level={3}>评论</Title>
        {comments && comments.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(comment: CommentType) => (
              <li>
                <UserComment comment={comment} />
              </li>
            )}
          />
        ) : (
          <div className="empty-comment-message">暂无评论</div>
        )}
        <Form.Item>
          <TextArea rows={4} value={commentContent} onChange={handleCommentChange} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={handleSubmitComment} type="primary">
            发表评论
          </Button>
        </Form.Item>
      </Card>
    </div>
  )
}

export default PostDetail
