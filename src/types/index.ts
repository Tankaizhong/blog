import React from 'react'
import type { MenuProps, SelectProps } from 'antd'

export interface IRoute {
  path: string
  name?: string
  // auth: boolean
  element: React.ReactNode
  // meta: IMeta;
  children?: IRoute[]
}

export type MenuItem = Required<MenuProps>['items'][number]

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<ValueType[]>
  debounceTimeout?: number
}

export interface UserValue {
  label: string
  value: string
}

export interface UserInfo {
  userID: number
  username: string
  email: string
  age?: number // 可选字段
  phoneNumber?: string // 可选字段
  token?: string
}

export interface ResponseLogin {
  code: string
  message: string
  result: {
    UserID: number
    Username: string
    Admin: boolean
    token: string
  }
}
