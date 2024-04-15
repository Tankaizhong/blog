import React, { useEffect, useState } from 'react'
import {
  Card,
  Divider,
  Typography,
  List,
  Avatar,
  Comment,
  Form,
  Button,
  Input,
  Space,
  Statistic,
} from 'antd'
import { LikeOutlined, EyeOutlined, UserOutlined } from '@ant-design/icons'
import { addView, fetchPostByPostID } from '@/api/posts'
import { addLike, removeLike, fetchLikeStatus } from '@/api/like'
import { useParams } from 'react-router-dom'
import { PostModel } from '@/types/model'
import LikeButton from '@/components/LikeButton'

const { Title, Text } = Typography
const { TextArea } = Input

const PostDetail = () => {
  const [post, setPost] = useState<PostModel | null>(null) // 文章详情
  const [comments, setComments] = useState([]) // 文章评论
  const [commentContent, setCommentContent] = useState('') // 评论内容
  const { id: PostID } = useParams() // 使用 useParams 钩子获取 URL 参数 postId
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    fetchPostByPostID(PostID)
      .then((res: any) => {
        // console.log(res)
        setPost(res)
        return addView(PostID) as Promise<any> // 这里进行类型断言
      })
      .then((res) => {})
    // console.log(id)
    fetchLikeStatus(PostID).then((res) => {
      // console.log(res.liked,'1111111111111')
      setLiked(res.liked)
    })
  }, [PostID])

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value)
  }

  const handleSubmitComment = () => {
    // 在这里调用后端接口提交评论数据
    // 示例：submitComment();
    // 提交评论成功后，刷新评论列表或重新获取评论数据并设置到 comments 状态中
    // setComments([...comments, newComment]);
    console.log(commentContent)
    setCommentContent('') // 清空评论内容
  }

  //点赞
  const handleLikeClick = () => {
    if (liked) {
      removeLike(PostID)
        .then(() => {
          setPost((prevPost: PostModel) => ({
            ...prevPost,
            Likes: prevPost.Likes - 1,
          }))
          setLiked(false)
        })
        .catch((error) => {
          console.error('取消点赞失败', error)
        })
    } else {
      addLike(PostID)
        .then((response) => {
          // 更新文章的点赞数量
          setPost((prevPost: PostModel) => ({
            ...prevPost,
            Likes: prevPost.Likes + 1,
          }))
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
          <Text>{post.Content}</Text>
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
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(comment) => (
            <li>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={comment.author}
                description={comment.content}
              />
            </li>
          )}
        />
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
