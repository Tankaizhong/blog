import React from 'react'
import '@/styles/layoutcontent.less'
import {Anchor, Row, Col, Layout} from 'antd';

const {Header, Content, Footer, Sider} = Layout;
const LayoutContent = () => {

    return <div className="home">
        <Content style={{padding: '0 24px', minHeight: 280}}>Content</Content>
    </div>
}

export default LayoutContent
