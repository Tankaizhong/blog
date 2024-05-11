import React from 'react'
import { MenuProps } from 'antd'
import { MenuItem } from '@/types'
import { Menu } from 'antd'
import { navItems } from '@/components/Home/Header/nav-items'
import '@/styles/menu.less'
import { navigateTo } from '@/utils/router'

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode | null,
  items?: MenuItem[],
  type?: 'group'
): MenuItem {
  // console.log('getItem', label, key, icon, children, type)
  return {
    key,
    icon,
    label,
    type,
    className: 'custom-menuNav-item',
  } as MenuItem
}

function menuNav() {
  const onClick: MenuProps['onClick'] = (e) => {
    // navigateTo('/' + e.key)
    switch (e.key) {
      case 'home':
        navigateTo('/home/all')
        break
      case 'posts':
        navigateTo('/' + e.key)
        break
      case 'chat':
        navigateTo('/' + e.key)
        break
      case 'login':
        navigateTo('/' + e.key)
        break
      case 'register':
        navigateTo('/' + e.key)
        break
      case 'post':
        navigateTo('/' + e.key)
        break
      case 'profile':
        navigateTo('/' + e.key)
        break
      case 'logout':
        navigateTo('/' + e.key)
        break
      default:
        navigateTo('/' + e.key + '/all')
        break
    }
  }

  return (
    <>
      <Menu
        onClick={onClick}
        className="custom-menu"
        defaultSelectedKeys={['home']}
        defaultOpenKeys={['home']}
        mode="horizontal"
        items={navItems.map((item) => getItem(item.label, item.key, item.icon, item.type))}
      />
    </>
  )
}

export default menuNav
