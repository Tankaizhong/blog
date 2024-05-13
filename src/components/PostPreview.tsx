import React from 'react'
import { Tag } from 'antd'
import '@/styles/post-preview.less'
import { EyeOutlined, LikeOutlined } from '@ant-design/icons'
import { TagType, UserType } from '@/types/model'

import { TextStyle } from '@/styles/font'

const PostPreview = (data) => {
  const { Title, User, Views, Likes, Tags, Summary }: { User: UserType } = data.post
  const handleClick = () => {
    window.location.href = `/post/${data.post.PostID}`
  }

  return (
    <div className="post-preview" onClick={() => handleClick()}>
      <span className="post-title">{Title}</span>
      <div className="post-content" style={{ ...TextStyle, fontWeight: '400' }}>
        {Summary}
      </div>
      <div className="post-meta">
        <div className="post-infor">
          <span>作者: {User?.Nickname}</span>
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
