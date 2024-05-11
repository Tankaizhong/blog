import React, { useState } from 'react'

import { Input } from 'antd'
const { TextArea } = Input
// 引入样式
import '@/styles/chat.less'

const ChatGPTIndex = () => {
  // 状态：用于存储用户输入的文本
  const [inputText, setInputText] = useState('')

  // 处理用户输入变化的函数
  const handleInputChange = (e) => {
    setInputText(e.target.value)
  }

  return (
    <div className="chat-index">
      {/* 输入区域 */}
      <div className="chat-input">
        <Input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="输入你的消息..."
        />
      </div>

      {/* 展示区域 */}
      <div className="chat-output">
        <TextArea
          value={inputText} // 设置输入文本值为展示文本值
          readOnly // 设置为只读，用户不能编辑展示文本
        />
      </div>
    </div>
  )
}

export default ChatGPTIndex
