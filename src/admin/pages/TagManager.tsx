import React, { useState, useEffect } from 'react'
import { Button, Tag, Modal, Form, Input, message, Space, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { addTag, deleteTag, getAllTags, updateTag } from '../api/tag'
import '../style/TagManager.less'
import { TagModal } from '@/types/model' // 引入样式文件

const { confirm } = Modal

const TagManager: React.FC = () => {
  const [tags, setTags] = useState<TagModal[]>([])
  const [visible, setVisible] = useState(false)
  const [editingTag, setEditingTag] = useState<TagModal | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchTags()
  }, [])

  const fetchTags = async () => {
    try {
      const data = await getAllTags()
      if (data && data.tags) {
        const processedTags = data.tags.map((tag: TagModal, index) => {
          return {
            ...tag,
            key: tag.TagID,
          }
        })
        setTags(processedTags)
      } else {
        console.error('获取标签失败: 数据或标签属性不存在')
      }
    } catch (error) {
      console.error('获取标签失败:', error)
    }
  }

  const handleAddTag = async () => {
    // console.log('111111111')
    try {
      const values = await form.validateFields()
      await addTag(values)
      message.success('标签添加成功')
      await fetchTags()
      form.resetFields()
      setVisible(false)
    } catch (error) {
      console.error('添加标签失败:', error)
    }
  }

  const showDeleteConfirm = (tag: TagModal) => {
    confirm({
      title: '确定要删除此标签吗?',
      content: '此操作无法撤销',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteTag(tag.TagID)
          .then(() => {
            message.success('标签删除成功')
            fetchTags()
          })
          .catch((error) => {
            console.error('删除标签失败:', error)
          })
      },
      onCancel() {
        console.log('已取消删除')
      },
    })
  }

  const handleEditTag = async () => {
    console.log('编辑了', editingTag)
    try {
      const values = await form.validateFields()
      if (!editingTag) return
      await updateTag({ TagID: editingTag.TagID, ...values })
      message.success('标签更新成功')
      await fetchTags()
      setEditingTag(null)
      setVisible(false)
    } catch (error) {
      console.error('更新标签失败:', error)
    }
  }

  const handleEdit = (tag: TagModal) => {
    setEditingTag(tag)
    console.log(editingTag)
    form.setFieldsValue({
      TagName: tag.TagName,
      TagAlias: tag.TagAlias,
      TagDescription: tag.TagDescription,
    })
    setVisible(true)
  }

  const columns = [
    {
      title: '标签ID',
      dataIndex: 'TagID',
      key: 'TagID',
    },
    {
      title: '标签名',
      dataIndex: 'TagName',
      key: 'TagName',
    },
    {
      title: '标签别名',
      dataIndex: 'TagAlias',
      key: 'TagAlias',
    },
    {
      title: '标签描述',
      dataIndex: 'TagDescription',
      key: 'TagDescription',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record: TagModal) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => showDeleteConfirm(record)}>删除</a>
        </Space>
      ),
    },
  ]
  // console.log(editingTag)
  return (
    <div className="tag-manager">
      <Button
        type="primary"
        onClick={() => {
          form.resetFields()
          setVisible(true)
          setEditingTag(null)
        }}
      >
        <PlusOutlined /> 添加新标签
      </Button>
      <Modal
        title={editingTag ? '编辑标签' : '添加标签'}
        open={visible}
        onOk={editingTag ? handleEditTag : handleAddTag}
        onCancel={() => {
          setVisible(false)
          setEditingTag(null)
        }}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="TagName"
            label="标签名"
            rules={[{ required: true, message: '请输入标签名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="TagAlias" label="标签别名">
            <Input />
          </Form.Item>
          <Form.Item name="TagDescription" label="标签描述">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
      <div className="tags-list">
        <Table columns={columns} dataSource={tags} rowKey="TagID" />
      </div>
    </div>
  )
}

export default TagManager
