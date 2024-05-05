import React, { useEffect, useState } from 'react'
import { Typography, Divider, Table, Button, message, Modal } from 'antd'
import { CommentType } from '@/types/model'
import { getAllComments, deleteComment } from '@/api/comment'
import '../style/CommentManager.less'
import { showConfirm } from '@/utils/button'

const { confirm } = Modal
const { Text } = Typography

const CommentManager: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([])

  const fetchComments = async () => {
    try {
      const response = await getAllComments()
      const commentsWithKeys = response.map((comment) => {
        return { ...comment, key: comment.CommentID }
      })
      setComments(commentsWithKeys)
    } catch (error) {
      console.error('获取评论失败：', error)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  const handleDelete = async (commentId: Number) => {
    try {
      await deleteComment(commentId)
      message.success('评论删除成功')
      fetchComments()
    } catch (error) {
      console.error('删除评论失败：', error)
      message.error('删除评论失败')
    }
  }

  const columns = [
    {
      title: '文章ID',
      dataIndex: 'PostID',
      key: 'PostID',
    },
    {
      title: '用户ID',
      dataIndex: 'UserID',
      key: 'UserID',
    },
    {
      title: '内容',
      dataIndex: 'Content',
      key: 'Content',
      ellipsis: true, // 添加 ellipsis 属性
    },
    {
      title: '操作',
      key: 'action',
      render: (text: any, record: CommentType) => (
        <Button
          type="primary"
          danger
          onClick={() => showConfirm(() => handleDelete(record?.CommentID as number))}
        >
          删除
        </Button>
      ),
    },
  ]

  return (
    <div>
      <Divider orientation="left">评论管理</Divider>
      <Table
        columns={columns.map((column) => ({
          ...column,
          align: 'center',
        }))}
        dataSource={comments}
        rowKey="CommentID"
      />
    </div>
  )
}

export default CommentManager
