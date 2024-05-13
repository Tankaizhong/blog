import React, { useEffect, useState } from 'react'
import { CategoryType, TagType } from '@/types/model'
import { Button, message, Select, Input } from 'antd'
import { fetchCategories, fetchTags } from '@/api/posts'
import '@/styles/tag-and-categories.less'

const TagAndCategories = ({ onCategoryChange, onTagChange, onSubmit, onSummaryChange }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]) // 分类列表
  const [tags, setTags] = useState<TagType[]>([]) // 标签列表
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]) // 用户选择的分类
  const [summary, setSummary] = useState<string>('') // 摘要内容

  useEffect(() => {
    // 获取分类列表
    fetchCategories()
      .then((res) => {
        setCategories(res as CategoryType[])
      })
      .catch((error) => {
        console.error('获取分类列表失败', error)
        message.error('获取分类列表失败')
      })

    // 获取标签列表
    fetchTags()
      .then((res) => {
        setTags(res as TagType[])
      })
      .catch((error) => {
        console.error('获取标签列表失败', error)
        message.error('获取标签列表失败')
      })
  }, [])

  // 处理选择分类变化
  const handleCategoryChange = (value) => {
    setSelectedCategory(value)
    onCategoryChange(value) // 将选中的分类传递给父组件
  }

  // 处理选择标签变化
  const handleTagChange = (value) => {
    onTagChange(value) // 将选中的标签传递给父组件
  }

  // 处理摘要输入变化
  const handleSummaryChange = (e) => {
    setSummary(e.target.value)
    onSummaryChange(e.target.value) // 将摘要内容传递给父组件
  }

  const handleSubmit = () => {
    onSubmit()
  }

  return (
    <div className="tag-and-categories-content">
      {/* 分类选择 */}
      <div className="category-content">
        <p>分类：</p>
        <Select
          required
          style={{ width: '100%' }}
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          {categories.map((category) => (
            <Select.Option key={category.CategoryID} value={category.CategoryName}>
              {category.CategoryName}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* 标签选择 */}
      <div className="tag-content">
        <p>添加标签：</p>
        <Select mode="multiple" style={{ width: '100%' }} onChange={handleTagChange}>
          {tags.map((tag) => (
            <Select.Option key={tag.TagID} value={tag.TagName}>
              {tag.TagName}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* 摘要输入 */}
      <div className="summary-content">
        <p>摘要：</p>
        <Input.TextArea value={summary} onChange={handleSummaryChange} />
      </div>

      {/* 确认按钮 */}
      <div className="button-content">
        <Button htmlType="submit">取消</Button>
        <Button onClick={handleSubmit} type="primary" htmlType="submit">
          确认并发布
        </Button>
      </div>
    </div>
  )
}

export default TagAndCategories
