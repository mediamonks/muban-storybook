const path = require("path");

function getBabelLoaderConfig() {
  return {
    loader :'babel-loader',
    options: {
      presets: [
        ["env", {
          "targets": {
            "browsers": ['last 3 iOS versions', 'last 3 versions', 'ie >= 10'],
            "uglify": true,
          },
          "modules": false,
          "useBuiltIns": 'entry',
          "exclude": [
            // we don't use generators or async/await by default
            "transform-regenerator",

            // we don't use typed arrays by default
            "es6.typed.data-view",
            "es6.typed.int8-array",
            "es6.typed.uint8-array",
            "es6.typed.uint8-clamped-array",
            "es6.typed.int16-array",
            "es6.typed.uint16-array",
            "es6.typed.int32-array",
            "es6.typed.uint32-array",
            "es6.typed.float32-array",
            "es6.typed.float64-array",

            // we don't use reflect by default
            "es6.reflect.apply",
            "es6.reflect.construct",
            "es6.reflect.define-property",
            "es6.reflect.delete-property",
            "es6.reflect.get",
            "es6.reflect.get-own-property-descriptor",
            "es6.reflect.get-prototype-of",
            "es6.reflect.has",
            "es6.reflect.is-extensible",
            "es6.reflect.own-keys",
            "es6.reflect.prevent-extensions",
            "es6.reflect.set",
            "es6.reflect.set-prototype-of",

            // we don't use symbols by default
            "es6.symbol",
            "transform-es2015-typeof-symbol",

            // we don't use advanced math by default
            "es6.math.acosh",
            "es6.math.asinh",
            "es6.math.atanh",
            "es6.math.cbrt",
            "es6.math.clz32",
            "es6.math.cosh",
            "es6.math.expm1",
            "es6.math.fround",
            "es6.math.hypot",
            "es6.math.imul",
            "es6.math.log1p",
            "es6.math.log10",
            "es6.math.log2",
            "es6.math.sign",
            "es6.math.sinh",
            "es6.math.tanh",
            "es6.math.trunc",

            // we don't use maps and sets by default
            "es6.map",
            "es6.set",
            "es6.weak-map",
            "es6.weak-set",
          ]
        }]
      ],
      plugins: [
        // NOTE: adding helpers will reduce the filesize if you have a lot off classes,
        // but it will increase the main bundle size due to core-js/library/module imports
        // where babel-preset-env includes core-js/modules
        // The ../library/.. versions don't pollute the global scope, this is why babel-runtime
        // uses those for their helpers. But since we already have the global ones loaded,
        // we don't need both.
        // Until there is a fix for this (related: https://github.com/babel/babel/issues/5699)
        // you need to analyze your bundle to see if enabling this gives you an advantage
        // 25kb parsed / 5.9kb (gzip)

        // ['transform-runtime', {
        //   "helpers": true,
        //   "polyfill": false,
        //   "regenerator": false,
        //   "moduleName": "babel-runtime"
        // }],

        // 'transform-class-display-name',
        'transform-class-properties',
        // 'transform-flow-strip-types',
        'transform-object-rest-spread',
        'transform-strict-mode',
        ["babel-plugin-transform-builtin-extend", {
          globals: ["Error", "Array"]
        }]
      ],
      cacheDirectory: ''
    }
  };
}

module.exports = {
  getBabelLoaderConfig,
};
