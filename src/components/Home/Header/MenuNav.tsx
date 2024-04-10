import React from 'react'
import { MenuProps } from 'antd'
import { MenuItem } from '@/types'
import { Menu } from 'antd'
import { navItems } from '@/containers/nav-items'
import '@/styles/menu.less'
import { useRouter } from '@/utils/router'

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode | null,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  // console.log('getItem', label, key, icon, children, type)
  return {
    key,
    icon,
    children,
    label,
    type,
    className: 'custom-menuNav-item',
  } as MenuItem
}

function menuNav(props) {
  const { navigateTo } = useRouter()
  const onClick: MenuProps['onClick'] = (e) => {
    // console.log('click ', e.key)
    navigateTo('/' + e.key)
  }
  // console.log(navItems)
  return (
    <>
      <Menu
        onClick={onClick}
        className="custom-menu"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="horizontal"
        items={navItems.map((item) =>
          getItem(item.label, item.key, item.icon, item.children, item.type)
        )}
      />
    </>
  )
}

export default menuNav
