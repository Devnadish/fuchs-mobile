module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@component": "./component",
            "@api": "./api",
            "@constants": "./constants",
            "@hooks": "./hooks",
            "@lib": "./lib",
            "@styles": "./styles",
            "@util": "./util",
            "@provider": "./provider",
          },
        },
      ],
    ],
  };
};

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: ["react-native-reanimated/plugin"],
//   };
// };
