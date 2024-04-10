import React from 'react'
import { List, Avatar, Comment } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { CommentType } from '@/types/model'

interface UserCommentsProps {
  comments: CommentType[]
}

const UserComments: React.FC<UserCommentsProps> = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(comment: CommentType) => (
        <li>
          <Comment
            author={comment.Username}
            avatar={<Avatar icon={<UserOutlined />} />}
            content={comment.Content}
            datetime={comment.createdAt}
          />
        </li>
      )}
    />
  )
}

export default UserComments
