import { MenuProps } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'

export const navItems: MenuProps['navItems'] = [
  {
    label: '用户',
    key: 'user',
    icon: <UserOutlined />, // Add an appropriate icon component for user, for example, UserOutlined
  },
]
