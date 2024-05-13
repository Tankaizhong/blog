import { MenuProps } from 'antd'
import {
  AlignLeftOutlined,
  AppstoreOutlined,
  HomeOutlined,
  MessageOutlined,
  SettingOutlined,
} from '@ant-design/icons'

export const navItems: MenuProps['navItems'] = [
  {
    label: '主页',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: '排行',
    key: 'user',
    icon: <AlignLeftOutlined />, // Add an appropriate icon component for user, for example, UserOutlined
  },
  {
    label: '人工智能聊天',
    key: 'chat',
    icon: <MessageOutlined />, // 适当的图标，例如 MessageOutlined
  },
]
