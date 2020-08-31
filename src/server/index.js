import express from 'express';
import https from 'https';
import favicon from 'serve-favicon';
import program from 'commander';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import shelljs from 'shelljs';
import storybook, { webpackValid } from './middleware';
import packageJson from '../../package.json';
import { parseList, getEnvConfig } from './utils';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

program
  .version(packageJson.version)
  .option('-p, --port [number]', 'Port to run Storybook (Required)', str => parseInt(str, 10))
  .option('-h, --host [string]', 'Host to run Storybook')
  .option('-s, --static-dir <dir-names>', 'Directory where to load static files from')
  .option('-c, --config-dir [dir-name]', 'Directory where to load Storybook configurations from')
  .option(
    '--https',
    'Serve Storybook over HTTPS. Note: You must provide your own certificate information.'
  )
  .option(
    '--ssl-ca <ca>',
    'Provide an SSL certificate authority. (Optional with --https, required if using a self-signed certificate)',
    parseList
  )
  .option('--ssl-cert <cert>', 'Provide an SSL certificate. (Required with --https)')
  .option('--ssl-key <key>', 'Provide an SSL key. (Required with --https)')
  .option('--smoke-test', 'Exit after successful start')
  .parse(process.argv);

console.info(chalk.bold(`${packageJson.name} v${packageJson.version}`) + chalk.reset('\n'));

// The key is the field created in `program` variable for
// each command line argument. Value is the env variable.
getEnvConfig(program, {
  port: 'SBCONFIG_PORT',
  host: 'SBCONFIG_HOSTNAME',
  staticDir: 'SBCONFIG_STATIC_DIR',
  configDir: 'SBCONFIG_CONFIG_DIR',
});

if (!program.port) {
  console.error('Error: port to run Storybook is required!\n');
  program.help();
  process.exit(-1);
}

// Used with `app.listen` below
const listenAddr = [program.port];

if (program.host) {
  listenAddr.push(program.host);
}

const app = express();
let server = app;

if (program.https) {
  if (!program.sslCert) {
    console.error('Error: --ssl-cert is required with --https');
    process.exit(-1);
  }
  if (!program.sslKey) {
    console.error('Error: --ssl-key is required with --https');
    process.exit(-1);
  }

  const sslOptions = {
    ca: (program.sslCa || []).map(ca => fs.readFileSync(ca, 'utf-8')),
    cert: fs.readFileSync(program.sslCert, 'utf-8'),
    key: fs.readFileSync(program.sslKey, 'utf-8'),
  };

  server = https.createServer(sslOptions, app);
}

let hasCustomFavicon = false;

if (program.staticDir) {
  program.staticDir = parseList(program.staticDir);
  program.staticDir.forEach(dir => {
    const staticPath = path.resolve(dir);
    if (!fs.existsSync(staticPath)) {
      console.error(`Error: no such directory to load static files: ${staticPath}`);
      process.exit(-1);
    }
    console.info(`=> Loading static files from: ${staticPath} .`);
    app.use(express.static(staticPath, { index: false }));

    const faviconPath = path.resolve(staticPath, 'favicon.ico');
    if (fs.existsSync(faviconPath)) {
      hasCustomFavicon = true;
      app.use(favicon(faviconPath));
    }
  });
}

if (!hasCustomFavicon) {
  app.use(favicon(path.resolve(__dirname, 'public/favicon.ico')));
}

// Build the webpack configuration using the `baseConfig`
// custom `.babelrc` file and `webpack.config.js` files
const configDir = program.configDir || './.storybook';

// NOTE changes to env should be done before calling `getBaseConfig`
// `getBaseConfig` function which is called inside the middleware
app.use(storybook(configDir));

let serverResolve = () => {};
let serverReject = () => {};
const serverListening = new Promise((resolve, reject) => {
  serverResolve = resolve;
  serverReject = reject;
});
server.listen(...listenAddr, error => {
  if (error) {
    serverReject(error);
  } else {
    serverResolve();
  }
});

Promise.all([webpackValid, serverListening])
  .then(() => {
    const proto = program.https ? 'https' : 'http';
    const address = `${proto}://${program.host || 'localhost'}:${program.port}/`;
    console.info(`Storybook started on => ${chalk.cyan(address)}\n`);
    if (program.smokeTest) {
      process.exit(0);
    }
  })
  .catch(error => {
    if (error instanceof Error) {
      console.error(error);
    }
    if (program.smokeTest) {
      process.exit(1);
    }
  });
