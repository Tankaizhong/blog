import React from 'react'
import MenuList from '@/components/MenuNav'
import { Flex, Input } from 'antd'
import UserNav from '@/components/UserNav'
import UserSearch from '@/components/UserSearch'
import '@/styles/header.less'
const Header = () => {
  return (
    <div className="headerContent">
      <Flex justify="space-between" gap="middle" align="center">
        <div className="logo">
          <h3>BOLG</h3>
        </div>
        <MenuList />
        <UserSearch />
        <UserNav />
      </Flex>
    </div>
  )
}

export default Header
