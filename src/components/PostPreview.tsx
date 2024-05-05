import React from 'react'
import { Card, Flex, Space, Tag, Typography } from 'antd'
import '@/styles/post-preview.less'
import { EyeOutlined, LikeOutlined } from '@ant-design/icons'
import { TagType, UserType } from '@/types/model'
import ReactMarkdown from 'react-markdown'
import { TextStyle } from '@/styles/font'

const { Meta } = Card
const { Text } = Typography

const PostPreview = (data) => {
  const { Title, User, Views, Likes, Content, Tags }: { User: UserType } = data.post
  const truncateContent = (content) => {
    const maxLength = 34 // 设置最大长度
    return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content
  }
  const handleClick = () => {
    window.open(`/post/${data.post.PostID}`, '_blank')
  }

  return (
    <div className="post-preview" onClick={(e) => handleClick(e)}>
      <span className="post-title">{Title}</span>
      <div className="post-content" style={{ ...TextStyle, fontWeight: '400' }}>
        <ReactMarkdown>{truncateContent(Content)}</ReactMarkdown>
      </div>
      <div className="post-meta">
        <div className="post-infor">
          <span>作者: {User.Nickname}</span>
          <span>|</span>
          <span>
            <EyeOutlined /> {Views}
          </span>
          <span>
            <LikeOutlined /> {Likes.length}
          </span>
        </div>
        <span className="post-tags">
          {Tags.map((tag: TagType, index) => (
            <Tag style={TextStyle} key={index}>
              {tag.TagName}
            </Tag>
          ))}
        </span>
      </div>
    </div>
  )
}

export default PostPreview
