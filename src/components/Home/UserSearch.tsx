import React, { useMemo, useRef, useState } from 'react'
import { Select, Spin } from 'antd'
import type { SelectProps } from 'antd'
import '@/styles/user-search.less'
import { DebounceSelectProps, UserValue } from '@/types'
import { Input, Space } from 'antd'

const { Search } = Input
import type { SearchProps } from 'antd/es/input/Search'

const UserSearch = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }
  //选择处理
  const options: SelectProps['options'] = []
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    })
  }

  //防抖
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)
  //用户选择
  const [value, setValue] = useState<UserValue[]>([])
  const searchHistory = (value: string) => {
    return [1, 2, 3]
  }
  return (
    <div className="userSearch">
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
    </div>
  )
}
export default UserSearch
