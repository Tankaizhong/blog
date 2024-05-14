import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Input } from 'antd'
import '@/styles/markdown-editor.less' // 假设样式文件存储在这个路径下
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { getStorage, saveStorage } from '@/utils/storage'
import { LOCAL_STORAGE_POST } from '@/config'

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
  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <div className="markdown-editor">
      <Input.TextArea
        value={inputValue}
        onChange={handleInputChange}
        placeholder="在这里写 Markdown 文本"
        className="editor"
      />
      <div className="preview">
        <ReactMarkdown
          children={inputValue}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />
      </div>
    </div>
  )
}

export default MarkdownEditor
