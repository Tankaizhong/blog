import React from 'react'
import { Card, Tag, Typography } from 'antd'
import '@/styles/post-preview.less'
import { EyeOutlined, LikeOutlined } from '@ant-design/icons'
import { PostTag as TagModel, TagModal } from '@/types/model'

const { Meta } = Card
const { Text } = Typography

const PostPreview = (data) => {
  // console.log(data);
  const { Title, author, Views, Likes, Content, Tags } = data.post
  // console.log(Tags, Content)

  const truncateContent = (content) => {
    const maxLength = 34 // 设置最大长度
    return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content
  }
  const handleClick = () => {
    // console.log()
    // console.log("click")
    window.open(`/post/${data.post.PostID}`, '_blank')
  }

  return (
    <Card className="post-preview" hoverable onClick={(e) => handleClick(e)}>
      <Meta
        title={<h3 style={{ color: '#000' }}>{Title}</h3>}
        description={
          <div className="post-info">
            <div className="post-content">
              <Text type="secondary">{truncateContent(Content)}</Text>
            </div>
            <div className="post-meta">
              <Text type="secondary" className="post-infor">
                <span>作者: {author.Username}</span>
                <EyeOutlined /> {Views} | <LikeOutlined /> {Likes}
              </Text>
              <span className="post-tags">
                {Tags.map((tag: TagModal, index) => (
                  <Tag key={index}>{tag.TagName}</Tag>
                ))}
              </span>
            </div>
          </div>
        }
      />
    </Card>
  )
}

export default PostPreview
