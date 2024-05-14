import React from 'react'
import '@/styles/variables.less'
import { Tabs } from 'antd'
import TabPane from 'antd/lib/tabs/TabPane'

const CreatorHelp = () => {
  return (
    <div className="creator-content">
      帮助中心
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: '内容曝光',
            key: '1',
            children: (
              <>
                目前内容的排行和热度就是根据热度算法的规则来进行推荐，更多信息详见：
                {/*https://juejin.cn/post/6844903833856901133*/}
                <a href="http://localhost:5173/post/9">http://localhost:5173/post/9</a>
              </>
            ),
          },

          {
            label: '内容审核',
            key: '2',
            children: (
              <>
                <p>
                  1.
                  根据国家相关法律法规规定，保障平台内容安全：过滤涉黄、涉暴、涉毒、赌博等安全底线问题。
                </p>
                <p>2. 保障用户体验，有助于提升平台长期价值：打击低俗、辱骂、广告等低质内容。</p>
              </>
            ),
          },
        ]}
      ></Tabs>
    </div>
  )
}

export default CreatorHelp
