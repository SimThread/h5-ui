const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    entry: {
        'h5-docs': './docs/src/index.js',
        'h5-mobile': './docs/src/mobile.js'
    },
    output: {
        path: path.join(__dirname, '../docs/testdist'),
        publicPath: '/',
        chunkFilename: 'async_[name].js'
    },
    stats: {
        modules: false,
        children: false
    },
    devServer: {
        hot: true, // 开启热点
        inline: true, // 开启页面自动刷新
        host: 'localhost',
        port: 8050,
        proxy: {
            '/Home': {
                target: 'https://www.dev.591.com.hk/',
                // pathRewrite: { '^/v1': '' },
                changeOrigin: true, // target是域名的话，需要这个参数，
                // secure: false, // 设置支持https协议的代理
            },
        },
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.vue', '.css'],
        alias: {
            packages: path.join(__dirname, '../src'),
            'h5-ui': path.join(__dirname, '../packages'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'stylus-loader',
                        options: {
                            paths: [path.resolve(__dirname, 'node_modules')]
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            paths: [path.resolve(__dirname, 'node_modules')]
                        }
                    }
                ]
            },
            {
                test: /\.md$/,
                use: [
                    'vue-loader',
                    '@vant/markdown-loader'
                ]
            },
            {
                test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['h5-docs'],
            template: 'docs/src/index.tpl',
            filename: 'index.html',
            inject: true
        }),
        new HtmlWebpackPlugin({
            chunks: ['h5-mobile'],
            template: 'docs/src/index.tpl',
            filename: 'mobile.html',
            inject: true
        })
    ],
    // proxyTable: {
    //   '/Home': {
    //     target: 'https://www.dev.591.com.hk',
    //     changeOrigin: true
    //   },
    // },
};
