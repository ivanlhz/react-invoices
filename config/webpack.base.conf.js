module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: ['css-loader', 'sass-loader'],
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
};
