module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['airbnb', 'prettier', 'prettier/react', 'wesbos'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier', 'react-hooks'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'react/prop-types': 0,
    'react/jsx-boolean-value': 1,
    'max-len': [
      1,
      {
        code: 180,
        ignoreStrings: true
      }
    ],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', '__NEXT_REDUX_STORE__']
      }
    ],
    'no-param-reassign': [
      'error',
      {
        props: false
      }
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ]
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        root: ['./src'],
        alias: {
          components: './src/components',
          config: './src/config',
          containers: './src/containers',
          layouts: './src/layouts',
          routes: './src/routes',
          utils: './src/utils'
        },
        extensions: ['.js', '.jsx']
      }
    }
  }
};
