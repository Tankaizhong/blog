import React, { useEffect, useState } from 'react'
import { fetchAllPostGroupByCategory } from '@/admin/api/admin'

import { renderPieChart } from '@/utils/echartRenderer'

const CategoryArticleStatistics = () => {
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    fetchAllPostGroupByCategory() // 假设这是一个异步函数，用于获取分类统计数据
      .then((data) => {
        console.log(data)
        renderPieChart('category-chart', data)
      })
      .catch((error) => {
        console.error('Error fetching category statistics:', error)
      })
  }, [])

  return <div id="category-chart" style={{ width: '100%', height: 400 }} />
}

export default CategoryArticleStatistics
