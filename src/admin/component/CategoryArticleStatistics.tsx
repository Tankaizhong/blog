import React, { useEffect, useState } from 'react'
import { fetchAllPostGroupByCategory } from '@/admin/api/admin'
import '../style/CategoryArticleStatistics.less'
import { renderPieChart } from '@/utils/echartRenderer'
import { Divider } from 'antd'

const CategoryArticleStatistics = () => {
  const [categoryData, setCategoryData] = useState([])
  useEffect(() => {
    fetchAllPostGroupByCategory() // 假设这是一个异步函数，用于获取分类统计数据
      .then((data) => {
        // console.log(data)
        renderPieChart('category-chart', data)
      })
      .catch((error) => {
        console.error('Error fetching category statistics:', error)
      })
  }, [])

  return (
    <div className="CategoryArticleStatistics">
      <div id="category-chart" className="category-chart">
        {/*<Divider orientation="left" plain>*/}
        {/*    Left Text*/}
        {/*</Divider>*/}
      </div>
    </div>
  )
}

export default CategoryArticleStatistics
