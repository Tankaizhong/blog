import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Input } from 'antd'

const MarkdownEditor: React.FC<{ value: string; onChange: (value: string) => void }> = ({
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value)

  // 处理输入框内容变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    onChange(newValue) // 将新值传递给父组件
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* 编辑器 */}
        <Input.TextArea
          value={inputValue}
          onChange={handleInputChange}
          placeholder="在这里写 Markdown 文本"
          autoSize={{ minRows: 10 }}
          style={{
            width: '50%',
            marginRight: '10px',
            border: '1px solid #d9d9d9',
            borderRadius: '0',
          }}
        />
        {/* 预览区 */}
        <div style={{ width: '50%', border: '1px solid #d9d9d9', padding: '10px' }}>
          <ReactMarkdown>{inputValue}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditor
