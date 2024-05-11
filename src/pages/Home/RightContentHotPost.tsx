import React, { useState, useEffect } from 'react'

import { FireOutlined } from '@ant-design/icons'
import '../../styles/right-content-hot-post.less'
import { fetchHotPost } from '@/api/posts'

import ReactMarkdown from 'react-markdown'
import { List } from 'antd'

const RightContentHotPost = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getHotPost().then((r) => {
      console.log(r)
    })
  }, [])
  //热门
  const getHotPost = async () => {
    try {
      // 发送请求获取热门文章数据
      await fetchHotPost().then((res) => {
        // console.log('res:', res.data);
        setPosts(res.data)
      })
    } catch (error) {
      console.error('Error fetching hot post:', error)
    }
  }

  const postsPerPage = 3 // 每页显示的热门文章数量
  return (
    <div className="left-content">
      <div className="hot-content">
        <div className="hot-content-tittle">
          <FireOutlined /> 热门文章
        </div>
        <List
          pagination={{
            position: 'bottom',
            pageSize: postsPerPage,
            showSizeChanger: false,
            size: 'small',
            className: 'custom-pagination',
          }}
          dataSource={posts.sort((a, b) => b.views - a.views)}
          renderItem={(post, index) => (
            <List.Item>
              <List.Item.Meta
                className="hot-post-item"
                description={
                  <a href={`/post/${post.PostID}`} target="_blank">
                    <span className={`rank rank-${index + 1}`}>{index + 1}</span>
                    <ReactMarkdown>{post.Title}</ReactMarkdown>
                  </a>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default RightContentHotPost
