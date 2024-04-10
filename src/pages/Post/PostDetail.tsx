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
import { addLike, addView, fetchPostByPostID } from '@/api/posts'
import { useParams } from 'react-router-dom'
import { Post } from '@/types/model'

const { Title, Text } = Typography
const { TextArea } = Input

const PostDetail = () => {
  const [post, setPost] = useState<Post | null>(null) // 文章详情
  const [comments, setComments] = useState([]) // 文章评论
  const [commentContent, setCommentContent] = useState('') // 评论内容
  const { id } = useParams() // 使用 useParams 钩子获取 URL 参数 postId

  useEffect(() => {
    fetchPostByPostID(id)
      .then((res: any) => {
        // console.log(res)
        setPost(res)
        return addView(id) as Promise<any> // 这里进行类型断言
      })
      .then((res) => {
        console.log(1)
      })
    // 设置获取到的文章详情数据到 post 状态中
    // setPost(responseData);

    // 在这里调用后端接口获取文章评论数据
    // 示例：fetchPostComments();
    // 设置获取到的文章评论数据到 comments 状态中
    // setComments(responseData);
  }, [])

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
    // 在这里调用后端接口以增加点赞
    // 示例：调用一个名为 addLike 的 API 接口，传递文章 ID，然后更新点赞数量
    addLike(id)
      .then((response) => {
        // 更新文章的点赞数量
        setPost((prevPost: Post) => ({
          ...prevPost,
          Likes: prevPost.Likes + 1,
        }))
      })
      .catch((error) => {
        console.error('点赞失败', error)
        // 处理点赞失败的情况
      })
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
              <Statistic title="点赞数" value={post.Likes} prefix={<LikeOutlined />} />
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
