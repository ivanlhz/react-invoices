const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /node_modules\/(pdfkit|brotli|fontkit|linebreak|png-js|unicode-properties)/,
        loader: 'transform-loader?brfs',
      },
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new ExtractTextWebpackPlugin('style.css'),
  ],
};
