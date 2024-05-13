import React from 'react'
import MenuList from '@/components/Home/Header/MenuNav'
import { Button, Flex, Input } from 'antd'
import UserNav from '@/components/Home/Header/UserNav'
import UserSearch from '@/components/Home/UserSearch'
import '@/styles/header.less'
import { navigateTo } from '@/utils/router'

const Header = React.forwardRef((props, ref) => {
  /**
   * 跳转到创作者中心
   */
  const handleCreator = () => {
    // console.log(1)
    navigateTo('/home/creator')
  }
  return (
    <div className="header-content">
      <Flex justify="space-around" gap="small" align="center">
        <div className="header-menu-log">
          <Flex justify="space-around" gap="small" align="center">
            <a className="logo" href="/home/all">
              <h3>BOLG</h3>
            </a>
            <MenuList />
          </Flex>
        </div>
        {/*搜索*/}
        <UserSearch />
        <Button ref={ref} type="primary" onClick={handleCreator}>
          创作者中心
        </Button>
        <UserNav />
      </Flex>
    </div>
  )
})

export default Header
