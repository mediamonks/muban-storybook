import webpack from 'webpack';
import program from 'commander';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import shelljs from 'shelljs';
import packageJson from '../../package.json';
import getBaseConfig from './config/webpack.config.prod';
import loadConfig from './config';
import { parseList, getEnvConfig } from './utils';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

program
  .version(packageJson.version)
  .option('-s, --static-dir <dir-names>', 'Directory where to load static files from', parseList)
  .option('-o, --output-dir [dir-name]', 'Directory where to store built files')
  .option('-c, --config-dir [dir-name]', 'Directory where to load Storybook configurations from')
  .parse(process.argv);

console.info(chalk.bold(`${packageJson.name} v${packageJson.version}\n`));

// The key is the field created in `program` variable for
// each command line argument. Value is the env variable.
getEnvConfig(program, {
  staticDir: 'SBCONFIG_STATIC_DIR',
  outputDir: 'SBCONFIG_OUTPUT_DIR',
  configDir: 'SBCONFIG_CONFIG_DIR',
});

const configDir = program.configDir || './.storybook';
const outputDir = program.outputDir || './storybook-static';

// create output directory if not exists
shelljs.mkdir('-p', path.resolve(outputDir));
// clear the static dir
shelljs.rm('-rf', path.resolve(outputDir, 'static'));
shelljs.cp(path.resolve(__dirname, 'public/favicon.ico'), outputDir);

// Build the webpack configuration using the `baseConfig`
// custom `.babelrc` file and `webpack.config.js` files
// NOTE changes to env should be done before calling `getBaseConfig`
const config = loadConfig('PRODUCTION', getBaseConfig(configDir), configDir);
config.output.path = path.resolve(outputDir);

// copy all static files
if (program.staticDir) {
  program.staticDir.forEach(dir => {
    if (!fs.existsSync(dir)) {
      console.error(`Error: no such directory to load static files: ${dir}`);
      process.exit(-1);
    }
    console.info(`=> Copying static files from: ${dir}`);
    shelljs.cp('-r', `${dir}/*`, outputDir);
  });
}

// compile all resources with webpack and write them to the disk.
console.info('Building storybook ...');
webpack(config).run((err, stats) => {
  if (err || stats.hasErrors()) {
    console.error('Failed to build the storybook');
    // eslint-disable-next-line no-unused-expressions
    err && console.error(err.message);
    // eslint-disable-next-line no-unused-expressions
    stats && stats.hasErrors() && stats.toJson().errors.forEach(e => console.error(e));
    process.exit(1);
  }
});
