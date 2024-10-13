/* eslint-disable */
module.exports = {
  extends: [
    'expo',
    'prettier',
    'plugin:react/recommended', // React recommended rules
    'plugin:import/errors',      // Import plugin errors
    'plugin:import/warnings',    // Import plugin warnings
  ],
  plugins: ['prettier', 'react', 'import'],

  rules: {
    'prettier/prettier': 'error',
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'off',
    'import/no-unresolved': 'error', // Enable to catch unresolved imports
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-undef': 'error',
    'react/prop-types': 'off', // Disable prop-types if using TypeScript
    'react/jsx-uses-react': 'off', // React 17+
    'react/react-in-jsx-scope': 'off', // React 17+
    // Uncomment if you want to enforce unused modules rule
    // 'import/no-unused-modules': [1, { unusedExports: true }],
  },

  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
    'import/resolver': {
      'babel-module': {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
          '@component': './component',
          '@api': './api',
          '@constants': './constants',
          '@hooks': './hooks',
          '@lib': './lib',
          '@styles': './styles',
          '@util': './util',
          '@provider': './provider',
        },
      },
      'babel': {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};




// /* eslint-disable */
// module.exports = {
//   extends: ['expo', 'prettier'],
//   plugins: ['prettier'],

//   rules: {
//     'prettier/prettier': 'error',
//     'import/no-unresolved': 'off',
//     'import/extensions': 'off',
//     'import/no-extraneous-dependencies': 'off',
//     'import/named': 'error',
//     'import/default': 'error',
//     'import/namespace': 'off',
//     // 'import/no-unused-modules': [1, { unusedExports: true }],
//     'no-undef': 'error',
//   },
//   settings: {
//     'import/resolver': {
//       'babel-module': {
//         extensions: ['.js', '.jsx', '.ts', '.tsx'],
//         alias: {
//           '@component': './component',
//           '@api': './api',
//           '@constants': './constants',
//           '@hooks': './hooks',
//           '@lib': './lib',
//           '@styles': './styles',
//           '@util': './util',
//           '@provider': './provider',
//         },
//       },
//     },
//   },
// };
