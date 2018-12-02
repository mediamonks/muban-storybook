module.exports = () => webpackConfig => ({
  ...webpackConfig,
  entry: {
    app: [
      './src/client/polyfill/index.js',
      './src/client/bootstrap.js',
    ],
  },
});
