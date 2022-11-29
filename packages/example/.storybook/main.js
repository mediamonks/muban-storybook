const { hbsRules, mubanResolve } = require("../build-tools/webpack/config");

module.exports = {
  core: {
    builder: "webpack5",
  },
  features: {
    previewCsfV3: true,
  },
  stories: [
    {
      directory: "../src/app/component",
      titlePrefix: "",
      files: "*.stories.*",
    },
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-postcss",
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need

    config.module.rules.push(...hbsRules);

    config.resolve = {
      ...config.resolve,
      ...mubanResolve.resolve,
      extensions: [
        ...mubanResolve.resolve.extensions,
        ...config.resolve.extensions,
      ],
    };

    // Return the altered config
    return config;
  },
};
