import React, { useEffect, useState } from 'react'
import { Button, Divider, message, Table } from 'antd'
import { deletePostByPostID, fetchAllPost } from '@/api/posts'
import { PostType } from '@/types/model'
import '@/styles/tables.less'
import moment from 'moment'

const PostManager = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  useEffect(() => {
    fetchAllPost().then((res) => {
      console.log(res)
      const postsWithKeys = res.map((post) => {
        return {
          ...post,
          Likes: post.Likes.length,
          User: post.User.Nickname,
        }
      })
      setPosts(postsWithKeys)
    })
  }, [])

  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? 'even-row' : 'odd-row'
  }
  //删除文章
  const handleDelete = async (record) => {
    // 从博客数据中移除要删除的记录
    const newData = posts.filter((item) => item.key !== record.key)
    //发送API删除数据
    await deletePostByPostID(record.PostID).then(() => {
      // 更新博客数据
      setPosts(newData)
      // 弹出提示删除成功的消息
      message.success('删除成功')
    })
  }

  // 定义表格列
  const columns = [
    {
      title: '标题',
      dataIndex: 'Title',
      key: 'Title',
    },
    {
      title: '作者',
      dataIndex: 'User',
      key: 'User',
    },
    {
      title: '点赞数',
      dataIndex: 'Likes',
      key: 'Likes',
    },

    {
      title: '浏览数',
      dataIndex: 'Views',
      key: 'Views',
    },

    {
      title: '发布日期',
      dataIndex: 'PostDate',
      key: 'PostDate',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'), // 使用 moment 格式化日期
    },
    {
      title: '删除',
      dataIndex: 'Delete',
      key: 'Delete',
      render: (text, record) => (
        <Button danger onClick={() => handleDelete(record)}>
          删除
        </Button>
      ), // 添加删除按钮，并绑定 handleDelete 函数
    },
  ]

  return (
    <div>
      <div>
        <Divider orientation="left">文章管理</Divider>
        <Table
          rowClassName={getRowClassName}
          columns={columns.map((column) => ({
            ...column,
            align: 'center',
          }))}
          dataSource={posts}
          rowKey="PostID"
        />
      </div>
    </div>
  )
}

export default PostManager
