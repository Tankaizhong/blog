// ResponsiveNavbar.tsx
import React, { useEffect, useState } from 'react'
import '../../styles/home.less'
import Header from '@/components/Home/Header/Header'
import { Layout, theme, Menu, Flex } from 'antd'
import type { MenuProps } from 'antd'
import type { CategoryType } from '@/types/model'
import { fetchCategoriesList, fetchPostByCategory } from '@/api/posts'
import PageFooter from '@/components/PageFooter'
import { Outlet, Route, useNavigate } from 'react-router-dom'
import { register } from '@/api/user'
import { ADMIN } from '@/config'
import { getUserInfo } from '@/admin/api/admin'
import RightContent from '@/pages/Home/RightContent'

const { Content, Footer, Sider } = Layout

const Home: React.FC = () => {
  const [sharedState, setSharedState] = useState<any>(null)
  //渲染菜单
  const renderMenuItems = (categories: CategoryType[]) => {
    return categories.map((category) => ({
      key: category.CategoryID,
      label: category.CategoryName,
    }))
  }

  const [categories, setCategories] = useState([]) // 状态用于存储分类列表
  const fetchCategories = async () => {
    try {
      const { data } = await fetchCategoriesList() // 调用 fetchCategoriesList 方法
      setCategories(renderMenuItems(data))
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const checkSuperAdmin = async () => {
    try {
      // 发起检查超级管理员的请求，假设存在名为 checkSuperAdmin 的 API 方法
      const hasSuperAdmin = await getUserInfo({
        Username: ADMIN.NAME,
      }) // 假设 checkSuperAdmin 方法返回一个布尔值表示是否存在超级管理员
      if (!hasSuperAdmin) {
        // 如果不存在超级管理员，则创建超级管理员
        await register({
          Password: ADMIN.PASSWORD,
          Username: ADMIN.NAME,
          Admin: true,
        }) // 假设 createUser 方法用于创建超级管理员
        console.log('Super admin created successfully')
      }
    } catch (error) {
      console.error('Error checking super admin:', error)
      // 在这里处理检查超级管理员失败的情况
    }
  }
  useEffect(() => {
    // 在 useEffect 中发起请求
    fetchCategories().then((res) => {
      // console.log("ok")
    })
    checkSuperAdmin()
      .then((res) => {
        // console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []) // 第二个参数为依赖数组，表示仅在组件挂载时执行一次
  const navigate = useNavigate()
  const handleMenuClick = (e: MenuProps['onClick']) => {
    console.log(e.key)
    setSharedState(e.key)

    navigate(`/home/all/${e.key}`)
  }

  return (
    <div className="home">
      <Header />
      <div className="Contain">
        <Flex justify="space-around" gap="small" align="start" horizontal="true">
          <div className="home-sider">
            <Sider>
              <Menu
                mode="inline"
                onClick={handleMenuClick} // 添加点击事件处理函数
                items={categories}
                defaultSelectedKeys={categories.length > 0 ? categories[0].key : []} // 设置默认选中项的 key
              />
            </Sider>
          </div>
          <div className="home-content">
            {/*<HomeContent sharedState={sharedState} setSharedState={setSharedState} />*/}
            <Outlet />
          </div>
          <RightContent />
        </Flex>
      </div>
      {/*页脚*/}
      <PageFooter />
    </div>
  )
}

export default Home
