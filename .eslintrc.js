module.exports = {
  env: {
    browser: true,
    es6: true,
  },

  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    // 'plugin:prettier/recommended',
    'prettier',
    'prettier/prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 0,
    'no-console': 'error',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'jsx-a11y/no-onchange': 'off',
    'no-use-before-define': 'off',
    'no-named-as-default': 'off',
    'no-nested-ternary': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    // 'import/no-extraneous-dependencies': ['error', { ignore: 'styled-components/' }],
    'object-curly-newline': 0,
    'react/require-default-props': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-one-expression-per-line': 0,
    'react/no-array-index-key': 1,
    'react/jsx-props-no-spreading': 1,
    'consistent-return': 0,
    'no-restricted-globals': 0,
    camelcase: [
      'error',
      {
        allow: [
          'main_text',
          'secondary_text',
          'main_text_matched_substrings',
          'structured_formatting',
          'return_scopes',
          'safari_web_id',
        ],
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
