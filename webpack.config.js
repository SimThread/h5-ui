const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, './public'),
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        sideEffects: true,
        loader: 'svg-sprite-loader',
        include: [path.join(__dirname, './public/svg')],
        options: {
          symbolId: 'icon-[name]',
        },
      },
      {
        test: /.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [path.join(__dirname, './public/svg')],
        options: {
          limit: 10000,
          // name: utils.assetsPath('img/[name].[hash:7].[ext]')
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        },
      },
    ],
  },
};
