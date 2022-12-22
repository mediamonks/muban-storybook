const path = require("path");
const projectRoot = path.resolve(__dirname, '../../../');

exports.hbsRules = [
  {
    test: /\.hbs/,
    use: [
      {
        loader: "hbs-build-loader",

        options: {
          resolve: "../../../node_modules/muban-core/loaders/hbs-build-loader",
          removeScript: false,
          removeStyle: false,
          removeTemplate: false,
          hot: true,
        },
      },
      {
        loader: "handlebars-loader",
        options: {
          extensions: [".hbs", ""],
          partialDirs: [path.resolve(projectRoot, "src/")],
          debug: false,
          // http://handlebarsjs.com/reference.html#base-compile
          precompileOptions: {
            preventIndent: true,
          },
        },
      },
      {
        loader: "partial-comment-loader",
      },
    ].filter(Boolean),
  },
];

exports.mubanResolve = {
  resolve: {
    extensions: [".hbs", ".ts", ".js", ".yaml", ".json"],
    modules: [path.resolve(projectRoot, "src"), "node_modules"],
  },
};
