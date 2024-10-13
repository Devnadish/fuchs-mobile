/* eslint-disable */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo', // Keep your existing preset
    ],
    plugins: [
      'react-native-reanimated/plugin', // Keep existing plugin
      [
        'module-resolver',
        {
          alias: {
            // Define your aliases
            '@component': './component',
            '@api': './api',
            '@constants': './constants',
            '@hooks': './hooks',
            '@lib': './lib',
            '@styles': './styles',
            '@util': './util',
            '@provider': './provider',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'], // Ensure it resolves these extensions
        },
      ],
      // Use the new decorators syntax if applicable
     
    ],
  };
};



// /* eslint-disable */
// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [
//       'react-native-reanimated/plugin',
//       [
//         'module-resolver',
//         {
//           alias: {
//             '@component': './component',
//             '@api': './api',
//             '@constants': './constants',
//             '@hooks': './hooks',
//             '@lib': './lib',
//             '@styles': './styles',
//             '@util': './util',
//             '@provider': './provider',
//           },
//         },
//       ],
//       // Use the new decorators syntax if applicable
//       ['@babel/plugin-proposal-decorators', { legacy: false }],
//     ],
//   };
// };

// //babel.config.js
// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],

//     plugins: [
//       "react-native-reanimated/plugin",
//       [
//         "module-resolver",
//         {
//           alias: {
//             "@component": "./component",
//             "@api": "./api",
//             "@constants": "./constants",
//             "@hooks": "./hooks",
//             "@lib": "./lib",
//             "@styles": "./styles",
//             "@util": "./util",
//             "@provider": "./provider",
//           },
//         },
//       ],
//     ],
//   };
// };
