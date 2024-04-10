import React from 'react'
import '@/styles/pagefooter.less'

const PageFooter: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <ul>
            <li>
              <a href="#">关于我们</a>
            </li>
            <li>
              <a href="#">服务项目</a>
            </li>
            <li>
              <a href="#">联系我们</a>
            </li>
          </ul>
        </div>
        <div className="footer-info">
          <p>公司地址：大连市甘井子区大连大学</p>
          <p>联系电话：159-7734-1356</p>
          <p>电子邮件：2534658839@qq.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 大连大学计算机科学与技术学院 - All rights reserved</p>
      </div>
    </div>
  )
}

export default PageFooter
