// ResponsiveNavbar.tsx
import React, {useEffect, useState} from 'react'
import '../../styles/home.less'
import Header from '@/components/Home/Header'
import LayoutContent from '@/components/Home/LayoutContent'
import {Layout, theme, Menu} from "antd";
import type {MenuProps} from 'antd';
import type {Category} from "@/types/model"
import {fetchCategoriesList} from "@/api/posts";

const {Content, Footer, Sider} = Layout;

const Home: React.FC = () => {
    //渲染菜单
    const renderMenuItems = (categories: Category[]) => {
        return categories.map(category => ({
            key: category.CategoryID,
            label: category.CategoryName,
        }));
    };

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    const [categories, setCategories] = useState([]); // 状态用于存储分类列表
    useEffect(() => {
        // 在 useEffect 中发起请求
        const fetchCategories = async () => {
            try {
                const {data} = await fetchCategoriesList(); // 调用 fetchCategoriesList 方法
                setCategories(renderMenuItems(data))
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories().then(res => {
            console.log("ok")
        });

    }, []); // 第二个参数为依赖数组，表示仅在组件挂载时执行一次

    return (
        <>
            <Header/>
            <div className="Contain">
                <Layout>
                    <div className="home-sider"><Sider width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                            items={categories}
                        />
                    </Sider>
                    </div>

                    <div className="home-content">
                        <Content>Content</Content>
                    </div>
                    {/*<LayoutContent/>*/}
                </Layout>
            </div>

        </>
    )
}

export default Home
