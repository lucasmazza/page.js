var webpack = require('webpack'),
    fs = require('fs'),
    interpolate = require('interpolate'),
    pkg = require('./package.json');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/page.js',
    library: 'page',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      { loader: 'babel', query: { presets: ['es2015'] } }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(interpolate(fs.readFileSync('.banner').toString().trim(), pkg))
  ]
};
