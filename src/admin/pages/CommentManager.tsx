import React, { useEffect, useState } from 'react'
import { Divider, Table, Button, message, Badge } from 'antd'
import { CommentType } from '@/types/model'
import { getAllComments, deleteComment } from '@/api/comment'
import '../style/CommentManager.less'
import { showConfirm } from '@/utils/button'
import { unblockComment } from '@/admin/api/admin'

const CommentManager: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([])

  const fetchComments = async () => {
    try {
      await getAllComments().then((response) => {
        if (response === null) {
          return
        }
        setComments(response as CommentType[])
      })
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
      align: 'center',
    },
    {
      title: '用户ID',
      dataIndex: 'UserID',
      key: 'UserID',
      align: 'center',
    },
    {
      title: '内容',
      dataIndex: 'Content',
      key: 'Content',
      ellipsis: true, // 添加 ellipsis 属性
      align: 'center',
    },
    {
      title: 'Status',
      key: 'Status',
      align: 'center',
      render: (text, record: CommentType) => (
        <Badge
          status={record.isReported ? 'error' : 'success'}
          text={record.isReported ? '异常' : '正常'}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (text: any, record: CommentType) => (
        <div className="comment-manager-action-button">
          <Button
            danger
            onClick={() => showConfirm(() => handleDelete(record?.CommentID as number))}
          >
            删除
          </Button>
          {record.isReported ? (
            //解封
            <Button onClick={() => handleUnBan(record)} type="primary" danger>
              解封
            </Button>
          ) : null}
        </div>
      ),
    },
  ]
  //解封评论
  const handleUnBan = (record: CommentType) => {
    try {
      unblockComment(record.CommentID).then(() => {
        message.success('解封成功')
      })
    } catch (error) {
      console.error('解封失败：', error)
      message.error('解封失败')
    }
  }

  return (
    <div>
      <Divider orientation="left">评论管理</Divider>
      <Table columns={columns} dataSource={comments} rowKey="CommentID" />
    </div>
  )
}

export default CommentManager
