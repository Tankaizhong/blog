import React from 'react'
import { Row, Col, Card, Statistic, Flex } from 'antd'
import { EyeOutlined, FileOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import '../style/StatsRow.less'
const HighlightedStatCard = (props) => {
  const { title, value, description } = props
  // console.log(props)
  const renderIcon = () => {
    switch (title) {
      case 'postCount':
        return <FileOutlined className="icon" />
      case 'totalViews':
        return <EyeOutlined className="icon" />
      case 'userCount':
        return <UserOutlined className="icon" />
      case 'commentCount':
        return <MessageOutlined className="icon" />
      default:
        return null
    }
  }

  const titleMap = {
    userCount: '用户数量',
    postCount: '文章数量',
    commentCount: '评论数量',
    totalViews: '总浏览量',
  }

  return (
    <div className="highlighted-stat-card">
      <Row justify="space-between" align="middle">
        <Col span={12}>
          <Statistic value={value} />
        </Col>
        <Col span={6}>{renderIcon()}</Col>
      </Row>
      <div className="description">{titleMap[title]}</div>
    </div>
  )
}

const StatsRow = ({ stats }) => {
  console.log(stats)
  return (
    <Flex justify="space-around" className="state-content">
      {stats ? (
        Object.entries(stats).map(([key, value]) => (
          <HighlightedStatCard key={key} title={key} value={value} />
        ))
      ) : (
        <p>Loading.....</p>
      )}
    </Flex>
  )
}

export default StatsRow
