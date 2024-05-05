import React, { useEffect, useState } from 'react'
import { Divider, Table } from 'antd'
import { fetchAllPost } from '@/api/posts'
import { PostType } from '@/types/model'
import '@/styles/tables.less'
import moment from 'moment'

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
]
const PostManager = () => {
  const [posts, setPosts] = useState<PostType[]>([])
  useEffect(() => {
    fetchAllPost().then((res) => {
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
