import React, { useEffect, useState } from 'react'
import { Divider, Flex, Badge } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { addView, fetchPostByPostID } from '@/api/posts'
import { addPostLike, removePostLike, fetchLikeStatus } from '@/api/like'
import { useParams } from 'react-router-dom'
import { PostType, UserType } from '@/types/model'
import LikeButton from '@/components/LikeButton'
import '@/styles/post-detail.less'
import ReactMarkdown from 'react-markdown'
import { checkToken } from '@/utils/token'
import moment from 'moment'
import PostAuthor from '@/pages/Post/PostAuthor'
import PostComment from '@/pages/Post/PostComment'

const PostDetail = () => {
  const [post, setPost] = useState<PostType | null>() // 文章详情

  const { PostID } = useParams() // 使用 useParams 钩子获取 URL 参数 postId
  const [liked, setLiked] = useState(false)
  const [viewed, setViewed] = useState(false) // 添加一个状态来跟踪是否已经发送了浏览量增加的请求
  const [isLoggedIn, setIsLoggedIn] = useState(checkToken) // 添加登录状态
  //作者信息
  const [author, setAuthor] = useState<UserType>(null)

  useEffect(() => {
    if (!viewed) {
      // 如果尚未发送过浏览量增加的请求，则发送请求
      fetchPostByPostID(PostID)
        .then((res: any) => {
          setPost(res)
          setAuthor(res.author as UserType)
          return addView(PostID) as Promise<any>
        })
        .then((res) => {})
      setViewed(true) // 标记为已发送浏览量增加的请求
    }

    if (isLoggedIn) {
      //登陆才检查
      fetchLikeStatus(PostID).then((res: any) => {
        setLiked(res.liked)
      })
    }
  }, [PostID, liked, viewed]) // 在依赖项中加入 viewed

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
    <div className="post-detail-content">
      <Flex gap={1} horizontal={true}>
        {post && (
          <div className="like-post-button">
            <div className="like-button">
              <Badge count={post.Likes} style={{ backgroundColor: '#52c41a' }}>
                {' '}
                {/* 使用 Badge 显示点赞数 */}
                <div style={{ transform: 'scale(2)' }} onClick={handleLikeClick}>
                  <LikeButton handleLiked={setLiked} liked={liked} />
                </div>
              </Badge>
            </div>
          </div>
        )}
        <div className="post-detail-content">
          {post && (
            <div className="post-layout-content">
              <h1 className="post-title" level={2}>
                {post.Title}
              </h1>
              {author ? (
                <div className="post-author-infor">
                  {/* 在此处渲染用户信息 */}
                  <span> {author.Nickname}</span>
                  <span>{moment(post.PostDate).format('YYYY-MM-DD')}</span>
                  <EyeOutlined /> {post.Views}
                </div>
              ) : (
                <p>加载中...</p>
              )}
              <Divider />
              {/*内容*/}
              <div className="post-detail">
                <ReactMarkdown>{post.Content}</ReactMarkdown>
              </div>
            </div>
          )}
          {/*<评论区/>*/}
          <PostComment PostID={PostID} isLoggedIn={isLoggedIn} />
        </div>
        {author && <PostAuthor author={author} />}
      </Flex>
    </div>
  )
}

export default PostDetail
