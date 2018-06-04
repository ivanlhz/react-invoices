var webpack = require('webpack');
var merge = require('webpack-merge');

var baseConfig = require('./webpack.base.conf');
var optimizationConfig = require('./webpack.opt.config');

const productionConfiguration = env => {
  const NODE_ENV = env.NODE_ENV ? env.NODE_ENV : 'development';
  return {
    plugins: [new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) })],
  };
};

module.exports = merge.smart(baseConfig, optimizationConfig, productionConfiguration);
