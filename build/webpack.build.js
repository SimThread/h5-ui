const path = require('path');
const config = require('./webpack.dev.js');

const isMinify = process.argv.indexOf('-p') !== -1;

delete config.devServer;

module.exports = Object.assign(config, {
  mode: 'production',
  entry: {
    h5: './es/index.js'
  },
  output: {
    path: path.join(__dirname, '../lib'),
    library: 'h5-ui',
    libraryTarget: 'umd',
    filename: isMinify ? '[name].min.js' : '[name].js',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  performance: false,
  optimization: {
    minimize: isMinify
  }
});
