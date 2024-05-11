import React, { useState, useEffect } from 'react'

import { fetchPostByCategory, fetchPostByQuery, fetchPostList } from '@/api/posts'
import PostPreview from '@/components/PostPreview'
import { Empty } from 'antd'
import { useParams, useLocation } from 'react-router-dom'

const HomeContent = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const { sharedState: CategoryID } = useParams<{ sharedState: string }>()
  //调用fetchPostList
  const [postList, setPostList] = useState([]) // 用于存储文章列表数据的状态
  // 在组件加载时调用fetchPostList函数获取文章列表数据

  const fetchData = async () => {
    try {
      const post = await fetchPostList(CategoryID)
      console.log(post.data)
      setPostList(post.data) // 更新文章列表数据
    } catch (error) {
      console.error('Failed to fetch post list:', error)
    }
  }
  const query = queryParams.get('query') // 获取查询参数
  useEffect(() => {
    if (query) {
      //搜索文章的
      fetchPostByQuery(query).then((res) => {
        setPostList(res)
        // console.log(res)
      })
    } else fetchData().then((res) => {}) // 调用获取文章列表数据的函数
  }, [CategoryID])

  return (
    <div>
      {postList && postList.length > 0 ? (
        postList.map((post) => <PostPreview key={post.PostID} post={post} />)
      ) : (
        <Empty description="暂无文章" />
      )}
    </div>
  )
}

export default HomeContent
