module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '.lintstagedrc.cjs', 'commitlint.config.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // JSX 문법을 사용할 수 있도록 설정합니다.
    },
  },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'prettier', '@typescript-eslint'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off', // #20240429.syjang, React.FC<ProtectedRouteProps> 형태의 타입 선언으로 충분하도록 설정 추가
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
