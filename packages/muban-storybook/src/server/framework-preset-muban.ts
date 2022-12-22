/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Configuration } from 'webpack';
import path from 'path';

function getHbsInlineLoaderConfig() {
  return {
    loader: 'hbs-inline-loader',
    options: {
      hbsBuildOptions: {
        removeScript: false,
        removeStyle: false,
        removeTemplate: false,
        hot: true,
      },
      hbsOptions: {
        extensions: ['.hbs', ''],
        // partialDirs: [path.resolve(projectRoot, 'src/app/component')], // set this in the project itself
        ignoreHelpers: true,
        debug: false,
      },
    },
  };
}

export function webpack(webpackConfig: Configuration): Configuration {
  return {
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [
        {
          test: /\.stories\.(js|ts)$/,
          include: [/src[/\\]app[/\\]component/],
          use: [
            // ...(webpackConfig.module?.rules.find(rule => String(/\.js$/) === String(rule.test))?.use as any ?? []),
            getHbsInlineLoaderConfig(),
            {
              loader: 'preset-loader',
              options: {},
            },
          ],
        },
        // Order of rules must not change. We need our custom module rules to run before the default storybook
        // rules, in order for backticks to be replaced by double-quotes in the parsed story files.
        // This allows the hbs-inline-loader to correctly locate the <hbs> tags and compile the handlebars into
        // a function.
        ...(webpackConfig.module?.rules || []),
      ],
    },
    resolveLoader: {
      ...webpackConfig.resolveLoader,
      modules: [
        'node_modules',
        path.resolve(__dirname, 'loaders'),
        path.resolve(require.resolve('muban-core'), '../loaders'),
      ],
    },
  };
}

export function config(entry = []): Array<any> {
  return [...entry, require.resolve('./defaultParameters')];
}
