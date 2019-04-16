const path = require('path')
const enter = path.join(__dirname, '/client/src/')
const out = path.join(__dirname, 'public')
var BrotliGzipPlugin = require('brotli-gzip-webpack-plugin');
module.exports = {
  entry: `${enter}/index.jsx`,
  output: {
    path: out,
    filename: 'bundle.js'
  },
  mode: 'production',
  plugins: [
    new BrotliGzipPlugin({
        asset: '[path].br[query]',
        algorithm: 'brotli',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8,
        quality: 11
    }),
    new BrotliGzipPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
    })
],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: enter,
        use:{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
  ]
  }
};