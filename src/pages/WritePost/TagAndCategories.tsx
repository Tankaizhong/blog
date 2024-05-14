import React, { useEffect, useState } from 'react'
import { Form, Button, message, Select, Input, Flex } from 'antd'
import { CategoryType, TagType } from '@/types/model'
import { fetchCategories, fetchTags } from '@/api/posts'
import '@/styles/tag-and-categories.less'
import { getStorage, removeStorage, saveStorage } from '@/utils/storage'
import { LOCAL_STORAGE_POST } from '@/config'

const TagAndCategories = ({ onSubmit }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]) // 分类列表
  const [tags, setTags] = useState<TagType[]>([]) // 标签列表
  const [form] = Form.useForm()

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

    // 从 localStorage 恢复表单值
    const savedValues = getStorage('tagAndCategoriesForm')
    if (savedValues) {
      form.setFieldsValue(savedValues)
    }
  }, [])

  const handleSubmit = (values: any) => {
    onSubmit(values)
    removeStorage('tagAndCategoriesForm') // 发布成功后删除本地存储
    removeStorage(LOCAL_STORAGE_POST) //文章也清除
  }

  //本地存储
  const handleFieldsChange = (changedFields: any, allFields: any) => {
    const newValues = allFields.reduce((acc: any, field: any) => {
      acc[field.name[0]] = field.value
      return acc
    }, {})
    saveStorage('tagAndCategoriesForm', JSON.stringify(newValues)) // 保存到 localStorage
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="tag-and-categories-content"
      onFieldsChange={handleFieldsChange}
    >
      {/* 分类选择 */}
      <Form.Item
        name="selectedCategory"
        label="分类"
        rules={[{ required: true, message: '请选择分类' }]}
      >
        <Select style={{ width: '100%' }}>
          {categories.map((category) => (
            <Select.Option key={category.CategoryID} value={category.CategoryName}>
              {category.CategoryName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* 标签选择 */}
      <Form.Item
        name="selectedTags"
        label="添加标签"
        rules={[{ required: true, message: '请选择至少一个标签', type: 'array' }]}
      >
        <Select mode="multiple" style={{ width: '100%' }}>
          {tags.map((tag) => (
            <Select.Option key={tag.TagID} value={tag.TagName}>
              {tag.TagName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* 摘要输入 */}
      <Form.Item name="summary" label="摘要" rules={[{ required: true, message: '请输入摘要' }]}>
        <Input.TextArea />
      </Form.Item>

      {/* 确认按钮 */}
      <Form.Item>
        <Flex jusitify="space-around">
          <Button htmlType="button" onClick={() => form.resetFields()}>
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确认并发布
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  )
}

export default TagAndCategories
