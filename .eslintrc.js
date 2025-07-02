module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    // UI组件库常用的规则禁用
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'no-trailing-spaces': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'warn', // 将console从错误降级为警告
  },
}; 