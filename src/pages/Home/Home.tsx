// ResponsiveNavbar.tsx
import React, { useEffect, useRef, useState } from 'react'
import '../../styles/home.less'
import Header from '@/components/Home/Header/Header'
import { Layout, Menu, Flex, Button, Tour } from 'antd'
import type { MenuProps } from 'antd'
import type { CategoryType } from '@/types/model'
import { fetchCategoriesList } from '@/api/posts'
import PageFooter from '@/components/PageFooter'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { register } from '@/api/user'
import { ADMIN } from '@/config'
import { getUserInfo } from '@/admin/api/admin'
import RightContentHotPost from '@/pages/Home/RightContentHotPost'
import RightContentLocation from '@/pages/Home/RightContentLocation'
import { UserList } from '@/pages/Home/List'
import { isFirstTimeUser } from '@/utils/user'

const { Sider } = Layout

const Home: React.FC = () => {
  //渲染菜单
  const renderMenuItems = (categories: CategoryType[]) => {
    return categories.map((category) => ({
      key: category.CategoryID,
      label: category.CategoryName,
    }))
  }

  const [categories, setCategories] = useState([]) // 状态用于存储分类列表
  //用户列表 我的点赞 我的评论等
  const [userList, setUserList] = useState([])

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
      // 发起检查超级管理员的请求
      const hasSuperAdmin = await getUserInfo({
        Username: ADMIN.NAME,
      }) // 假设 checkSuperAdmin 方法返回一个布尔值表示是否存在超级管理员
      if (!hasSuperAdmin) {
        // 如果不存在超级管理员，则创建超级管理员
        await register({
          LoginCount: 0,
          Status: 'active',
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
    fetchCategories().then(() => {
      //获取到list之后,并且第一次登陆 显示漫游式引导
      if (isFirstTimeUser()) {
        setShowTour(true)
      }
    })
    checkSuperAdmin()
      .then(() => {})
      .catch((err) => {
        console.log(err)
      })
  }, []) // 第二个参数为依赖数组，表示仅在组件挂载时执行一次
  const navigate = useNavigate()
  const handleMenuClick = (e: MenuProps['onClick']) => {
    if (location.pathname.includes('creator')) {
      navigate(`/home/creator/${e.key}`)
    } else {
      navigate(`/home/all/${e.key}`)
    }
  }

  //根据location渲染menu
  const location = useLocation()
  useEffect(() => {
    if (location.pathname.includes('creator')) {
      setUserList(UserList)
    }
  }, [location.pathname])

  //漫游导航 第一次登陆的时候显示
  const [showTour, setShowTour] = useState(false) // 控制漫游式引导的显示与隐藏
  const menuRef = useRef(null)
  const creatorRef = useRef(null)
  const sliderRef = useRef(null)
  // 漫游式引导的步骤
  const steps = [
    {
      title: '侧边栏',
      description: '这是文章的分类。',
      target: () => sliderRef.current,
    },
    {
      title: '创作者中心',
      description: '这是创作者中心，您可以在这里查看和发布文章。',
      target: () => creatorRef.current,
    },
  ]

  return (
    <div className="home">
      <Header ref={creatorRef} />
      <div className="Contain">
        <Flex justify="space-around" gap="small" align="start" horizontal="true">
          <div className="home-sider">
            <Sider ref={sliderRef}>
              {location.pathname.includes('creator') ? (
                <Button
                  href="/draft"
                  type="primary"
                  style={{
                    width: '100%',
                    borderRadius: '0',
                    marginBottom: '10px',
                  }}
                >
                  写文章
                </Button>
              ) : null}
              <Menu
                mode="inline"
                onClick={handleMenuClick} // 添加点击事件处理函数
                items={location.pathname.includes('creator') ? userList : categories}
                defaultSelectedKeys={['']} // 设置默认选中项的 key
              />
            </Sider>
          </div>
          <div className="home-content">
            <Outlet />
          </div>
          <div className="home-right-content">
            <Flex vertical={true}>
              <RightContentHotPost />
              <RightContentLocation />
            </Flex>
          </div>
        </Flex>
      </div>
      {/*页脚*/}
      <PageFooter />
      {/*  导航*/}
      <Tour
        steps={steps} // 漫游式引导的步骤
        open={showTour} // 控制漫游式引导的显示与隐藏
        onClose={() => setShowTour(false)} // 关闭漫游式引导时的回调函数
      />
    </div>
  )
}

export default Home
