import sass from 'sass';
import FriendlyErrorsPlugin from '@nuxt/friendly-errors-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import {
    CACHE_DIR,
    STYLE_EXTS,
    SCRIPT_EXTS,
    POSTCSS_CONFIG_FILE,
    DOCS_DIR,
    BABEL_CONFIG_FILE,
} from '../common/constant';
import { join } from 'path';

const CACHE_LOADER = {
    loader: 'cache-loader',
    options: {
        cacheDirectory: CACHE_DIR,
    },
};

const CSS_LOADERS = [
    'style-loader',
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            config: {
                path: POSTCSS_CONFIG_FILE,
            },
        },
    },
];

export const baseConfig = {
    mode: 'development',
    resolve: {
        extensions: [...SCRIPT_EXTS, ...STYLE_EXTS],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    CACHE_LOADER,
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(js|ts|jsx|tsx)$/,
                exclude: /node_modules\/(?!(@h5\/cli))/,
                use: [
                    CACHE_LOADER,
                    {
                        loader: 'babel-loader',
                        options: {
                            configFile: BABEL_CONFIG_FILE
                        }
                    }],
            },
            {
                test: /\.css$/,
                sideEffects: true,
                use: CSS_LOADERS,
            },
            {
                test: /\.less$/,
                sideEffects: true,
                use: [...CSS_LOADERS, 'less-loader'],
            },
            {
                test: /\.scss$/,
                sideEffects: true,
                use: [
                    ...CSS_LOADERS,
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sass,
                        },
                    },
                ],
            },
            {
                test: /\.md$/,
                use: [CACHE_LOADER, 'vue-loader', '@vant/markdown-loader'],
            },
            {
                test: /\.svg$/,
                sideEffects: true,
                loader: 'svg-sprite-loader',
                include: [join(`${DOCS_DIR}`, './public/svg')],
                options: {
                    symbolId: 'icon-[name]'
                }
            },
            {
                test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                exclude: [join(`${DOCS_DIR}`, './public/svg')],
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
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new FriendlyErrorsPlugin({
            clearConsole: false,
            logLevel: 'WARNING',
        }),
    ],
};
