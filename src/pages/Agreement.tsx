// Agreement.js
import React from 'react'
import '@/styles/agreement.less'

const Agreement = () => {
  return (
    <div className="agreement-container">
      <h2 className="agreement-title">用户注册协议</h2>
      <div className="agreement-content">
        <p>欢迎使用我们的服务。在使用之前，请您仔细阅读以下协议：</p>
        <h3>一、服务条款的接受</h3>
        <p>1.1 本服务的所有权和运作权归本公司所有。</p>
        <p>
          1.2
          您确认，在您注册成为本网站会员以接受本服务之前，您已充分阅读、理解并接受本协议的全部内容，一旦您使用本服务，即视为您已了解并完全同意本协议的各项条款。
        </p>
        <h3>二、服务内容</h3>
        <p>2.1 本服务的具体内容由本公司根据实际情况提供。</p>
        <p>2.2 本公司保留随时变更、中断或终止部分或全部网络服务的权利。</p>
        <h3>三、用户注册</h3>
        <p>3.1 您在使用本服务前需要注册一个账号。</p>
        <p>3.2 您应当保证提供的注册信息真实、准确、完整。</p>
        <p>3.3 如果您提供的注册信息发生变动，您应当及时更新。</p>
        {/* 其他协议内容 */}
      </div>
    </div>
  )
}

export default Agreement
