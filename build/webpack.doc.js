const path = require('path');
const config = require('./webpack.dev.js');


delete config.devServer;

module.exports = Object.assign(config, {
    mode: 'production',
    output: {
        path: path.join(__dirname, '../docs/dist'),
        // publicPath: 'https://youzan.github.io/vant/',
        // 替換地址
        publicPath: '/',
        filename: '[name].[hash:8].js',
        chunkFilename: 'async_[name].[chunkhash:8].js'
    }
});
