import React, { useEffect, useState } from 'react'
import { getUserRankings } from '@/api/user'
//引入样式
import '@/styles/user-rankings.less'
import { Flex, List } from 'antd'

const UserRankings = () => {
  const [rankings, setRankings] = useState([])

  useEffect(() => {
    // 在组件加载时获取用户排行数据
    fetchUserRankings()
  }, [])

  const fetchUserRankings = async () => {
    try {
      const data = await getUserRankings() // 调用后端API获取用户排行数据
      console.log(data)
      setRankings(data)
    } catch (error) {
      console.error('Error fetching user rankings:', error)
    }
  }

  return (
    <Flex vertical="true" justify="center" align="center" className="user-rankings-content">
      <div className="user-rank-content">
        用户排行
        <List
          dataSource={rankings}
          renderItem={(user, index) => (
            <div className="user-rank-infor">
              <List.Item>
                <span className={`rank rank-${index + 1}`}>{index + 1} : </span>
                <span className="user-rank-name">{user.Username}</span>
              </List.Item>
            </div>
          )}
        />
      </div>
    </Flex>
  )
}

export default UserRankings
