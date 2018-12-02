import path from 'path';
import DirectoryNamedWebpackPlugin from 'directory-named-webpack-plugin';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import babelLoaderConfig from './babel.prod';
import { getBabelLoaderConfig } from './helpers/babel';
import { getHandlebarsRules } from './helpers/handlebars-rules';
import { getHbsInlineLoaderConfig } from './helpers/hbs-inline';
import { getStyleRules } from './helpers/style-rules';
import { includePaths, excludePaths, loadEnv, nodePaths } from './utils';
import { getPreviewHeadHtml, getManagerHeadHtml } from '../utils';
import { version } from '../../../package.json';

const projectRoot = path.resolve(__dirname, '../../../');
console.log('projectRoot', projectRoot);
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = function(configDir) {
  const entries = {
    manager: [
      require.resolve('./polyfills'),
      require.resolve('../../../dist/js/app.js'),
      require.resolve('../../../dist/css/app.css'),
    ],
    preview: [
      require.resolve('./polyfills'),
      require.resolve('./globals'),
    ],
  };

  const config = {
    bail: true,
    devtool: '#cheap-module-source-map',
    entry: entries,
    output: {
      filename: 'static/[name].[chunkhash].bundle.js',
      // Here we set the publicPath to ''.
      // This allows us to deploy storybook into subpaths like GitHub pages.
      // This works with css and image loaders too.
      // This is working for storybook since, we don't use pushState urls and
      // relative URLs works always.
      publicPath: '',
    },
    resolve: {
      // Since we ship with json-loader always, it's better to move extensions to here
      // from the default config.
      extensions: ['.hbs', '.js', '.ts', '.yaml', '.json'],
      // Add support to NODE_PATH. With this we could avoid relative path imports.
      // Based on this CRA feature: https://github.com/facebookincubator/create-react-app/issues/253
      modules: [
        path.resolve(__dirname, '../../client'),
        path.resolve(__dirname, '../../demo'),
        'node_modules'
      ].concat(nodePaths),
      alias: {
        // vue$: require.resolve('vue/dist/vue.esm.js'),
      },
      plugins: [
        new DirectoryNamedWebpackPlugin({
          honorIndex: false, // defaults to false

          ignoreFn: function(webpackResolveRequest) {
            return !(webpackResolveRequest.path.includes(path.join('app', 'component')));// ||
            // webpackResolveRequest.path.includes(path.join('storybook')));

            // custom logic to decide whether request should be ignored
            // return true if request should be ignored, false otherwise
            // return false; // default
          },
        })
      ],
    },
    resolveLoader: {
      modules: [
        'node_modules',
        path.resolve(__dirname, './loaders'),
        path.resolve(projectRoot, 'node_modules/muban-core/loaders'),
      ],
    },
    plugins: [
      new InterpolateHtmlPlugin(process.env),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        chunks: ['manager'],
        data: {
          managerHead: getManagerHeadHtml(configDir),
          version,
        },
        template: require.resolve('../index.html.ejs'),
      }),
      new HtmlWebpackPlugin({
        filename: 'iframe.html',
        excludeChunks: ['manager'],
        data: {
          previewHead: getPreviewHeadHtml(configDir),
        },
        template: require.resolve('../iframe.html.ejs'),
      }),
      new webpack.DefinePlugin(loadEnv({ production: true })),
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          ie8: false,
          mangle: false,
          warnings: false,
          compress: {
            keep_fnames: true,
          },
          output: {
            comments: false,
          },
        },
      }),
      new Dotenv({ silent: true }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: require.resolve('babel-loader'),
          query: babelLoaderConfig,
          include: includePaths,
          exclude: excludePaths,
        },
        {
          test: /\.ts$/,
          include: [
            path.join(projectRoot, 'src', 'client'),
            path.join(projectRoot, 'src', 'demo')
          ],
          use: [
            getBabelLoaderConfig(),
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: path.resolve(projectRoot, './tsconfig.json'),
              },
            },
          ],
        },
        ...getHandlebarsRules({ development: true }),
        ...getStyleRules({ development: true }),
        {
          test: /preset\.js$/,
          include: [
            /src[\/\\]demo[\/\\]app/,
          ],
          use: [
            {
              loader :'preset-loader',
              options: {},
            },
            getHbsInlineLoaderConfig(),
            getBabelLoaderConfig(),
          ]
        },
        {
          test: /\.json$/,
          // type: 'javascript/dynamic',
          use: [
            { loader: "json-import-loader" },
            { loader: "json-loader" }
          ]
        },
        {
          test: /\.yaml$/,
          // type: 'javascript/dynamic',
          use: [
            { loader: "json-import-loader" },
            { loader: "json-loader" },
            { loader: "yaml-loader" }
          ]
        },
        // {
        //   test: /\.vue$/,
        //   use: [getVueLoaderConfig(true)],
        // },
        {
          test: /\.md$/,
          use: [
            {
              loader: require.resolve('html-loader'),
            },
            {
              loader: require.resolve('markdown-loader'),
            },
          ],
        },
      ],
    },
  };

  return config;
}
