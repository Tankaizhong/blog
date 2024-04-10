import React, { useEffect, useState } from 'react'
import { Category, TagModal } from '@/types/model'
import { Button, message, Select } from 'antd'
import { fetchCategories, fetchTags } from '@/api/posts'
import '@/styles/tag-and-categories.less'

const TagAndCategories = ({ onCategoryChange, onTagChange, onSubmit }) => {
  const [categories, setCategories] = useState<Category[]>([]) // 分类列表
  const [tags, setTags] = useState<TagModal[]>([]) // 标签列表
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]) // 用户选择的分类
  const [selectedTags, setSelectedTags] = useState<string[]>([]) // 用户选择的标签

  useEffect(() => {
    // 获取分类列表
    fetchCategories()
      .then((res) => {
        setCategories(res as Category[])
      })
      .catch((error) => {
        console.error('获取分类列表失败', error)
        message.error('获取分类列表失败')
      })

    // 获取标签列表
    fetchTags()
      .then((res) => {
        setTags(res as TagModal[])
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
  const handleTagChange = (value) => {
    setSelectedTags(value)
    onTagChange(value) // 将选中的标签传递给父组件
  }
  const handleSubmit = () => {
    onSubmit()
  }

  return (
    <div className="tag-and-categories-content">
      {/* 在这里添加你想展示的内容，例如标签和分类 */}
      <div className="category-content">
        <p>分类：</p>
        <Select style={{ width: '100%' }} onChange={handleCategoryChange} value={selectedCategory}>
          {categories.map((category) => (
            <Select.Option key={category.CategoryID} value={category.CategoryName}>
              {category.CategoryName}
            </Select.Option>
          ))}
        </Select>
      </div>

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
      {/*确认*/}
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
