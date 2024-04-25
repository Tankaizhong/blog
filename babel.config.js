module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    '@babel/preset-react', // 如果需要支持 React 的 JSX 语法，请添加此 preset
  ],
}
