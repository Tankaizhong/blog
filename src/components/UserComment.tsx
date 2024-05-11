import React, { useEffect, useState } from 'react'
import { Avatar, Space, Tooltip, message, Button } from 'antd'
import {

  ExclamationCircleOutlined,

  UserOutlined,
} from '@ant-design/icons'
import '@/styles/usercomment.less'
import { UserType } from '@/types/model'
import LikeButton from '@/components/LikeButton'
import { addCommentLike, checkCommentLike, commentLikeCount, removeCommentLike } from '@/api/like'
import moment from 'moment'

import { getToken } from '@/utils/token'
import { reportComment } from '@/api/comment'

let count = 0
const UserComment = ({ comment }) => {
  const { User, Content, CommentDate, CommentID }: { User: UserType } = comment
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
      const {likeCount: likeCount1} = await commentLikeCount(CommentID)
      // console.log(count)
      setLikeCount(likeCount1)
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
  const handleReportComment = async () => {
    console.log('report comment')
    //举报评论接口
    await reportComment(CommentID)
      .then(() => {
        message.success('举报成功')
      })
      .catch((error) => {
        message.error('举报失败')
      })
  }
  return (
    <div className="user-comment-container">
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
          </Space>
          <div className="report-comment">
            <Tooltip title="举报评论">
              <Button type="text">
                <ExclamationCircleOutlined color={'black'} onClick={handleReportComment} />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserComment
