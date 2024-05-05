import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../Button' // 假设你的按钮组件在 Button.js 文件中

describe('Button 组件测试', () => {
  test('按钮渲染正常', () => {
    render(<Button>Click me</Button>)
    const buttonElement = screen.getByText(/click me/i)
    expect(buttonElement).toBeInTheDocument()
  })

  test('按钮点击事件正常触发', () => {
    const onClickMock = jest.fn()
    render(<Button onClick={onClickMock}>Click me</Button>)
    const buttonElement = screen.getByText(/click me/i)
    buttonElement.click()
    expect(onClickMock).toHaveBeenCalled()
  })
  test('按钮是否有指定的类名', () => {
    render(<Button className="custom-button">Click me</Button>)
    const buttonElement = screen.getByText(/click me/i)
    expect(buttonElement).toHaveClass('custom-button')
  })

  test('按钮是否有指定的样式', () => {
    render(<Button style={{ color: 'red' }}>Click me</Button>)
    const buttonElement = screen.getByText(/click me/i)
    expect(buttonElement).toHaveStyle({ color: 'red' })
  })

  test('按钮是否可点击', () => {
    render(<Button disabled>Click me</Button>)
    const buttonElement = screen.getByText(/click me/i)
    expect(buttonElement).toBeDisabled()
  })
  // 测试是否可以设置按钮的自定义文本内容
  test('按钮是否可以设置自定义文本内容', () => {
    render(<Button>Custom Text</Button>)
    const buttonElement = screen.getByText(/custom text/i)
    expect(buttonElement).toBeInTheDocument()
  })

  // 测试是否可以设置按钮的自定义类名
  test('按钮是否可以设置自定义类名', () => {
    render(<Button className="custom-class">Click me</Button>)
    const buttonElement = screen.getByText(/click me/i)
    expect(buttonElement).toHaveClass('custom-class')
  })

  // 测试是否可以设置按钮的自定义样式
  test('按钮是否可以设置自定义样式', () => {
    render(<Button style={{ backgroundColor: 'blue' }}>Click me</Button>)
    const buttonElement = screen.getByText(/click me/i)
    expect(buttonElement).toHaveStyle({ backgroundColor: 'blue' })
  })

  // 测试是否可以设置按钮的禁用状态
  test('按钮是否可以设置禁用状态', () => {
    render(<Button disabled>Click me</Button>)
    const buttonElement = screen.getByText(/click me/i)
    expect(buttonElement).toBeDisabled()
  })

  // 测试是否可以设置按钮的自定义属性
  test('按钮是否可以设置自定义属性', () => {
    render(<Button testId="custom-button">Click me</Button>)
    const buttonElement = screen.getByTestId('custom-button')
    expect(buttonElement).toBeInTheDocument()
  })

  // 测试是否可以设置按钮的自定义点击事件
  test('按钮是否可以设置自定义点击事件', () => {
    const customOnClick = jest.fn()
    render(<Button onClick={customOnClick}>Click me</Button>)
    const buttonElement = screen.getByText(/click me/i)
    buttonElement.click()
    expect(customOnClick).toHaveBeenCalled()
  })
})
