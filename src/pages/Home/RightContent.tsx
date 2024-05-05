import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FireOutlined } from '@ant-design/icons'
import '../../styles/left-content.less'
import { fetchHotPost, fetchPostList } from '@/api/posts'
import { PostType } from '@/types/model'
import ReactMarkdown from 'react-markdown'
import { log } from 'util'

const HotPost = () => {
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

  return (
    <div className="left-content">
      <div className="hot-content">
        <div className="hot-content-tittle">
          <FireOutlined /> 热门文章
        </div>
        <ul className="hot-post-list">
          {posts
            .sort((a, b) => b.views - a.views) // 按浏览量排序
            .map((post: PostType, index) => (
              <li key={index}>
                <a href={`/post/${post.PostID}`} target="_blank">
                  <span className={`rank rank-${index + 1}`}>{index + 1}</span>
                  <span>
                    <ReactMarkdown>{post.Title}</ReactMarkdown>
                  </span>
                </a>
              </li>
            ))}
        </ul>
      </div>
      {/*  轮播图*/}
      <div className="banner-content"></div>
    </div>
  )
}

export default HotPost
