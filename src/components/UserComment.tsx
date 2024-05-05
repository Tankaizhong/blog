import React, { useEffect, useState } from 'react'
import { Avatar, Typography, Space, Tooltip, Flex, message } from 'antd'
import {
  EllipsisOutlined,
  ExclamationCircleOutlined,
  LikeOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons'
import '@/styles/usercomment.less'
import { UserType } from '@/types/model'
import LikeButton from '@/components/LikeButton'
import { addCommentLike, checkCommentLike, commentLikeCount, removeCommentLike } from '@/api/like'
import moment from 'moment'

import { getToken } from '@/utils/token'

const { Text } = Typography
let count = 0
const UserComment = ({ comment }) => {
  const { User, Content, CommentDate, CommentID, Likes }: { User: UserType } = comment
  const [liked, setLiked] = useState(false) // 定义 liked 状态和修改 liked 状态的函数
  const [likeCount, setLikeCount] = useState(0) // 定义点赞数状态
  console.log(count++)
  // 获取评论的点赞状态
  useEffect(() => {
    if (getToken()) {
      checkCommentLike(CommentID).then((res: any) => {
        setLiked(res.liked)
      })
    }
    fetchLikeCount()
  }, [])
  // 获取评论的点赞总数
  const fetchLikeCount = async () => {
    try {
      const res = await commentLikeCount(CommentID)
      // console.log(count)
      setLikeCount(res.likeCount)
    } catch (error) {
      console.error('Failed to fetch like count:', error)
    }
  }

  // 处理点赞事件
  const handleLiked = async (isLiked) => {
    setLiked(isLiked)
    if (!getToken()) {
      message.error('请先登录')
      return
    }
    try {
      if (isLiked) {
        await addCommentLike(CommentID) // 点赞
        setLikeCount((prevCount) => prevCount + 1) // 增加点赞数
      } else {
        await removeCommentLike(CommentID) // 取消点赞
        setLikeCount((prevCount) => prevCount - 1) // 减少点赞数
      }
    } catch (error) {
      // console.error('Failed to update like status:', error)
      message.error('请先登录')
    }
  }
  const handleReportComment = () => {
    console.log('report comment')
  }
  return (
    <div className="user-comment-container">
      <Space>
        <Flex>
          <div className="user-avatar">
            <Avatar size={40} icon={!User.Avatar ? <UserOutlined /> : null} src={User.Avatar} />
          </div>

          <div className="user-info-and-content">
            <div className="user-name">{User.Username}</div>
            <div className="user-comment-content">{Content}</div>
            <div className="like-reply">
              <Space>
                <LikeButton handleLiked={handleLiked} liked={liked} />
                <p>{likeCount}</p>
                <span>{moment(CommentDate).format('YYYY 年 M 月 D 日 HH:mm:ss')}</span>
                <Tooltip color={'red'} title="举报评论">
                  <EllipsisOutlined color={'black'} onClick={handleReportComment} />
                </Tooltip>
              </Space>
            </div>
          </div>
        </Flex>
      </Space>
    </div>
  )
}

export default UserComment
