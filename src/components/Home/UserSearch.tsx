import React, { useEffect, useState } from 'react'
import { AutoComplete, Input } from 'antd'

import { useLocation } from 'react-router-dom'
import { navigateTo } from '@/utils/router'

const { Search } = Input

const UserSearch = () => {
  const [searchHistory, setSearchHistory] = useState([])
  const [autoCompleteVisible, setAutoCompleteVisible] = useState(false) // 控制下拉菜单的显示状态
  const [searchValue, setSearchValue] = useState('') // 初始化搜索框的值

  const location = useLocation()

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const query = queryParams.get('query') // 获取查询参数
    setSearchValue(query || '') // 设置搜索框的值
    const storedHistory = sessionStorage.getItem('searchHistory')
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory))
    }
  }, [location.search])

  const handleSearch = (value) => {
    setAutoCompleteVisible(false) // 搜索后关闭下拉菜单
  }

  const onSelect = (value) => {
    // console.log('onSelect', value);
  }

  const handleEnter = (value) => {
    if (value) {
      const updatedHistory = [
        { value, key: Date.now() },
        ...searchHistory.filter((item, index) => index < 4),
      ] // 限制为5条
      setSearchHistory(updatedHistory)
      sessionStorage.setItem('searchHistory', JSON.stringify(updatedHistory))
    }
    console.log('开始搜索')
    navigateTo(`/home/all/*/search?query=${value}`)
  }

  return (
    <div className="userSearch">
      <AutoComplete
        options={searchHistory.map((item) => ({ value: item.value, key: item.key }))}
        onSelect={onSelect}
        onSearch={handleSearch}
        open={autoCompleteVisible} // 控制下拉菜单的显示状态
        onFocus={() => setAutoCompleteVisible(true)} // 输入框获取焦点时显示下拉菜单
        onBlur={() => setAutoCompleteVisible(false)} // 输入框失去焦点时关闭下拉菜单
      >
        <Search
          value={searchValue} // 设置搜索框的值
          onSearch={handleEnter}
          size="large"
          placeholder="输入关键词搜索"
          enterButton
        />
      </AutoComplete>
    </div>
  )
}

export default UserSearch
