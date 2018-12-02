const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

exports.getSassLoaderConfig = function(isDevelopment) {
  return [
    {
      loader: 'sass-loader',
      options: {
        data: '@import "src/client/asset/style/utils.scss";',
        includePaths: ['src/client/asset/style'],
        sourceMap: isDevelopment
      },
    },
  ];
};

exports.getBabelLoaderConfig = function(isDevelopment) {
  return {
    loader: 'babel-loader',
    options: {
      cacheDirectory: isDevelopment,
    },
  };
};

exports.getCssLoaderConfig = function(isDevelopment) {
  const config = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDevelopment
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: isDevelopment
      }
    },
  ];

  if (isDevelopment) {
    config.unshift({
      loader: 'style-loader',
    });
  }

  return config;
}

exports.getScssLoaderConfig = function(isDevelopment) {
  const config = [
    ...this.getCssLoaderConfig(isDevelopment),
    ...this.getSassLoaderConfig(isDevelopment),
  ];


  return config;
};

exports.getVueLoaderConfig = function(isDevelopment) {
  let scssLoaders;

  if (isDevelopment) {
    scssLoaders = ['vue-style-loader'].map(loader => ({ loader }));
    scssLoaders.push({
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    });
    scssLoaders.push(...this.getSassLoaderConfig());
  } else {
    scssLoaders = ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
        },
        ...this.getSassLoaderConfig(isDevelopment),
      ],
      fallback: 'vue-style-loader',
    });
  }

  const jsLoaders = [
    {
      loader: 'babel-loader',
    },
  ];

  const config = {
    loader: 'vue-loader',
    options: {
      loaders: {
        scss: scssLoaders,
        js: jsLoaders,
      },
      postcss: [],

      cssModules: {
        localIdentName: '[local]-[hash:base64:7]',
        camelCase: true,
      },
      transformToRequire: {
        source: 'srcset'
      }},
  };

  return config;
};
