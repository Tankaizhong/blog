import React, { useMemo, useRef, useState } from 'react'
import { Select, Spin } from 'antd'
import type { SelectProps } from 'antd'
import '@/styles/usersearch.less'
import { DebounceSelectProps, UserValue } from '@/types'
import debounce from 'lodash/debounce'
import { fetchPostList } from '@/api/posts'

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
  function DebounceSelect<
    ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any,
  >({ fetchOptions, debounceTimeout = 800, ...props }: DebounceSelectProps<ValueType>) {
    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState<ValueType[]>([])
    const fetchRef = useRef(0)

    const debounceFetcher = useMemo(() => {
      const loadOptions = (value: string) => {
        fetchRef.current += 1
        const fetchId = fetchRef.current
        setOptions([])
        setFetching(true)

        fetchOptions(value).then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return
          }

          setOptions(newOptions)
          setFetching(false)
        })
      }

      return debounce(loadOptions, debounceTimeout)
    }, [fetchOptions, debounceTimeout])
    //生成fetchUserList
    return (
      <div>
        <Select
          mode="tags"
          className="custom-user-search"
          onChange={handleChange}
          onSearch={debounceFetcher}
          tokenSeparators={[',']}
          options={options}
          labelInValue
        />
      </div>
    )
  }

  //用户选择
  const [value, setValue] = useState<UserValue[]>([])

  return (
    <div className="userSearch">
      <DebounceSelect
        className="customUserSearch"
        // mode="multiple"
        value={value}
        placeholder="探索blog"
        fetchOptions={fetchPostList}
        onChange={(newValue) => {
          setValue(newValue as UserValue[])
        }}
      />
    </div>
  )
}
export default UserSearch
