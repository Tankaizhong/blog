import React, { useEffect, useState } from 'react'
import { getUserRankings } from '@/api/user'
//引入样式
import '@/styles/user-rankings.less'
import { Flex, List } from 'antd'
import AntDesignFireFilled from '@/../public/Post/AntDesignFireFilled.svg'

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
      setRankings(data as any[])
    } catch (error) {
      console.error('Error fetching user rankings:', error)
    }
  }

  //得分计算
  const calculateRank = (postCount, likeCount, weightPostCount, weightLikeCount) => {
    // 计算加权得分
    const weightedScore = postCount * weightPostCount + likeCount * weightLikeCount

    return Math.ceil(weightedScore) + 1000
  }

  return (
    <Flex vertical="true" justify="center" align="center" className="user-rankings-content">
      <div className="user-rank-content">
        <div className="user-rank-title">用户排行榜</div>
        <List
          dataSource={rankings}
          renderItem={(user, index) => (
            <div className="user-rank-infor">
              <Flex align="center" justify="space-between">
                <List.Item className="user-rank-infor-item">
                  <div>
                    <span className={`rank rank-${index + 1}`}>{index + 1} : </span>
                    <span className="user-rank-name">{user.Username}</span>
                  </div>

                  <div className="user-rank">
                    {index < 3 && (
                      <div className="top-rank-icon">
                        {/* 添加前三名 icon */}
                        <img src={AntDesignFireFilled} alt="AntDesignFireFilled" />
                      </div>
                    )}
                    <span>{calculateRank(user.PostCount, user.LikeCount, 0.6, 0.4)}</span>
                    <span>热度</span>
                  </div>
                </List.Item>
              </Flex>
            </div>
          )}
        />
      </div>
    </Flex>
  )
}

export default UserRankings
