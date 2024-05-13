import React from 'react'
import '@/styles/variables.less'
import { Tabs } from 'antd'
const CreatorHelp = () => {
  return (
    <div className="creator-content">
      帮助中心
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          <CreatorHelp />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default CreatorHelp
