// jest.config.js
module.exports = {
  // 其他配置...
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '\\.(css|less)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },
}
