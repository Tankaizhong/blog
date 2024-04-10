import React, { useEffect, useState } from 'react'
import { Category, TagModal } from '@/types/model'
import { message, Select } from 'antd'
import { fetchCategories, fetchTags } from '@/api/posts'
import '@/styles/tag-and-categories.less'
const TagAndCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]) // 分类列表
  const [tags, setTags] = useState<TagModal[]>([]) // 标签列表
  const [selectedCategory, setSelectedCategory] = useState('') // 用户选择的分类
  const [selectedTags, setSelectedTags] = useState([]) // 用户选择的标签

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
  }

  return (
    <div>
      {/* 在这里添加你想展示的内容，例如标签和分类 */}
      <p>分类：</p>
      <Select style={{ width: '100%' }} onChange={handleCategoryChange} value={selectedCategory}>
        {categories.map((category) => (
          <Select.Option key={category.CategoryID} value={category.CategoryID}>
            {category.CategoryName}
          </Select.Option>
        ))}
      </Select>
      <p>已选择标签：</p>

      <p>添加标签：</p>
      <Select mode="multiple" style={{ width: '100%' }} onChange={handleCategoryChange}>
        {tags.map((tag) => (
          <Select.Option key={tag.TagID} value={tag.TagName}>
            {tag.TagName}
          </Select.Option>
        ))}
      </Select>
    </div>
  )
}

export default TagAndCategories
