import React, { useState, useEffect } from 'react'

import { fetchPostList } from '@/api/posts'
import PostPreview from '@/components/PostPreview'
import { Empty } from 'antd'
const HomeContent = () => {
  //调用fetchPostList
  const [postList, setPostList] = useState([]) // 用于存储文章列表数据的状态
  // console.log(postList)
  // 在组件加载时调用fetchPostList函数获取文章列表数据
  const fetchData = async () => {
    try {
      const post = await fetchPostList()
      // console.log(post.data)
      setPostList(post.data) // 更新文章列表数据
    } catch (error) {
      console.error('Failed to fetch post list:', error)
    }
  }
  useEffect(() => {
    fetchData().then((res) => {
      // console.log(res)
    }) // 调用获取文章列表数据的函数
  }, [])

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
