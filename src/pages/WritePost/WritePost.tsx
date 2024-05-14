import React, { useEffect, useState } from 'react'
import { Layout, Form, Input, Button, Checkbox, message, Drawer } from 'antd'
import MarkdownEditor from './MarkdownEditor' // 假设有一个 Markdown 编辑器组件
import { publishPost } from '@/api/posts' // 导入获取分类和标签的接口方法
import '@/styles/write-post.less'

import TagAndCategories from '@/pages/WritePost/TagAndCategories'
import { navigateTo } from '@/utils/router'
import { getStorage, saveStorage } from '@/utils/storage'
import { LOCAL_STORAGE_POST } from '@/config'

const { Content } = Layout

const WritePost: React.FC = () => {
  const [form] = Form.useForm()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [wordCount, setWordCount] = useState({ lines: 0, words: 0, characters: 0 })
  const [syncScroll, setSyncScroll] = useState(false)

  useEffect(() => {
    const savedFormValues = getStorage(LOCAL_STORAGE_POST)
    if (savedFormValues) {
      form.setFieldsValue(savedFormValues)
      setTitle(savedFormValues.Title || '')
      setContent(savedFormValues.Content || '')
      const stats = getContentStats(savedFormValues.Content || '')
      setWordCount(stats)
    }
  }, [form])

  const handleSyncScroll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSyncScroll(e.target.checked)
  }

  const handleScrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const handleSubmit = (values: any) => {
    publishPost({ title, content, ...values })
      .then(() => {
        message.success('文章发布成功')
        navigateTo('/home/publishSuccess')
        localStorage.removeItem(LOCAL_STORAGE_POST)
      })
      .catch((error) => {
        console.error('文章发布失败:', error)
        message.error('文章发布失败')
      })
  }

  const getContentStats = (content: string) => {
    const lines = content.split('\n').filter((line) => line.trim() !== '').length
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word !== '').length
    const characters = content.length
    return { lines, words, characters }
  }

  const handleContentChange = (value: string) => {
    setContent(value)
    const stats = getContentStats(value)
    setWordCount(stats)
    form.setFieldsValue({ Content: value })
    saveFormToLocalStorage({ ...form.getFieldsValue(), Content: value })
  }

  const handleFieldsChange = (changedFields: any, allFields: any) => {
    const newValues = allFields.reduce((acc: any, field: any) => {
      acc[field.name[0]] = field.value
      return acc
    }, {})
    console.log(newValues)
    saveFormToLocalStorage(newValues)
  }

  const saveFormToLocalStorage = (formValues: any) => {
    saveStorage(LOCAL_STORAGE_POST, formValues)
  }

  const [open, setOpen] = useState(false)
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Layout className="write-post-layout">
        <Content className="write-post-content">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            onFieldsChange={handleFieldsChange}
          >
            <Form.Item
              name="Title"
              className="title-form-item"
              rules={[{ required: true, message: '请输入标题' }]}
            >
              <div className="title-input-wrapper">
                <Input
                  className="title-input"
                  placeholder="请输入标题"
                  value={title}
                  onChange={(e) => {
                    const newValue = e.target.value
                    setTitle(newValue)
                    form.setFieldsValue({ Title: newValue })
                    saveFormToLocalStorage({ ...form.getFieldsValue(), Title: newValue })
                  }}
                />
                <Button onClick={showDrawer} type="primary">
                  发布
                </Button>
              </div>
            </Form.Item>
            <Form.Item name="Content" rules={[{ required: true, message: '请输入内容' }]}>
              <div className="post-content">
                <MarkdownEditor value={content} onChange={handleContentChange} />
              </div>
            </Form.Item>
          </Form>
          <div className="word-count">
            <div className="word">
              <span>字符数: {wordCount.characters}</span>
              <span>行数: {wordCount.lines}</span>
            </div>
            <div className="scroll-controls">
              <Checkbox checked={syncScroll} onChange={handleSyncScroll}>
                同步滚动
              </Checkbox>
              <a href="#" onClick={handleScrollToTop}>
                回到顶部
              </a>
            </div>
          </div>
        </Content>
      </Layout>
      <Drawer title="发布文章" onClose={onClose} open={open}>
        <TagAndCategories onSubmit={handleSubmit} />
      </Drawer>
    </>
  )
}

export default WritePost
