module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    process.env.DISABLE_LINT ? 'off' : 'eslint:recommended',
    process.env.DISABLE_LINT ? 'off' : 'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
}
