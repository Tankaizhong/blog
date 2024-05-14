import React from 'react'
import '@/styles/privacy-policy-page.less'
const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="privacy-policy-page">
      <div className="privacy-title">
        <h1>隐私政策</h1>
      </div>
      <p>
        欢迎访问我们的隐私政策页面。在这里，我们将详细说明我们收集的个人信息类型、信息用途、信息保护措施以及您的权利和责任。
      </p>
      <h2>我们收集的信息</h2>
      <p>我们可能收集的信息类型包括但不限于：</p>
      <ul>
        <li>姓名</li>
        <li>电子邮件地址</li>
        <li>IP 地址</li>
        <li>浏览器类型</li>
        <li>设备信息</li>
      </ul>
      <h2>信息用途</h2>
      <p>我们收集的信息用于以下目的：</p>
      <ul>
        <li>提供和维护服务</li>
        <li>通知您有关服务的变更</li>
        <li>提供客户支持</li>
        <li>为分析目的收集统计数据</li>
      </ul>
      <h2>信息保护措施</h2>
      <p>我们采取一系列措施来保护您提供的个人信息：</p>
      <ul>
        <li>数据加密</li>
        <li>访问控制</li>
        <li>安全审计</li>
      </ul>
      <h2>联系我们</h2>
      <p>如果您对我们的隐私政策有任何疑问或意见，请联系我们：</p>
      <p>Email: 2534658839@qq.com</p>
      <p>电话: 159-7734-1356</p>
      <h2>更新通知</h2>
      <p>我们将定期更新我们的隐私政策，并在更新生效前通知您。</p>
    </div>
  )
}

export default PrivacyPolicyPage
