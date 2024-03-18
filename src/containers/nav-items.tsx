import { MenuProps } from 'antd'
import {
  AlignLeftOutlined,
  AppstoreOutlined,
  HomeOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'

export const navItems: MenuProps['navItems'] = [
  {
    label: '主页',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: '综合',
    key: 'articles',
    icon: <AppstoreOutlined />,
  },
  {
    label: '分类',
    key: 'categories',
    icon: <SettingOutlined />,
  },
  {
    label: '排行',
    key: 'rank',
    icon: <AlignLeftOutlined />, // Add an appropriate icon component for user, for example, UserOutlined
  },
]
