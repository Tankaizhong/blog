import React, { useEffect, useState } from 'react'
import {
  Layout,
  Form,
  Input,
  Button,
  Modal,
  Checkbox,
  message,
  Select,
  Tag,
  Row,
  Col,
  Popover,
} from 'antd'
import MarkdownEditor from './MarkdownEditor' // 假设有一个 Markdown 编辑器组件
import { fetchCategories, fetchTags } from '@/api/posts' // 导入获取分类和标签的接口方法
import '@/styles/write-post.less'
import { Category, TagModal } from '@/types/model'
import TagAndCategories from '@/pages/WritePost/TagAndCategories'

const { Content } = Layout

const WritePost: React.FC = () => {
  const [form] = Form.useForm()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [wordCount, setWordCount] = useState({ lines: 0, words: 0, characters: 0 })
  const [modalVisible, setModalVisible] = useState(false)
  const [syncScroll, setSyncScroll] = useState(false)

  // 同步滚动
  const handleSyncScroll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSyncScroll(e.target.checked)
  }

  // 回到顶部
  const handleScrollToTop = () => {
    window.scrollTo(0, 0)
  }

  // 提交表单
  const handleSubmit = (values: any) => {
    // 在这里处理提交表单的逻辑，例如将文章数据发送到后端保存
    console.log('提交的文章数据：', values)
    setModalVisible(true) // 打开模态框
  }

  // 获取文本框内容的行数和字符数
  const getContentStats = (content: string) => {
    const lines = content.split('\n').filter((line) => line.trim() !== '').length
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word !== '').length
    const characters = content.length
    return { lines, words, characters }
  }

  // 更新字数统计
  const handleContentChange = (value: string) => {
    setContent(value)
    const stats = getContentStats(value)
    setWordCount(stats)
  }

  return (
    <Layout className="write-post-layout">
      <Content className="write-post-content">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="标题"
            name="title"
            className="title-form-item"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <div className="title-input-wrapper">
              <Input
                className="title-input"
                placeholder="请输入标题"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Popover title="发布文章" content={TagAndCategories}>
                <Button type="primary" htmlType="submit">
                  发布
                </Button>
              </Popover>
            </div>
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入内容' }]}
          >
            <MarkdownEditor value={content} onChange={handleContentChange} />
          </Form.Item>
          <div className="word-count">
            <div className="word">
              <span>字符数: {wordCount.characters}</span>
              <span>行数: {wordCount.lines}</span>
              <span>正文字数: {wordCount.words}</span>
            </div>

            {/* 同步滚动和回到顶部 */}
            <div className="scroll-controls">
              <Checkbox checked={syncScroll} onChange={handleSyncScroll}>
                同步滚动
              </Checkbox>
              <a href="#" onClick={handleScrollToTop}>
                回到顶部
              </a>
            </div>
          </div>
        </Form>
      </Content>
      {/* 提交后的模态框 */}
    </Layout>
  )
}

export default WritePost
