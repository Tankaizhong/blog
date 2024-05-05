import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Input, message, Space, Table } from 'antd'
import { PlusOutlined, CategoryOutlined } from '@ant-design/icons'
import { addCategory, deleteCategory, getAllCategories, updateCategory } from '../api/category'
import '../style/CategoryManager.less'
import { CategoryType } from '@/types/model'
import { showConfirm } from '@/utils/button' // 假设你有一个名为 CategoryModal 的类型定义

const { confirm } = Modal

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [visible, setVisible] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories()
      if (data && data.categories) {
        setCategories(data.categories)
      } else {
        console.error('获取分类失败：数据或分类属性不存在')
      }
    } catch (error) {
      console.error('获取分类失败：', error)
    }
  }

  const handleAddCategory = async () => {
    try {
      const values = await form.validateFields()
      await addCategory(values)
      message.success('分类添加成功')
      await fetchCategories()
      form.resetFields()
      setVisible(false)
    } catch (error) {
      console.error('添加分类失败：', error)
    }
  }
  const handleDelete = async (category: CategoryType) => {
    try {
      await deleteCategory(category.CategoryID)
      message.success('分类删除成功')
      fetchCategories()
    } catch (error) {
      console.error('删除分类失败：', error)
    }
  }

  const handleEditCategory = async () => {
    try {
      const values = await form.validateFields()
      if (!editingCategory) return
      await updateCategory({ CategoryID: editingCategory.CategoryID, ...values })
      message.success('分类更新成功')
      await fetchCategories()
      setEditingCategory(null)
      setVisible(false)
    } catch (error) {
      console.error('更新分类失败：', error)
    }
  }

  const handleEdit = (category: CategoryType) => {
    setEditingCategory(category)
    form.setFieldsValue({
      CategoryName: category.CategoryName,
      CategoryAlias: category.CategoryAlias,
      CategoryDescription: category.CategoryDescription,
    })
    setVisible(true)
  }

  const columns = [
    {
      title: '分类名',
      dataIndex: 'CategoryName',
      key: 'CategoryName',
    },
    {
      title: '分类别名',
      dataIndex: 'CategoryAlias',
      key: 'CategoryAlias',
    },
    {
      title: '分类描述',
      dataIndex: 'CategoryDescription',
      key: 'CategoryDescription',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record: CategoryType) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => showConfirm(() => handleDelete(record))}>删除</a>
        </Space>
      ),
    },
  ]

  return (
    <div className="category-manager">
      <Button
        type="primary"
        onClick={() => {
          setVisible(true)
          form.resetFields()
          setEditingCategory(null)
        }}
      >
        <PlusOutlined /> 添加新分类
      </Button>
      <Modal
        title={editingCategory ? '编辑分类' : '添加分类'}
        open={visible}
        onOk={editingCategory ? handleEditCategory : handleAddCategory}
        onCancel={() => setVisible(false)}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="CategoryName"
            label="分类名"
            rules={[{ required: true, message: '请输入分类名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="CategoryAlias" label="分类别名">
            <Input />
          </Form.Item>
          <Form.Item name="CategoryDescription" label="分类描述">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <div className="categories-list">
        <Table columns={columns} dataSource={categories} rowKey="CategoryID" />
      </div>
    </div>
  )
}

export default CategoryManager
