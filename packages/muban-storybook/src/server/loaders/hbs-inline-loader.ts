import loaderUtils from 'loader-utils';
import type webpack from 'webpack';
import path from 'path';

type LoaderContext = webpack.loader.LoaderContext;

/**
 * Processes handlebar templates to import script and style files.
 * Also has an option to remove al the template code itself to only extract the scripts out of it
 *
 * For scripts:
 * - Changes the html script include to a js file require
 * - Also registers the class to be initialized
 * - Has support for hot reloading
 *
 * For styles:
 * - Changes the html style link to a css file require
 */
export default function loader(this: LoaderContext, source: string) {
  const done = this.async()!;
  this.cacheable();

  const options = loaderUtils.getOptions(this);

  const currentModuleName = `./${this.resourcePath.split(path.sep).pop()}`;

  const hbsBuildLoaderParams = JSON.stringify(options.hbsBuildOptions);
  const hbsLoaderParams = JSON.stringify(options.hbsOptions);

  let index = 0;
  const newContent = source.replace(/(["'])<hbs>(.*?)<\/hbs>\1/gi, (match, quote, template) => {
    // strip leading tabs
    let content = template.replace(/(^\\n|(\\n|\\t)+$)/g, '');
    const match2 = /^([\\t]*)/gi.exec(content);

    if (match2 && match2[0].length > 0) {
      content = content.replace(
        new RegExp(`(\\\\n|^)(\\\\t){${match2[0].length / 2}}`, 'gmi'),
        '$1',
      );
    }

    const response = `{
				compiled: require(${JSON.stringify(
          `!!hbs-build-loader?${hbsBuildLoaderParams}!handlebars-loader?${hbsLoaderParams}!extract-template-loader?target=${index++}!${currentModuleName}`,
        )}),
				raw: '${content.replace(/'/gi, "\\'")}',
			}`;

    return response;
  });

  done(null, newContent);
}
